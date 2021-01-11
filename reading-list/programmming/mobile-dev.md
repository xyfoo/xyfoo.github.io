---
layout: markdownpage
title:  "Reading List - Mobile Dev"
---

## 2020

### May
- 01
  - [Andriod - Show biometric authentication dialog](https://developer.android.com/training/sign-in/biometric-auth)
  
### January
- 02
  - [Xamarin.Forms Reusable Controls](https://redpillxamarin.com/2017/01/28/206-reusable-controls/)
- 08
  - [Xamarin.Forms: How to Clip Images with Rounded Corners](https://montemagno.com/xamarin-forms-how-to-clip-images-with-rounded-corners/)
- 11
  - [React Native tutorial](https://facebook.github.io/react-native/docs/tutorial)
- 15
  - [Android Bluetooth API](https://developer.android.com/guide/topics/connectivity/bluetooth)
  - [What's UUID in Bluetooth?](https://stackoverflow.com/questions/13964342/android-how-do-bluetooth-uuids-work)
  - [Connect a barcode reader to a Xamarin Forms app via Bluetooth](https://acaliaro.wordpress.com/2017/02/07/connect-a-barcode-reader-to-a-xamarin-forms-app-via-bluetooth/)
  
## 2019

### December
- 31
  - [Xamarin.Forms OnPlatform Extension](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/xaml/markup-extensions/consuming#onplatform-markup-extension)
  - [Xamarin.Forms RelativeBinding](https://docs.microsoft.com/en-us/xamarin/xamarin-forms/app-fundamentals/data-binding/relative-bindings)
  - [Xamarin.Forms.DebugRainbows](https://github.com/sthewissen/Xamarin.Forms.DebugRainbows) - helps to debug UI alignment issue. Can be used for Views too. Just need to do the followings.
    ```
    <Style x:Key="DebugRainbows" ApplyToDerivedTypes="True" TargetType="forms:VisualElement">
      <Setter Property="rainbows:DebugRainbow.ShowColors" Value="True" />
    </Style>
    ```  
  
### November
- 17
  - [Simplify HTTP in Mobile Apps with Refit](https://www.youtube.com/watch?v=IUP0XFs6XRI)
  - [ReactiveUI with Xamarin - Michael Stonis & Geoffrey Huntley - Xamarin University Guest Lecture](https://www.youtube.com/watch?v=vydDJ9CaIug)

### October
- 17
  - Xamarin Forms - If you do compiled binding on root level object, each child item's data template have to be associated with a datatype or {x:null} for classic binding. Failure to do that may introduce  wonky behavior where the binding works, but the UI would not reflect the changes until a change event occurs.
- 21
  - [Android Developers - Adaptive icons](https://developer.android.com/guide/practices/ui_guidelines/icon_design_adaptive)
  - [Understanding Android Adaptive Icons](https://medium.com/google-design/understanding-android-adaptive-icons-cee8a9de93e2)
- 23
  - [Three things you probably didn’t know about XAML converters #2: Passing parameters to ValueConverters](http://www.mobilemotion.eu/?p=657)
    
### September
- 13
  - Using private CA certificate on [iOS](https://support.apple.com/en-nz/HT204477) & [Android](https://support.google.com/pixelphone/answer/2844832?hl=en)
- 25
  - [Xamarin Forms: Navigation Page with custom color, font & logo](https://github.com/jsuarezruiz/xamarin-forms-customnavigationpage)
  - [Xamarin Android: Change navigation bar button color](https://forums.xamarin.com/discussion/103317/change-navigation-bar-back-button-color-in-xamarin-android)
  - [Android: Theming with AppCompat](https://medium.com/androiddevelopers/theming-with-appcompat-1a292b754b35)
  - [Xamarin Android: Material Theme](https://docs.microsoft.com/en-us/xamarin/android/user-interface/material-theme)
  - [Xamarin Forms: Compiled Binding](https://docs.microsoft.com/en-gb/xamarin/xamarin-forms/app-fundamentals/data-binding/compiled-bindings)
  - [Xamarin Android: D8 & R8 Shrinker](https://devblogs.microsoft.com/xamarin/androids-d8-dexer-and-r8-shrinker/)
  
