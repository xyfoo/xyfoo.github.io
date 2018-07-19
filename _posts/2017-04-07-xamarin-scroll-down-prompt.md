---
layout: post
title:  "Xamarin.Forms How to: Add a scroll down prompt to ScrollView"
date:   2017-04-07 00:00:00 +0800
tags: [Xamarin.Forms, ScrollView]
---
There’s a request from a customer to have a scroll down prompt when the content is too tall to be displayed in a single screen height. Pretty much like what you normally see in a lot of website:

![Example]({{ "/assets/img/scrolldown.example.jpeg" | absolute_url }}){:class="blogimg"}

When the (scrolled) content is nowhere near the end, show the indicator. Otherwise, hide it.

![Demo]({{ "/assets/img/scrolldown.demo.gif" | absolute_url }}){:class="blogimg"}

If you’re using a ListView control, you can do that easily by utilizing the [ItemAppearing event](https://developer.xamarin.com/api/event/Xamarin.Forms.ListView.ItemAppearing/). If the last item has appeared, hide the scroll down prompt.

However, if you’re using ScrollView control, there are no ItemAppearing event. But you can achieve the effect using [Scrolled event](https://developer.xamarin.com/api/event/Xamarin.Forms.ScrollView.Scrolled/).

How it’s done:

<script src="https://gist.github.com/xyfoo/93318427cb1394de49475b7d76bf80df.js"></script>

Here we have a Grid, which have a ScrollView and a Label. The ScrollView have a bunch of BoxView with differing color, and the Label function as the scroll down prompt.

Grid allows layering of controls by Z-level (which you can alter by moving the control up-down the XAML tree), and by putting both controls in the same space, the Label will appear on top of the ScrollView.

In the Scrolled event handler (in the code-behind file), we do the following:

<script src="https://gist.github.com/xyfoo/f401238720c487dcd9cc444eebe325ad.js"></script>

* Line 3: First we calculate the amount of space available for scrolling.
* Line 5: If the user haven’t scrolled past the available space (by reading ScrolledEventArgs.ScrollY), we can deduce that the user haven’t reach end of ScrollView. If so, displayed the scroll down prompt.

The calculation above won’t work all the time, because Xamarin.Forms is not meant to be a precise pixel-perfect platform, and there would be some slight variance in the value reported by the UI. Case in point, you may encounter that the ScrollY will always be smaller the SpaceAvailableForScrolling, even if you have scrolled to the very end.

To counter this variance, we declared a buffer of 20 in line 4, and add it to the returned ScrollY value for calculation. You can change this buffer value to anything you want, the larger it is, the earlier the ScrollDownPrompt will disappear.

And that’s it! A simple solution for a simple feature.
