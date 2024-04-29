import { fetchNextPage, resetMovies } from "../../reducers/moviesSlice";
import { connect } from "react-redux";
import { RootState } from "../../store";
import MovieCard from "./MovieCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Movie } from "../../reducers/moviesSlice";

import { useEffect, useContext, useState, useCallback, lazy, Suspense } from "react";
import { Container, LinearProgress, Grid, Typography } from "@mui/material";
import { AuthContext, anonymousUser } from "../../AuthContext";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { Filters } from "./MoviesFilter";

const MoviesFilter = lazy(() => import("./MoviesFilter"));

export function Component() {
  const [filters, setFilters] = useState<Filters>();
  const dispatch = useAppDispatch();
  const movies: Movie[] = useAppSelector((state) => state.movies.top);
  const loading = useAppSelector((state) => state.movies.loading);
  const hasMorePages = useAppSelector((state) => state.movies.hasMorePages);

  const { user } = useContext(AuthContext);
  const loggedIn = user !== anonymousUser;

  const [targetRef, entry] = useIntersectionObserver();

  useEffect(() => {
    dispatch(resetMovies());
  }, [dispatch]);

  useEffect(() => {
    if (entry?.isIntersecting && hasMorePages) {
      const moviesFilters = filters
        ? {
            keywords: filters.keywords.map((k) => k.id),
            genres: filters.genres,
          }
        : undefined;

      dispatch(fetchNextPage(moviesFilters));
    }
  }, [dispatch, entry?.isIntersecting, filters, hasMorePages]);

  const handlerAddFavorite = useCallback(
    (id: number) => {
      alert(`Not implemented! Action: ${user.name} is adding movie ${id} to favorites.`);
    },
    [user.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters...</span>}>
          <MoviesFilter
            onApply={(f) => {
              dispatch(resetMovies());
              setFilters(f);
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!loading && !movies.length && (
            <Typography variant="h6">No movies were found that match your query</Typography>
          )}
          <Grid container spacing={4}>
            {movies.map((m, i) => (
              <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                <MovieCard
                  id={m.id}
                  title={m.title}
                  overview={m.overview}
                  popularity={m.popularity}
                  image={m.image}
                  enableUserActions={loggedIn}
                  onAddFavorite={handlerAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {loading && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: RootState) => ({
  movies: state.movies.top,
  loading: state.movies.loading,
});

const connector = connect(mapStateToProps);

// export default connector(Movies);

Component.displayName = "Movies";
