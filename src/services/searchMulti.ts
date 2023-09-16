import { getAxios } from "@/helpers/apiHelper";
import {  SEARCH_MULTI } from "@/helpers/urlHelper";

export const getSearchMulti = (search:string, page:number) => {
    return getAxios(SEARCH_MULTI, {
        params: {query: search, page: page}
    })
}