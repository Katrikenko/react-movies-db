import {
  Card,
  CardContent,
  Typography,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  Box,
} from "@mui/material";
import { Character } from "../../services/rickandmorty";

interface EpisodeCardProps {
  name: string;
  episode: string;
  airDate: string;
  characters: Character[];
}

export function EpisodeCard({ name, episode, airDate, characters }: EpisodeCardProps) {
  return (
    <Card sx={{ height: "45vh", display: "flex", flexDirection: "column" }}>
      <CardContent sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Episode: {episode}
        </Typography>
        <Typography sx={{ mb: 1.5 }} variant="body2" color="text.secondary">
          {airDate}
        </Typography>
        <Box sx={{ maxHeight: "calc(100vh - 64px - 24px - 72px)" }}>
          <Typography variant="overline" sx={{ color: "text.primary", fontWeight: "bold" }}>
            Characters
          </Typography>
          {characters && characters.length > 0 ? (
            <Grid container spacing={1}>
              {characters.map((character) => (
                <ListItem key={character.id}>
                  <ListItemAvatar>
                    <Avatar alt={character.name} src={character.image} />
                  </ListItemAvatar>
                  <ListItemText primary={character.name} />
                </ListItem>
              ))}
            </Grid>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No characters available.
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
