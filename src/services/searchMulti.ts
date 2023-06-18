import { getAxios } from "@/helpers/apiHelper";
import {  SEARCH_MULTI } from "@/helpers/urlHelper";

export const getSearchMulti = (search:string, page:number) => {
    // getAxios(SEARCH_MULTI, {params:params})
    return getAxios(SEARCH_MULTI, {
        params: {query: search, page: page}
    })
}

// export const getSearchMulti2 = (search:string) => {
//     getAxios(`${SEARCH_MULTI}?${search}`)
// }