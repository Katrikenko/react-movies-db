import { Container, Typography, Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { addPopupToMapWidget, createMapWidget } from "./mapWidget";
import { Map } from "leaflet";
import { createPortal } from "react-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (mapRef.current === null) {
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);
  return (
    <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
      {popupContainer !== null && createPortal(<Greeting />, popupContainer)}
    </Container>
  );
}

function Greeting() {
  return (
    <Box sx={{ width: 80, mx: -1 }}>
      <Typography>Greetings from Italy!</Typography>
      <FavoriteIcon sx={{ color: "#008C45" }} />
      <FavoriteIcon sx={{ color: "#F4F5F0" }} />
      <FavoriteIcon sx={{ color: "#CD212A" }} />
    </Box>
  );
}