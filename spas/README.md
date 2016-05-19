<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [The rise of Single Page Web Applications (SPAs)](#the-rise-of-single-page-web-applications-spas)
  - [History](#history)
    - [Differences on the lifecycle](#differences-on-the-lifecycle)
    - [In an MV* context](#in-an-mv-context)
  - [Vue.js](#vuejs)
    - [Reactive data binding](#reactive-data-binding)
    - [Component system](#component-system)
    - [Reactivity](#reactivity)
    - [State](#state)
  - [Resources](#resources)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The rise of Single Page Web Applications (SPAs)

### History

<p align="center"><img width="400" height="400" src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Adobe_Flash_Player_v10_icon.png" /></p>

It begins with Flash and rich experiences embedded in websites around 2004. Behind those lines of ActionScript, the conceps of downloading content on-the-fly as the user clicked "Start" button of a game or animation and not refreshing the website were present.

With the stardardization of AJAX back then in 2006 web developers started to realize they could make requests to the server and make the server respond only the data that needed to be updated, avoinding hundreds of kilobytes from boilerplate assets.

#### Differences on the lifecycle

<p align="center"><img src="https://i-msdn.sec.s-msft.com/dynimg/IC690875.png" /></p>

#### In an MV* context

<p align="center"><img src="http://singlepageappbook.com/assets/overview.png" /></p>

<p align="center"><img src="http://nalashaa.com/wp-content/uploads/2014/09/Powerpages2.png" /></p>

*Pros*
- Minimize transfer and execution of static content
- From the UX perspective, it feels as smooth and responsive (no page flicker) as a desktop application could be

*Cons*
- Hard dependency on JavaScript-enabled browsers
- Increased complexity
- SEO can be tricky
- Applications are prone to memory leaks
- Initial load could take more time than regular multi-page applications (e.g. Gmail)


### Vue.js

Is a composable and compact MVVM framework with focus on the "View" layer of the traditional MVC. Some of its features are: reactive components, extendable data bindings, custom directives, filters, list rendering, conditional rendering and many more.It also offers a CLI tool to bootstrap projects in ES2015 with Browserify or Webpack.

By default it doesn't offers routing needed for a SPA, but luckily the developers built an official [vue-router](https://github.com/vuejs/vue-router).

#### Reactive data binding

<p align="center"><img src="https://vuejs.org/images/mvvm.png" /></p>

#### Component system

<p align="center"><img src="https://vuejs.org/images/components.png" /></p>

#### Reactivity

<p align="center"><img src="https://vuejs.org/images/data.png" /></p>

#### State

<p align="center"><img src="https://vuejs.org/images/state.png" /></p>

Example of an structure diagram of a Vue.js application:

<p align="center"><img src="https://fadeit.dk/posts/getting-started-with-vuejs-angularjs-perspective/vue-large-app-structure-diagram.svg" /></p>


### Resources
- [Yet Another Framework Syndrome](https://medium.com/tastejs-blog/yet-another-framework-syndrome-yafs-cf5f694ee070)
- [npm for everything](http://beletsky.net/2015/04/npm-for-everything.html)
- [Vue.js on reddit](https://www.reddit.com/r/vuejs)
- [Vue.js: AngularJS perspective](https://fadeit.dk/blog/post/getting-started-with-vuejs-angularjs-perspective)