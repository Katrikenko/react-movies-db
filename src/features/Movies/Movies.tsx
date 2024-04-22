import { Movie, fetchMovies } from "../../reducers/movies";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { MovieCard } from "./MovieCard";
import { useAppDispatch } from "../../hooks";

import { useEffect, useContext } from "react";
import { Container, LinearProgress, Typography, Grid } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";

interface MoviesProps {
  movies: Movie[];
  loading: boolean;
}

function Movies({ movies, loading }: MoviesProps) {
  const dispatch = useAppDispatch();
  // const movies = useAppSelector((state) => state.movies.top);
  // const loading = useAppSelector((state) => state.movies.loading);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Now playing
      </Typography>
      {loading ? (
        <LinearProgress color="secondary" />
      ) : (
        <Grid container spacing={4}>
          {movies.map((m) => (
            <Grid item key={m.id} xs={12} sm={6} md={4}>
              <MovieCard
                id={m.id}
                title={m.title}
                overview={m.overview}
                popularity={m.popularity}
                image={m.image}
                enableUserActions={loggedIn}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

export default connector(Movies);
