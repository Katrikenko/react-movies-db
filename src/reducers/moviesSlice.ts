import { ActionWithPayload, createReducer } from "../redux/utils";
import { AppThunk } from "../store";
import { MoviesFilters, client } from "../api/tmdb";
import { genres } from "../features/Movies/genres";

export interface Movie {
    id: number,
    title: string,
    popularity: number,
    overview: string,
    image?: string,
}

export interface Genre {
  id: number;
  name: string;
}

interface MovieState {
    top: Movie[];
    loading: boolean;
    page: number;
    hasMorePages: boolean;
    genres: Genre[];
}

const initialState: MovieState = {
    top: [],
    loading: false,
    page: 0,
    hasMorePages: true,
    genres,
}

 const moviesLoaded = (movies: Movie[], page: number, hasMorePages: boolean) => ({
    type: "movies/loaded",
    payload: {movies, page, hasMorePages},
});

 const moviesLoading = () => ({
    type: "movies/loading",
    
})

export const resetMovies = () => ({
  type: "movies/reset"
})

export function fetchNextPage(filters: MoviesFilters = {}): AppThunk<Promise<void>> {
    return async (dispatch, getState) => {
      const nextPage = getState().movies.page + 1;
       dispatch(fetchPage(nextPage, filters))
    }
}

function fetchPage(page: number, filters: MoviesFilters = {}): AppThunk<Promise<void>> {
  return async(dispatch) => {
    dispatch(moviesLoading());

    const config = await client.getConfiguration();
    const imageUrl = config.images.base_url;
    const moviesResponse = await client.getMovies(page, filters);

    const mappedResults: Movie[] = moviesResponse.results.map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      popularity: m.popularity,
      image: m.backdrop_path
        ? `${imageUrl}w780${m.backdrop_path}`
        : undefined,
    }));

    const hasMorePages = moviesResponse.page < moviesResponse.totalPages;

    dispatch(moviesLoaded(mappedResults, page, hasMorePages));
  }
}

const moviesReducer = createReducer<MovieState>(initialState,
    {
        "movies/loaded": (state, action: ActionWithPayload<{movies: Movie[], page: number, hasMorePages: boolean }>) => {
            return {
                ...state,
                top: [...state.top, ...action.payload.movies],
                page: action.payload.page,
                hasMorePages: action.payload.hasMorePages,
                loading: false
            };
        },
        "movies/loading": (state, action) => {
            return {
                ...state,
                loading: true
            };
        },
        "movies/reset": (state) => {
          return { ...initialState }
        }
    })


export default moviesReducer;