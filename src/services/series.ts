import { getAxios } from "@/helpers/apiHelper";
import { SERIE_BY_ID, TRENDING_SERIES } from "@/helpers/urlHelper";

export const getTrendingSeries = () => getAxios(TRENDING_SERIES)

export const getSerieById = ( serieId:string ) =>{
    return getAxios(`${SERIE_BY_ID}/${serieId}`)
}