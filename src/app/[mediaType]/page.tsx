"use client"
import { Layout } from "@/components";
import {  getPopularMovies, getPopularSeries } from "@/services";
import { Box,  Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SpinnerCircle } from "@/components/UI/SpinnerCircle";
import { MediaList } from "@/components/MediaList";
import { useEffect, useState } from "react";
import { MediaType } from "@/interfaces/MediaList";
import { Paginator } from "@/components/UI";


const MediaTypePage:NextPage = () => {

    const path = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const pageFromParams = searchParams.get('page')

    const [mediaType, setMediaType] = useState<MediaType>(MediaType.Movie);
    const [page, setPage] = useState(1);
    
    const isMovie = path.includes('Movies')

    // obtiene string desde el path url
    // para diferenciar si se trata de movie o serie, de ello dependera el llamado a la api
    useEffect(() => {
        path.includes('Movies') && setMediaType(MediaType.Movie)
        path.includes('Series') && setMediaType(MediaType.Tv)
    }, []);

    useEffect(() => {
        // Si se cambia la URL directamente, actualiza el estado de page
        if (pageFromParams !== null) {
          setPage(Number(pageFromParams));
        }
      }, [pageFromParams]);
    
    // Efecto para cambiar la URL cuando se actualiza el estado de page
    useEffect(() => {
      const url = `${path}?page=${page}`;
      router.push(url);
    }, [page, path, router]); 


    // llamado a la api
    const {isLoading, data, isRefetching,refetch} = useQuery({
        queryKey:['repoDataMovie', page],
        queryFn: () =>  isMovie
            ? getPopularMovies(Number(page))
            : getPopularSeries(Number(page)) ,
        refetchOnMount: 'always'
    })

    return (
        <Layout title={mediaType===MediaType.Movie? 'movies':'series'} >

        <Typography variant="h2" color="primary">
            {mediaType===MediaType.Movie? 'Popular Movies': 'Popular Series'}
        </Typography>

        { isLoading || isRefetching 
            ? <SpinnerCircle isLoading={isLoading} height={'80vh'} width={'80vw'}/>
            : null 
        }
        
        {
            !isLoading && !isRefetching
                // ? <MediaList data={data} title={"The most loved!"} type={mediaType}/>
                ?<>
                    <MediaList data={data} title={"The most loved!"} type={mediaType}/>
                    <Box justifyContent='center' sx={{display: 'flex', paddingBottom:'1rem'}}>
                        <Paginator 
                            count={data.total_pages < 500 ? data.total_pages: 500}  //! aunque api diga qe peticion tiene 4890 pages, el max a solicitar es 500 ("page must be less than or equal to 500)
                            setPage={setPage} 
                            page={Number(page)} 
                            refetch={refetch}
                        />
                    </Box>
                </> 
                :null
        }


        
        </Layout>
    )
}
export default MediaTypePage
