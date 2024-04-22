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
}