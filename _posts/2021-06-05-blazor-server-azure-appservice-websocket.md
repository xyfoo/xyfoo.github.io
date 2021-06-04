---
layout: post
title:  "Enabling websocket for Blazor server on Azure AppService"
date:   2021-06-05 00:00:00 +0800
tags:   ['Blazor', 'Blazor Server', 'Azure', 'AppService']
---

When one deploy a Blazor Server project to Azure AppService, the app works just like any othe web apps. But if you look at the browser developer tools, you'll noticed it's using long polling insted of websocket connection.

To enable websocker on AppService, you'll need to go to `Azure Portal > App Service > Configuration > General Settings > Websocket` to turn it on. Your app will be restarted, and it will use websocket onwards.
