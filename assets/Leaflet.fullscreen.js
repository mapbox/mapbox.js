L.Control.Fullscreen = L.Control.extend({
    options: {
        position: 'topleft',
        title: {
            false: 'View Fullscreen',
            true: 'Exit Fullscreen'
        }
    },

    onAdd: function (map) {
        var container = L.DomUtil.create('div', 'leaflet-control-fullscreen leaflet-bar leaflet-control');

        this.link = L.DomUtil.create('a', 'leaflet-control-fullscreen-button leaflet-bar-part', container);
        this.link.href = '#';

        this._map = map;
        this._map.on('fullscreenchange', this._toggleTitle, this);
        this._toggleTitle();

        L.DomEvent.on(this.link, 'click', this._click, this);

        return container;
    },

    _click: function (e) {
        L.DomEvent.stopPropagation(e);
        L.DomEvent.preventDefault(e);
        this._map.toggleFullscreen();
    },

    _toggleTitle: function() {
        this.link.title = this.options.title[this._map.isFullscreen()];
    }
});

L.Map.include({
    isFullscreen: function () {
        return this._isFullscreen || false;
    },

    toggleFullscreen: function () {
        var container = this.getContainer();
        if (this.isFullscreen()) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else {
                L.DomUtil.removeClass(container, 'leaflet-pseudo-fullscreen');
                this._toggleFullscreenClass();
                this.invalidateSize();
                this._isFullscreen = false;
                this.fire('fullscreenchange');
            }
        } else {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.mozRequestFullScreen) {
                container.mozRequestFullScreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else {
                L.DomUtil.addClass(container, 'leaflet-pseudo-fullscreen');
                this._toggleFullscreenClass();
                this.invalidateSize();
                this._isFullscreen = true;
                this.fire('fullscreenchange');
            }
        }
    },

    _toggleFullscreenClass: function() {
        var container = this.getContainer();
        if (this.isFullscreen()) {
            L.DomUtil.removeClass(container, 'leaflet-fullscreen-on');
        } else {
            L.DomUtil.addClass(container, 'leaflet-fullscreen-on');
        }
    },

    _onFullscreenChange: function () {
        var fullscreenElement =
            document.fullscreenElement ||
            document.mozFullScreenElement ||
            document.webkitFullscreenElement;

        this._toggleFullscreenClass();
        if (fullscreenElement === this.getContainer()) {
            this._isFullscreen = true;
            this.fire('fullscreenchange');
        } else if (this._isFullscreen) {
            this._isFullscreen = false;
            this.fire('fullscreenchange');
        }
    }
});

L.Map.mergeOptions({
    fullscreenControl: false
});

L.Map.addInitHook(function () {
    if (this.options.fullscreenControl) {
        this.fullscreenControl = new L.Control.Fullscreen();
        this.addControl(this.fullscreenControl);
    }

    var fullscreenchange;

    if ('onfullscreenchange' in document) {
        fullscreenchange = 'fullscreenchange';
    } else if ('onmozfullscreenchange' in document) {
        fullscreenchange = 'mozfullscreenchange';
    } else if ('onwebkitfullscreenchange' in document) {
        fullscreenchange = 'webkitfullscreenchange';
    }

    if (fullscreenchange) {
        this.on('load', function () {
            L.DomEvent.on(document, fullscreenchange, this._onFullscreenChange, this);
        });

        this.on('unload', function () {
            L.DomEvent.off(document, fullscreenchange, this._onFullscreenChange);
        });
    }
});

L.control.fullscreen = function (options) {
    return new L.Control.Fullscreen(options);
};
