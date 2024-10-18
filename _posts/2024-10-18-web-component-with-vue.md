---
layout: post
title:  "Web Component with Vue"
date:   2024-10-05 00:00:00 +0800
tags:   ['Web Component', 'Vue', 'Asp.net core']
---

Learning on trying to create web component with Vue SFC.
Items here maybe wrong, and might be corrected in the future as I learn.

## Context

I'm trying to build some web component using Vue SFC + Vite into independent esm JavaScript library, which is then used in an ASP.NET core MVC applicaiton.
I would to use the VSCode tooling for the web component development, and use Visual Studio to managed the backend.

## Observation

- Items within a light DOM will get affected by global stylesheets. This is the default HTML behavior.
- Items within a shadown DOM (inside a custom element / web component) are not affected by global stylesheets. The styles defined in the custom element doesn't 'leak' to the the outer document.
- Vue SFC, when running in vite dev server, the elements are generated in the light DOM. Styles, scoped or otherwise, will be applied.
- Vue SFC, when exported as a custom element thru `defineCustomElement` API, how the styles is being handled is dependant on the tooling (here we're referring to Vite Vue plugin) and the API configuration.
- `defineCustomElement` API allows one to specify if we want the elements to be generated in the shadow DOM (default) or otherwise via `shadowRoot` option.
- The `vite-plugin-vue` package have a `features.customElement` options to transform Vue SFC to custom elements. If this options is enabled, the Vue SFC imported/referenced in the entry file (the file that will call the Vue's `defineCustomElement` API & and register the custom element with DOM) will be ...?
---
- SFC style: global, CE entry file: shadowDom, Vite Vue Plugin: CustomElement true => Single JS file generated, the style was inlined, style was 'scoped', stayed within the shadow DOM and didn't leaked out to other parts of documents. There's no additional data-attribute was added to the shadow DOM elements.
- SFC style: scoped, CE entry file: shadowDom, Vite Vue Plugin: CustomElement enabled => Single JS file generated, the style was inlined, style was 'scoped', stayed within the shadow DOM and didn't leaked out to other parts of documents. The generated element within the shadom DOM element have a data-attribute for scope isolation `<div [data-v-f3f3eg9]>` added to it. Same with the generated style css selectors `div[data-v-f3f3eg9]`. The data attribute id is the same for the same tag (in CE usage) or the same componet (in vue app) and doesn't change each time it was used. (SO it seems like using scoped is better since it could prevent leakage in vite dev scenario)
---
- SFC style: global, CE entry file: shadowDom, Vite Vue Plugin: CustomElement false => 1 js and 1 css file is generated. the style is not inlined but will be exported as a separate css file. The elements & style do not have data-attribute for scope isolation.
  - In Vite Server: The style will be applied to the components, but the style defined will leaked to other parts of the document.The leakage maybe mitigated via usage of className.
  - In custom element usage: Usage of the generated sheetstyle may leak to other parts of the document, but it will not pierce thru the shadow DOM, i.e. the item will not be styled. The leakage maybe mitigated via usage of className. Might be possible to allow styling using `::part` psuedo element if defined.
- SFC style: scoped, CE entry file: shadowDom, Vite Vue Plugin: CustomElement false => 1 js and 1 css file is generated. the style is not inlined but will be exported as a separate css file. The elements & style will have data-attribute for scope isolation. The style will not leaked out to other parts of the documents due to scope isolation.
  - In Vite Server: The style will be applied to the components, with no leakage to other parts.
  - In custom element usage: But it will not pierce thru the shadow DOM, i.e. the item will not be styled. No leakge either. Might be possible to allow styling using `::part` psuedo element if defined.
- If there are multi entry point, all the styles will be exported into a single css file. So seems like using scoped style or css class name will be good in preventing collision.
---
- SFC style: global, CE entry file: lightDOM, Vite Vue Plugin: CustomElement true => 1 js file, styled will be inlined. But when used in ce mode, it will complain 'Custom element style injection is not supported when using shadowRoot: false', and it doesn't have any effect to element; element generated in light DOM, and can be affeced by global stylesheet. when in vite dev mode, the style will leaked out to other part of the docs.
- SFC style: global, CE entry file: lightDOM, Vite Vue Plugin: CustomElement true => 1 js file, styled will be inlined. But when used in ce mode, it will complain 'Custom element style injection is not supported when using shadowRoot: false', and it doesn't have any effect to element; element generated in light DOM, and can be affeced by global stylesheet. when in vite dev mode, the style will not leak out to other place.
---
- SFC style: scoped, CE entry file: lightDOM, Vite Vue Plugin: CustomElement false => 1 js and 1 css file, But when used in ce mode and vite server mode, they all work the same way, the style works and isolated.
- SFC style: global, CE entry file: lightDOM, Vite Vue Plugin: CustomElement false => 1 js and 1 css file, But when used in ce mode and vite server mode, they work the same way but the style may leaked to other part of docs.

---

- If demo1, a non `*.ce.vue` component but it refers to demo3, a `*.ce.vue` component, and let the tooling auto compile item with `*.ce.vue` inlined the item. the demo3 the styling wil lcome thru when in demo1, but not when on it's own. It's a mess

