'use strict';

var util = require('./util');

var GridControl = L.Control.extend({

    options: {
        mapping: {
            mousemove: {
                format: 'teaser',
                popup: false,
                pin: false
            },
            click: {
                format: 'full',
                popup: false,
                pin: true
            },
            mouseout: {
                format: function() { return ''; },
                popup: false,
                pin: false
            }
        },
        sanitizer: require('./sanitize')
    },

    _currentContent: '',

    // is this control hidden? when true, the control has display:none
    _hidden: true,

    // pinned means that this control is on a feature and the user has likely
    // clicked. pinned will not become false unless the user clicks off
    // of the feature onto another or clicks x
    _pinned: false,

    initialize: function(_, options) {
        L.Util.setOptions(this, options);
        util.strict_instance(_, L.Class, 'L.L.mapbox.gridLayer');
        this._layer = _;
    },

    // change the content of the tooltip HTML if it has changed, otherwise
    // noop
    setContent: function(_, popup) {
        if (!_) {
            this._hide();
            this._map.closePopup();

        } else if (_ !== this._currentContent ||  // switching content
                popup !== this._hidden ||  // switching from popup to corner thing
                popup && this._map._popup !== this._popup) {  // popup has since been closed

            if (popup) {
                this._popup.setContent(_).openOn(this._map);
                this._hide();
            } else {
                if (this._hidden) this._show();
                this._contentWrapper.innerHTML = _;
                this._map.closePopup();
            }
            this._currentContent = _;
        }
        this._currentContent = _;
    },

    _show: function() {
        this._hidden = false;
        this._container.style.display = 'block';
    },

    _hide: function() {
        this._currentContent = '';
        this._hidden = true;
        this._pinned = false;
        this._contentWrapper.innerHTML = '';
        this._container.style.display = 'none';
        L.DomUtil.removeClass(this._container, 'closable');
    },

    _handler: function(type, o) {
        var mapping = this.options.mapping[type],
            format = mapping.format,
            popup = mapping.popup,
            formatted;

        if (o[this.options.mapping.click.format]) {
            L.DomUtil.addClass(this._map._container, 'map-clickable');
        } else {
            L.DomUtil.removeClass(this._map._container, 'map-clickable');
        }

        // mousemoves do not close or affect this control when
        // a tooltip is pinned open
        if ((type === 'mousemove' ||
             type === 'mouseout') && this._pinned) return;
        if (typeof format === 'function') {
            formatted = format(o);
            if (typeof formatted === 'string') {
                this.setContent(this.options.sanitizer(formatted), popup);
            }
        // a template. in this case, the content will already be templated
        // by `L.L.mapbox.gridLayer`
        } else if (o[format]) {
            formatted = o[format];
            if (format === 'location') {
                window.top.location.href = formatted;
            } else {
                this.setContent(this.options.sanitizer(formatted), popup);
                if (popup) this._popup.setLatLng(o.latLng);
            }
        // a click outside of valid features while the map is pinned
        // should unpin the tooltip
        } else if (type === 'click' &&
            !o.data &&
            this._pinned) {
            this.setContent('');
        }

        if (mapping.pin && o[format]) {
            L.DomUtil.addClass(this._container, 'closable');
            this._pinned = true;
        } else {
            L.DomUtil.removeClass(this._container, 'closable');
        }
    },

    _mousemove: function(o) { this._handler('mousemove', o); },
    _mouseout: function(o) { this._handler('mouseout', o); },
    _click: function(o) { this._handler('click', o); },

    _createClosebutton: function(container, fn) {
        var link = L.DomUtil.create('a', 'close', container);

        link.innerHTML = 'close';
        link.href = '#';
        link.title = 'close';

        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'mousedown', L.DomEvent.stopPropagation)
            .on(link, 'dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', fn, this);

        return link;
    },

    onAdd: function(map) {
        this._map = map;

        var className = 'leaflet-control-grid map-tooltip',
            container = L.DomUtil.create('div', className),
            contentWrapper = L.DomUtil.create('div', 'map-tooltip-content');

        // hide the container element initially
        container.style.display = 'none';
        this._createClosebutton(container, this._hide);
        container.appendChild(contentWrapper);

        this._contentWrapper = contentWrapper;
        this._popup = new L.Popup({ autoPan: false }).setLatLng([0, 0]).addTo(map);
        this._popup._close();

        L.DomEvent
            .disableClickPropagation(container)
            // allow people to scroll tooltips with mousewheel
            .addListener(container, 'mousewheel', L.DomEvent.stopPropagation);

        this._layer
            .on('mousemove', this._mousemove, this)
            .on('mouseout', this._mouseout, this)
            .on('click', this._click, this);

        return container;
    }
});

module.exports = function(_, options) {
    return new GridControl(_, options);
};
