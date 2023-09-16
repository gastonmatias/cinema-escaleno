import { getAxios } from "@/helpers/apiHelper";
import { SERIE_BY_ID, SERIE_LIST_POPULAR, TRENDING_SERIES } from "@/helpers/urlHelper";

export const getTrendingSeries = () => getAxios(TRENDING_SERIES)

export const getPopularSeries = (page:number) =>{
    return getAxios(SERIE_LIST_POPULAR, {params:{page}} )
} 

export const getSerieById = ( serieId:string ) =>{
    return getAxios(`${SERIE_BY_ID}/${serieId}`)
}