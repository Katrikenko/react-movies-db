import { CardMedia, Card, CardActions, IconButton } from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useState, useRef } from "react";

export function CountdownVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  function togglePlaying() {
    const nextPlaying = !isPlaying;

    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }

  return (
    <Card>
      <CardMedia>
        <video
          ref={videoRef}
          src="coming_soon.mp4"
          height="500"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </CardMedia>
      <CardActions>
        <IconButton onClick={togglePlaying}>
          {isPlaying ? (
            <PauseIcon sx={{ height: 38, width: 38 }} />
          ) : (
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          )}
        </IconButton>
      </CardActions>
    </Card>
  );
}
