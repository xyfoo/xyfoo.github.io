---
layout: post
title:  "Xamarin.Forms How To: Print receipts to ECS/POS printers"
date:   2017-03-20 00:00:00 +0800
tags: ['Xamarin', 'Xamarin.Forms', 'ECS/POS']
---
It’s quite a common scene for mobile devices (iPad/Android tablet/Surface) to functions as the Point-of-Sales (POS) machine, typically couples with a POS printer to provide receipts or tax invoice.

There are a variety of POS printers out there, and each of them supports [a certain programming language](https://en.wikipedia.org/wiki/Page_description_language) that allows you to control the printer behavior. One of the more popular languages are [Epson Standard Code for POS Printers (ECS/POS)](https://en.wikipedia.org/wiki/ESC/P). It was created by Epson, but are widely used in non-Epson branded printer.

Today let’s look into how we can print a few simple lines from Xamarin.Forms PCL project to a ECS/POS supported printer through network.

## ECS/POS Commands

ECS/POS commands are essentially a series of special character & your plain alphanumerical characters. Different combinations would give a different command to the printer (provided the printer supports it), as illustrated in [this ECS/POS FAQ pdf file](http://content.epson.de/fileadmin/content/files/RSD/downloads/escpos.pdf).

For example: To print a center-aligned text, I would need to send:

* ‘ESC 1 49’: Center-justify text command
* ‘Hello World’: Just a normal string
* ‘LF’: Print and line feed command

Here are a [comprehensive list of commands supported by Epson printers](https://reference.epson-biz.com/modules/ref_escpos/index.php?content_id=72), but the details of each command are limited to Epson customers. But it’s a good pointer for you to search for it’s details.

One caveat you should note is that until if the printer encounter conflicting command (center-justify then left-justify on the same line), it will always take the last command received before the ‘LF’ command (left-justify)

The commands will carry forward to the next line, so if you need to center-justify all the line, you would only need to issue the center-justify command once, not once per line.

If you’re not sure of what’s the previous command issue and want to start with clean slate, use the ‘Initialize printer’ command.

At this point, I shall presume that the POS printer is already connected to the the same network as the mobile device itself. Printers will provide a way for you to connect to the network (via Ethernet or Wifi), and will typically have methods to print out the printer’s IP address and it’s Port number. You should consult the printer manual on how to do that, if you haven't done so.

## Send Command To Printer

To send commands to the printer, we’re going to use the [System.Net.Sockets.Socket](https://developer.xamarin.com/api/type/System.Net.Sockets.Socket/) class

<script src="https://gist.github.com/xyfoo/99b248b361d2c03399a25540aaf14258.js"></script>

But… if you were going to implement this in the PCL code, you will realized that you would not be able to reference Socket class ([Because it wasn’t supported in the PCL profile that target .NET 4.5, Xamarin.Android & Xamarin.iOS](http://stackoverflow.com/a/24059682/1053888)).

## Solutions

So, the solution to this is to either to install your [favourite x-plat socket Nuget packages](https://www.nuget.org/packages?q=Socket+PCL) or you can do it with [DependencyService](https://developer.xamarin.com/guides/xamarin-forms/application-fundamentals/dependency-service/introduction/).

To start with, you should declare an interface

<script src="https://gist.github.com/xyfoo/2c3f0825ff53d9cd0d222ad5abfe6ce0.js"></script>

In your platform specific project, you should provide the platform specific implementation for IPrinter (Android shown here, but should work exactly the same in iOS)

<script src="https://gist.github.com/xyfoo/76ebeaa98842a53530a4a0b0f0d0a76d.js"></script>

The last step would be to call the services from PCL project

<script src="https://gist.github.com/xyfoo/aa07e23df6243ab0a297ac19a0bda15f.js"></script>

So that’s it, you should now be able to print a few lines from your Xamarin.Forms apps to the ECS/POS printer.