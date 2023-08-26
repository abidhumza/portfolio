import React, { useRef, useEffect } from "react";

const GoogleMap = () => {
  const mapContainerRef = useRef(null);
  const map = useRef(null);
  const marker = useRef(null); // Reference to the marker

  useEffect(() => {
    // Initialize the map when the component mounts
    if (!map.current) {
      map.current = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 28.645571, lng: 77.214333 },
        zoom: 15,
      });

      // Add a marker at your specified position
      marker.current = new window.google.maps.Marker({
        position: { lat: 28.645571, lng: 77.214333 }, // Home Location
        map: map.current,
        title: "My Location",
      });

      // Create an info window for the marker
      const infoWindow = new window.google.maps.InfoWindow({
        content: "<div style='color: #000;'>My Location</div>",
      });

      // Open the info window when the marker is clicked
      marker.current.addListener("click", () => {
        infoWindow.open(map.current, marker.current);
      });
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          width: "75%",
          height: "400px",
          margin: "0 auto 50px auto", // Horizontally center
          borderRadius: "8px",
        }}
      />
    </div>
  );
};

export default GoogleMap;
