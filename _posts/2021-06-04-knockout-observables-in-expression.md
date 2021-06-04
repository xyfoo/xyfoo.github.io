---
layout: post
title:  "Knockout Observable In Expression"
date:   2021-06-04 00:00:00 +0800
tags:   ['Knockout JS', 'JavaScript']
---

Given this [Knockout](https://knockoutjs.com/) ViewModel

```js
function MyViewModel() {
    var self = this;
    this.SomeBooleanObservable = ko.observable(true);
    this.SomeIntObservable = ko.observable(3);
}
```

If you want to use the observable as it is in HTML, do this

```html
<div>
    <p data-bind="visible: SomeBooleanObservable">Standard Data Bind</li>
    <!-- ko if: SomeBooleanObservable -->
    <p>Containerless Control Syntax Flow</p>
    <!-- /ko -->
</div>
```

but if you need to use JS expression in HTML, prepend `()` to observable to get it work

```html
<div>
    <!-- This wont work, and will fail silently -->
    <!-- ko if: SomeBooleanObservable == true -->
    <p>Containerless Control Syntax Flow</p>
    <!-- /ko -->
    
    <!-- This will work -->
    <p data-bind="visible: SomeBooleanObservable() == false">Standard Data Bind</li>
    <!-- ko if: SomeBooleanObservable() == true -->
    <p>Containerless Control Syntax Flow</p>
    <!-- /ko -->
    <!-- ko if: SomeIntObservable() >= 2.5 -->
    <p>SomeIntObservable is equal or more than 2.5</p>
    <!-- /ko -->
</div>
```

[Knockout documentation on binding syntax](https://knockoutjs.com/documentation/binding-syntax.html)
