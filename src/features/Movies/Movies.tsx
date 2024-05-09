import MovieCard from "./MovieCard";

import { useState, useCallback, lazy, Suspense } from "react";
import { Container, LinearProgress, Grid, Typography } from "@mui/material";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import {
  useGetConfigurationQuery,
  useGetMoviesQuery,
  MoviesQuery,
  MoviesFilters,
} from "../../services/tmdb";
import { useAuth0 } from "@auth0/auth0-react";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
};

const MoviesFilter = lazy(() => import("./MoviesFilter"));

export function Component() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;

  function formatImageUrl(path?: string) {
    return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;
  }

  const { isAuthenticated, user } = useAuth0();

  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);

  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handlerAddFavorite = useCallback(
    (id: number) => {
      alert(`Not implemented! Action: ${user?.name} is adding movie ${id} to favorites.`);
    },
    [user?.name]
  );

  return (
    <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
      <Grid item xs="auto">
        <Suspense fallback={<span>Loading filters...</span>}>
          <MoviesFilter
            onApply={(filters) => {
              const moviesFilters: MoviesFilters = {
                keywords: filters.keywords.map((k) => k.id),
                genres: filters.genres,
              };
              setQuery({
                page: 1,
                filters: moviesFilters,
              });
            }}
          />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ py: 8 }} maxWidth="lg">
          {!isFetching && !movies.length && (
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
                  image={formatImageUrl(m.backdrop_path)}
                  enableUserActions={isAuthenticated}
                  onAddFavorite={handlerAddFavorite}
                />
              </Grid>
            ))}
          </Grid>
          <div ref={targetRef}>
            {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
          </div>
        </Container>
      </Grid>
    </Grid>
  );
}

Component.displayName = "Movies";
