// mapa no tema escuro
export const estiloMapaEscuro = [
    { elementType: "geometry", stylers: [{ color: "#1d2033" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#8b8fb0" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#1d2033" }] },
    { featureType: "administrative.locality", elementType: "labels.text.fill", stylers: [{ color: "#c3c6e0" }] },
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "road", elementType: "geometry", stylers: [{ color: "#2c3050" }] },
    { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212437" }] },
    { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#3b3f66" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
    { featureType: "water", elementType: "geometry", stylers: [{ color: "#111427" }] },
];

// mapa no tema claro
export const estiloMapaClaro = [
    { featureType: "poi", stylers: [{ visibility: "off" }] },
    { featureType: "transit", stylers: [{ visibility: "off" }] },
];
