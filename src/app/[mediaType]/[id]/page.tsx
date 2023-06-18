"use client"
import { Layout } from "@/components";
import { getMovieById, getSerieById } from "@/services";
import { Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { usePathname } from 'next/navigation';
import { SpinnerCircle } from "@/components/UI/SpinnerCircle";
import { MediaTypeItemCard } from "@/components/MediaTypeItemCard";

const MediaTypeItemPage:NextPage = () => {

    const path = usePathname()

    // obtiene string desde el path url
    // para diferenciar si se trata de movie o serie, de ello dependera el llamado a la api
    const isMovie = path.includes('movies')

    // obtener id desde el path url
    const id = path.split('/').pop();

    // llamado a la api
    const {isLoading, data, isRefetching} = useQuery({
        queryKey:['repoDataMovie'],
        queryFn: () =>  isMovie? getMovieById(id!): getSerieById(id!) ,
        refetchOnMount: 'always'
    })

    console.log(data);

  
    return (
        <Layout title={isMovie? 'movie detail':'serie detail'} >

            <Grid container
                direction="row"
                alignItems="center"
             >

                { isLoading || isRefetching 
                    ? <SpinnerCircle isLoading={isLoading} height={'80vh'} width={'80vw'}/>
                    : null 
                }

                {
                    !isLoading && !isRefetching
                    ? 
                    <>
                    <Grid item>
                        <Typography variant="h3" color="primary">
                            {isMovie? data.title: data.name}
                        </Typography>
                    </Grid>

                    <MediaTypeItemCard data={data} isMovie={isMovie}/>
                    </>
                    :null
                }

            </Grid>
        </Layout>
    )
}
export default MediaTypeItemPage
