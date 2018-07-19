---
layout: post
title:  "Xamarin.Forms How to: Display Android’s Toast & SnackBar in PCL project"
date:   2016-07-10 00:00:00 +0800
tags: [Xamarin.Forms, Android, Toast, SnackBar]
---
Below is some code to help you to display [Toast & SnackBar](https://material.google.com/components/snackbars-toasts.html) pop up ONLY in your Xamarin.Forms Android project and calling the pop-up in PCL code.

Prerequisite

* [Convert Android project to use AppCompact & Material Design](https://developer.xamarin.com/guides/xamarin-forms/platform-features/android/appcompat/)
* Install [Plugin.CurrentActivity](http://www.nuget.org/packages/Plugin.CurrentActivity) to Android project
* Basic understanding of [DependencyService](https://developer.xamarin.com/guides/xamarin-forms/dependency-service/)

We first need to declare a DependencyService interface so we could call this from our PCL project.

<script src="https://gist.github.com/xyfoo/fb95ad9bf0a1f98a403402c5516d9edc.js"></script>

Next step would be implement the interface in Android project

<script src="https://gist.github.com/xyfoo/216be13936f9f92c15ec98e921812577.js"></script>

Last step would be calling the code in PCL project. We limit the execution to run on Android only by querying the platform in runtime.

<script src="https://gist.github.com/xyfoo/5c676c073417b11cd630bcbc27a4f427.js"></script>

End Result

![EndResult]({{ "/assets/img/android.toast.snackbar.png" | absolute_url }}){:class="blogimg"}

Full source code can be found [here](https://github.com/xyfoo/XamarinForms-AndroidPopUp)

Note: If you’re using shared project, I supposed you could just directly call the notification in the code using the compiler directive

```
#if __ANDROID__
..
#endif
```
