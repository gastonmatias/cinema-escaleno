"use client"
import { Layout } from "@/components";
import { getMovieById } from "@/services";
import { Grid, Paper, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { usePathname } from 'next/navigation';
import { MovieCard } from '../../../components/MediaTypeItemCard';


const MoviePage:NextPage = () => {

    const path = usePathname()

    const id = path.split('/').pop();


    // const {isLoading, data:movie, isRefetching} = useQuery({
    //     queryKey:['repoDataMovie'],
    //     queryFn: () => getMovieById(id!),
    //     refetchOnMount: 'always'
    // })


  
    return (
        <Layout title={"movie detail"} >
            {/* <Paper variant="outlined" />

                {isLoading || isRefetching ? <h2>Cargando...</h2> : null }

                {
                    !isLoading && !isRefetching
                    ? 
                    <>
                    <Typography variant="h3" color="primary">{movie.title}</Typography>
                        <Grid container gap={2} sx={{mt:2}}>
                            <Grid item xs={12} sm={5} >
                                <MovieCard movie={movie}/>
                            </Grid>

                            <Grid item xs={12} sm={5} display='flex'>
                                <Paper  sx={{p:2}}>
                                    {movie.overview}
                                </Paper>
                            </Grid>
                        </Grid>
                    </>
                    
                    :null
                } */}

        </Layout>
    )
}
export default MoviePage
