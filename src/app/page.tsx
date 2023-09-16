'use client'

import { Layout } from '@/components/Layout'
import { getTrendingMovies, getTrendingSeries } from '@/services';

import {  NextPage } from 'next'
import { useQuery } from '@tanstack/react-query';
import Typography from '@mui/material/Typography'
import { TrendingList } from '@/components/TrendingList';
import { SpinnerCircle } from '@/components/UI';

const HomePage:NextPage= () => {

  const { isLoading:isLoadingMovies, data:dataMovies } = useQuery({
    queryKey: ['repoDataMovies'],
    queryFn: () => getTrendingMovies()
  })

  const { isLoading:isLoadingSeries, data:dataSeries } = useQuery({
    queryKey: ['repoDataSeries'],
    queryFn: () => getTrendingSeries()
  })


  return (
  <>
    <Layout title={'cinema-Home'} >
      
      <Typography variant="h2" color="primary" >Movies</Typography>
    
      {/* <SpinnerCircle isLoading={true} height={'50vh'} width={'90vw'}/> */}
      
      {
        isLoadingMovies
        ? <SpinnerCircle isLoading={isLoadingMovies} height={'50vh'} width={'70vw'}/>
        : <TrendingList data={dataMovies} title={'Movies'}/>
      }
      
      <Typography variant="h2" color="primary">Series</Typography>
       {/* <SpinnerCircle isLoading={true} height={'50vh'} width={'90vw'}/> */}
      
      {
        isLoadingSeries
        ? <SpinnerCircle isLoading={isLoadingSeries} height={'50vh'} width={'70vw'}/>
        : <TrendingList data={dataSeries} title={'Series'}/>
      }
      
    </Layout>
  
  </>
  )
}

export default HomePage
