import { getAxios } from "@/helpers/apiHelper";
import { MOVIE_BY_ID, MOVIE_LIST_POPULAR, TRENDING_MOVIES } from "@/helpers/urlHelper";

export const getTrendingMovies = () =>{
    return getAxios(TRENDING_MOVIES)
} 

export const getPopularMovies = (page:number) =>{
    return getAxios(MOVIE_LIST_POPULAR, {params:{page}} )
} 

export const getMovieById = (movieId:string) =>{
    return getAxios(`${MOVIE_BY_ID}/${movieId}`)
} 
