By default, mapbox.js provides styled map controls. If you would like to override any of these
elements this section covers the default markup and CSS. Alter any of these styles in your own css
that follows after `mapbox.css`

## General

UI elements by default also share some of the same css:

    .zoomer,
    .map-fullscreen,
    .map-tooltip .close {
    text-indent:-999em;
      background: #fff url(data:image/png;base64,ENCODED-PNG-DATA-GOES-HERE) no-repeat 0 0;
      overflow:hidden;
      display:block;
    }

__Note for Internet Explorer 7 users:__ `mapbox.css` uses a
[Data URI](http://en.wikipedia.org/wiki/Data_URI_scheme) as its source
for images which is not supported in versions less than Internet Explorer 8.
To support these users you can link directly to a [CDN hosted version of the image](http://api.tiles.mapbox.com/mapbox.js/v0.5.5/map-controls.png) in your css.

Other elements like legends, tooltips along with ui controls share the same css:

    .zoomer,
    .map-legends,
    .map-tooltip,
    .map-fullscreen {
      position:absolute;
      border:1px solid #bbb;
      box-sizing:border-box;
      background:#fff;
      -webkit-border-radius:3px;
              border-radius:3px;
      }

## Zoom controls

__Markup__

    <a href="#" class="zoomer zoomin">+</a>
    <a href="#" class="zoomer zoomout">-</a>

__Default css__

    .zoomer {
      width:30px;
      height:30px;
      top:10px;
      left:10px;
      z-index:2;
    }

    .zoomin {
      background-position:-31px -1px;
      left:39px;
      -webkit-border-radius:0 3px 3px 0;
              border-radius:0 3px 3px 0;
    }

    .zoomout {
      background-position:-61px -1px;
      -webkit-border-radius:3px 0 0 3px;
              border-radius:3px 0 0 3px;
    }

    .zoomer:active {
      border-color:#b0b0b0;
      background-color:#f0f0f0;
      -webkit-box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
              box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
    }

When a zoom control is out of range a class name of `.zoomdisabled` The following CSS applied:

    .zoomdisabled {
        background-color:#eee;
    }

## Tooltips

__Markup__

    <div class="map-tooltip map-tooltip-0">
        <!-- Tooltip content -->
    </div>

__Default css__

    .map-tooltip {
      z-index:999999;
      padding:10px;
      top:10px;
      right:10px;
      max-width:300px;
      opacity:1;
      -webkit-transition:opacity 150ms;
       -moz-transition:opacity 150ms;
        -ms-transition:opacity 150ms;
         -o-transition:opacity 150ms;
            transition:opacity 150ms;
      -webkit-user-select:auto;
       -moz-user-select:auto;
            user-select:auto;
    }

An optional className of `.map-fade` is added to `.map-tooltip` when you initially mouse over/out on an element.
This is added when animation is set to true. This additional class provides an easy way to apply fading animation
using CSS. The default styling look like this:

    .map-tooltip {
      opacity:1;
      -webkit-transition:opacity 150ms;
      -moz-transition:opacity 150ms;
    }
    .map-fade { opacity:0; }

When a tooltip has the interaction of a full formatter a close element is applied:

__Markup__

__Default css__

    .map-tooltip .close {
      top:4px;
      right:4px;
      width:20px;
      height:20px;
      background-position:-6px -6px;
      }

    .map-tooltip .close:active {
      border-color:#b0b0b0;
      background-color:#f0f0f0;
      -webkit-box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
              box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
    }

## Legend

__Markup__

    <div class="map-legends">
        <div class="map-legend">
            <!-- Legend content -->
        </div>
    </div>

__Default css__

    .map-legends {
      position:absolute;
      right:10px;
      bottom:10px;
      z-index:999999;
    }

    .map-legends .map-legend {
        padding:10px;
    }

## Fullscreen

__Markup__

    <a class="map-fullscreen" href="#fullscreen">fullscreen</a>

__Deafult css__

    .map-fullscreen {
      width: 30px;
      height: 30px;
      background-position: -90px 0;
      position:absolute;
      top:10px;
      left:74px;
      z-index:99999;
    }

    .map-fullscreen-map {
      position:fixed!important;
      width:auto!important;
      height:auto!important;
      top:0;
      left:0;
      right:0;
      bottom:0;
      z-index:99999999999;
    }

    .map-fullscreen-map .map-fullscreen {
      background-position: -120px 0;
    }

    .map-fullscreen:active {
      border-color:#b0b0b0;
      background-color:#f0f0f0;
      -webkit-box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
              box-shadow:inset 0 1px 3px rgba(0,0,0,0.15);
    }

When fullscreen is enabled an additional class of `map-fullscreen-map` is applied to the body element of the page.

## Attribution

__Markup__

    <div class="map-attribution map-mm"></div>

__Default css__

    .map-attribution {
      position:absolute;
      background-color:rgba(255,255,255,0.7);
      color:#333;
      font-size:11px;
      line-height:20px;
      z-index:99999;
      text-align:center;
      padding:0 5px;
      bottom:0;
      left:0;
      }

## Retina screens

To support screens a [media query](http://www.w3.org/TR/css3-mediaqueries/) is provided
with an alternate scaled-up version of the image sprite for the controls:

    @media
      only screen and (-webkit-min-device-pixel-ratio : 2),
      only screen and (min-device-pixel-ratio : 2) {
        .zoomer,
        .map-fullscreen,
        .map-tooltip .close {
          background-image: url(data:image/png;base64,ENCODED-PNG-DATA-GOES-HERE);
          background-size: 150px 30px;
          }
      }
