import { getAxios } from "@/helpers/apiHelper";
import { MOVIE_BY_ID, TRENDING_MOVIES } from "@/helpers/urlHelper";

export const getTrendingMovies = () =>{
    return getAxios(TRENDING_MOVIES)
} 

export const getMovieById = (movieId:string) =>{
    return getAxios(`${MOVIE_BY_ID}/${movieId}`)
} 
