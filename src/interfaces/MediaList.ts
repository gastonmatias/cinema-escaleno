export interface IMediaList {
    page: number;
    results: IMediaItem[];
    total_pages: number;
    total_results: number;
}

export interface IMediaItem {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;

    // Propiedades específicas de películas
    title?: string;
    release_date?: Date;

    // Propiedades específicas de series
    name?: string;
    first_air_date?: Date;
    origin_country?: string[];
    original_name?: string;

    // otras props específicas opcionales
    adult?: boolean;
    video?: boolean;
}

export enum MediaType {
    Tv = "tv",
    Movie = "movie",
}
