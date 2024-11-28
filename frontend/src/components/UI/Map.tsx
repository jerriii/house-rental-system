// // src/components/Map.js

// import React, { useEffect } from "react";
// import L from "leaflet";

// const MapFunction = () => {
//   useEffect(() => {
//     // Initialize map
//     const map = L.map("map", {
//       center: [51.505, -0.09], // Initial map center [Latitude, Longitude]
//       zoom: 13,
//     });

//     // Add OpenStreetMap tile layer
//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     // Add a marker at a specific location
//     L.marker([51.505, -0.09])
//       .addTo(map)
//       .bindPopup("A marker at this location")
//       .openPopup();
//   }, []);

//   return (
//     <div
//       id="map"
//       style={{ height: "500px", width: "100%" }} // Adjust height and width as needed
//     />
//   );
// };

// const Map = () => {
//   return (
//     <div>
//       <h1>OpenStreetMap in React</h1>
//       <Map />
//     </div>
//   );
// };

// export default Map;
