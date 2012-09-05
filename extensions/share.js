if (typeof mapbox === 'undefined') mapbox = {};

mapbox.share = function() {
    var share = {},
        map;

    tj = {};
    var l = window.location;
    tj.webpage = l.href;
    tj.embed = (l.hash) ? l.href + '?embed' : l.href + '#/?embed';

    var link = document.createElement('a');
    var close = document.createElement('a');
    var embed = document.createElement('textarea');
    var share = document.createElement('div');
    var popup = document.createElement('div');
    var elements = [link, close, embed, share, popup];

    for (var i = 0; i < elements.length; i++) {
        MM.addEvent(elements[i], 'mousedown', MM.cancelEvent);
        MM.addEvent(elements[i], 'dblclick', MM.cancelEvent);
    }

    link.innerHTML = 'Share +';
    link.href = '#';
    link.className = 'share';
    link.onclick = link.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };

    close.innerHTML = 'Close';
    close.href = '#';
    close.className = 'close';
    close.onclick = close.ontouchstart = function() {
        popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
        $('body').toggleClass('sharing');
        return false;
    };

    embed.className = 'embed';
    embed.rows = 4;
    embed.setAttribute('readonly', 'readonly');
    embed.value = '<iframe width="500" height="300" frameBorder="0" src="{{embed}}"></iframe>'
        .replace('{{embed}}', tj.embed);
    embed.onclick = function() {
        embed.focus();
        embed.select();
        return false;
    };

    var twitter = 'http://twitter.com/intent/tweet?status='
        + encodeURIComponent(document.title + ' (' + tj.webpage + ')');
    var facebook = 'https://www.facebook.com/sharer.php?u='
        + encodeURIComponent(tj.webpage)
        + '&t=' + encodeURIComponent(document.title);
    share.innerHTML = ('<h3>Share this map</h3>'
        + '<p><a class="facebook" target="_blank" href="{{facebook}}">Facebook</a>'
        + '<a class="twitter" target="_blank" href="{{twitter}}">Twitter</a></p>')
        .replace('{{twitter}}', twitter)
        .replace('{{facebook}}', facebook);
    share.innerHTML += '<strong>Get the embed code</strong><br />'
    share.innerHTML += '<small>Copy and paste this HTML into your website or blog.</small>';
    share.appendChild(embed);
    share.appendChild(close);

    popup.className = 'map-share';
    popup.style.display = 'none';
    popup.appendChild(share);

    share.map = function(x) {
        if (!x) return map;
        map = x;
        return this;
    };

    share.add = function() {
        this.appendTo($('body')[0]);
        return this;
    };

    share.remove = function() {
        $(link).remove();
        $(popup).remove();
        return this;
    };
    
    share.appendTo = function(elem) {
        wax.u.$(elem).appendChild(link);
        wax.u.$(elem).appendChild(popup);
        return this;
    };

    return share;
};
