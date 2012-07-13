---
date: 0200-01-02
section: help
category: Style
tag: Developers
layout: help-page
title: mapbox.map style
---

## Zoom Controls

__Class Name:__ `.zoomer`

__Markup__

    <a href="#" class="zoomer zoomin">+</a>
    <a href="#" class="zoomer zoomout">-</a>

    .zoomer {
      display:block;
      position:absolute;
      border:1px solid #ccc;
      background:#fff;
      border-radius:3px;
      -webkit-border-radius:3px;
      box-shadow:rgba(0,0,0,0.1) 0 1px 3px;
      -webkit-box-shadow:rgba(0,0,0,0.1) 0 1px 3px;
      text-indent:-999em;
      background-image:url(map-controls.png);
      background-repeat:no-repeat;
      overflow:hidden;
      width:28px;
      height:28px;
      top:10px;
      left:10px;
      z-index:2;
    }

    .zoomin {
      background-position:-31px -1px;
      left:39px;
      border-radius:0 3px 3px 0;
      -moz-border-radius:0 3px 3px 0;
      -webkit-border-radius:0 3px 3px 0;
    }

    .zoomout {
      background-position:-61px -1px;
      border-radius:3px 0 0 3px;
      -moz-border-radius:3px 0 0 3px;
      -webkit-border-radius:3px 0 0 3px;
    }

## Tooltips

__Class Name:__ `.map-tooltip`

    <div class="map-tooltip map-tooltip-0">
        <!-- Tooltip content -->
    </div>

    .map-tooltip {
      background:#333;
      color:#fff;
      display:block;
      position:absolute;
      z-index:999999;
      left:10px;
      top:10px;
      max-width:300px;
      padding:10px;
      border:1px solid #ccc;
      border-radius:3px;
      -webkit-border-radius:3px;
      box-shadow:rgba(0,0,0,0.1) 0 1px 3px;
      -webkit-box-shadow:rgba(0,0,0,0.1) 0 1px 3px;
      -webkit-user-select:auto;
    }

An optional classname of `.map-fade` is added to `.map-tooltip` when you initially mouse over/out on an element.
This is added when animation is set to true. This additional class provides an easy way to apply fading animation
using css. The default styling look like this:

    .map-tooltip {
      opacity:1;
      -webkit-transition:opacity 150ms;
      -moz-transition:opacity 150ms;
    }
    .map-fade { opacity:0; }

## Legend

__Class Names:__ `.map-legends, .map-legend`

    <div class="map-legends">
        <div class="map-legend">
            <!-- Legend content -->
        </div>
    </div>

## Fullscreen

__Class Name:__ `.map-fullscreen`

__Markup__

    <a class="map-fullscreen" href="#fullscreen">fullscreen</a>

## Attribution

__Class Name:__ `.map-attribution`

__Markup__

    <div class="map-attribution map-mm"></div>
