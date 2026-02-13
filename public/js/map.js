function initMap() {
  if (!window.listingData) return;

  // GeoJSON format: [lng, lat]
  const lng = window.listingData.coordinates[0];
  const lat = window.listingData.coordinates[1];

  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lng },
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div class="map-click">
        <h5><b>${window.listingData.title}</b></h5>
        <p>Exact location will be provided after booking.</p>
      </div>
    `,
  });

  const marker = new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
  });

  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });
}

// Make sure Google Maps is loaded
window.addEventListener("load", initMap);
