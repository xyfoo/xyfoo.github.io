---
layout: post
title:  "Fast Image Loading with RecyclerView & Glide"
date:   2019-03-27 00:00:00 +0800
tags:   ['Xamarin', 'Xamarin.Android', 'Glide', 'RecyclerView']
---

It's not an easy task to write an performant Android app that load large images or process large amount of small images. These operations tends to wreck havoc on your app's memory management.

## Glide

Android Developer site has [a series of advice](https://developer.android.com/topic/performance/graphics/load-bitmap) on how to handle such scenario, and one of their recommendation is to use the [Glide library](https://bumptech.github.io/glide/).

> Glide is a fast and efficient image loading library for Android focused on smooth scrolling. Glide offers an easy to use API, a performant and extensible resource decoding pipeline and automatic resource pooling.
>
>...
> 
> Glide’s primary focus is on making scrolling any kind of a list of images as smooth and fast as possible, but Glide is also effective for almost any case where you need to fetch, resize, and display a remote image.

Glide is doing all the heavy-lifting work in the background, so images will be load fast & efficiently.

## RecyclerView

[RecyclerView](https://developer.android.com/guide/topics/ui/layout/recyclerview) is a widget that allows you to create lists of items for large dataset. It's much [more advance and flexible than ListView](https://stackoverflow.com/questions/28525112/android-recyclerview-vs-listview-with-viewholder/31199564).

One of the important things that RecyclerView can do is UI virtualization.

### Example

The device screen can only show 10 item on screen, and you have 1000 items in the dataset. RecyclerView will probably generate the following:

| Element Count | Viewport | Note |
| --- | --- | --- |
| *n/2* | Not visible | Buffer if user scroll up |
| *n* | Visible | On screen |
| *n/2* | Not visible | Buffer if user scroll down |

RecyclerView will only create a total of 20 UI elements (5 + 10 + 5), instead of 1000 in one go. As user scroll along, it will recycle the created UI element and bind it with new data.

## Empty spaces when fast flickflick through image gallery

If the image to be loaded is a 'new' image (not previously laoded), Glide will have to load the bitmap and cache it (to the memory and/or disk). Inflating images will take longer time because it's operationally expensive and memory intensive, in comparison with other UI elements.

And that is why if you have implement an image gallery using RecyclerView & Glide, and the user decided to flick through the list extremly fast, and the app will typically show large amount of white space. 

## Solution

Use the [RecyclerView integration library](https://bumptech.github.io/glide/int/recyclerview.html).


> The RecyclerView integration library makes the RecyclerViewPreloader available in your application. RecyclerViewPreloader can automatically load images just ahead of where a user is scrolling in a RecyclerView.
> 
> Combined with the right image size and an effective disk cache strategy, this library can dramatically decrease the number of loading tiles/indicators users see when scrolling through lists of images by ensuring that the images the user is about to reach are already in memory.

### Using the library in Xamarin.Android project

I've port over the library to a [nuget package](https://www.nuget.org/packages/Bumptech.Glide.Integration.RecyclerView), so you can use it in your Xamarin.Android project.

If you have any question, you can hop over to the [project's repository](https://github.com/xyfoo/Bumptech.Glide.Integration.RecyclerView).