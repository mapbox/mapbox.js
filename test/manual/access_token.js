var match = location.search.match(/access_token=([^&\/]*)/);
var accessToken = match && match[1];

if (accessToken) {
    localStorage.accessToken = accessToken;
} else {
    accessToken = localStorage.accessToken;
}

L.mapbox.accessToken = accessToken;
