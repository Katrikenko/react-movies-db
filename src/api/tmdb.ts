import configuration from "../configuration";

const apiBasePath = `${configuration.apiUrl}/3`

async function get<TBody>(relativeUrl: string): Promise<TBody> {
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            `Bearer ${configuration.apiToken}`,
        },
      };
    
      const response = await fetch(
        `${apiBasePath}${relativeUrl}`,
        options
      );
      const json: TBody = await response.json();
    
      return json;
}

export interface MovieDetails {
    id: number;
    title: string;
    popularity: number;
    overview: string;
    backdrop_path?: string;
}

interface PageResponse<TResult> {
    page: number;
    results: TResult[];
    total_pages: number;
}

interface PageDetailes<TResult> {
    page: number;
    results: TResult[];
    totalPages: number;
}

interface Configuration {
    images: {
        base_url: string;
    };
}

export interface KeywordItem {
  id: number;
  name: string;
}

export interface MoviesFilters {
  keywords?: number[]
}

export const client = {
    async getConfiguration() {
        return get<Configuration>("/configuration");
    },
    async getNowPlaying(page: number = 1): Promise<PageDetailes<MovieDetails>> {
          const res = await get<PageResponse<MovieDetails>>(
          `/movie/now_playing?language=en-US&page=${page}`,
        );

        return {
          results: res.results,
          page: res.page,
          totalPages: res.total_pages,
        };
    },
    async getMovies(page: number, filters: MoviesFilters) {
      const params = new URLSearchParams({
        page: page.toString()
      })

      if(filters.keywords?.length) {
        params.append("with_keywords", filters.keywords.join("|"))
      }

      const query = params.toString()

      const res = await get<PageResponse<MovieDetails>>(
        `/discover/movie?${query}}`,
      );

      return {
        results: res.results,
        page: res.page,
        totalPages: res.total_pages,
      };
    },
    async getKeywords(query: string) {
      const response = await get<PageResponse<KeywordItem>>(`/search/keyword?query=${query}`)

      return response.results;
    }
}