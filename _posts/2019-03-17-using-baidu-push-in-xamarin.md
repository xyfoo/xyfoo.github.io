---
layout: post
title:  "Use Baidu Push Service in Xamarin.Android"
date:   2018-11-30 00:00:00 +0800
tags:   ['Xamarin.Android', 'Baidu Push', 'Push Notification']
---

Firebase Cloud Messaging is a very good push notification service for most Android app, except it doesn't work in China. Google services are blocked over there.

Baidu Cloud Push is one of the push notification service that can work in China. They have iOS/Android client SDK, Java/PHP based server SDK, REST API, and is intergrated into Amazon SNS & Microsoft Azure's Notification Hub service.

I'm going to show you how do you integrate Baidu Cloud Push into Xamarin.Android project, and use it with Amazon SNS/Azure Notification Hub.

---

## What you'll need.

* A Baidu account. A working phone number is required. [Link for non-China base number](https://passport.baidu.com/v2/?reg&overseas=1)
* A Baidu Cloud Push account. A valid Chinese ID, business address, China-based phone number is required. [Link](http://push.baidu.com/console/app/list)
* [Amazon SNS account](https://aws.amazon.com/sns/) or [Azure Notification Hub account](https://azure.microsoft.com/en-us/services/notification-hubs/)

---

## 1. Download 'Baidu.Android.PushService' nuget

1. Download this [Nuget](https://www.nuget.org/packages/Baidu.Android.PushService). It's a Xamarin.Android binding library for Baidu Push Service Android native SDK.
1. Complete the [additional setup instruction](https://github.com/xyfoo/Baidu.Android.PushService/wiki#additional-setup-steps)

## 2. Create the required permissions & registration in App Manifest

<script src="https://gist.github.com/xyfoo/39c9be7957500e7ee88861e5ee242514.js"></script>

## 3. Implement the push notification receiver

<script src="https://gist.github.com/xyfoo/aee457468cc5f091bdd91c4b6ea81c02.js"></script>

And initialize the class in your MainActivity ```OnCreate``` function.

## 4. You're done!

Upon the app launch, your device will be registered with Baidu Cloud Push (generating a unique ```UserId```, ```channelId```) and a ```token```/```regId``` from your choice of push notification platform.

You can use those ID to do a push notificaiton to your device now.



---

The full project repository can be found [here](https://github.com/xyfoo/Baidu.Android.PushService)



