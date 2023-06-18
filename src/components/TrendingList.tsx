import { FC } from "react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import {  Theme, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GradeIcon from '@mui/icons-material/Grade';

import { useRouter } from "next/navigation";
import { ITrendingList, TrendingMediaType } from "@/interfaces/trending";

interface Props{
  data: ITrendingList
  title: string
}

export const TrendingList:FC<Props> = ({data, title}) => {
  
  const router = useRouter()

  const theme = useTheme<Theme>();
  const isXsScreen = useMediaQuery( theme.breakpoints.only('xs'));

  const handleClickImage = (id:number,type:TrendingMediaType) => {
    type === TrendingMediaType.Movie
      ? router.push(`/movies/${id}`)
      : router.push(`/series/${id}`)
  }

  return (
    <>
    <ImageList cols={12} sx={{  }}>

      {/* //! title */}
      <ImageListItem key="Subheader" cols={12}>
        <ListSubheader component="div" sx={{display:'flex', alignContent:'center'}}>
          {`Trending ${title}`}
          <TrendingUpIcon color="primary"
            sx={{ml:1, alignSelf:'center'}}/>
          <LocalFireDepartmentOutlinedIcon color="error"
            sx={{ml:1, alignSelf:'center', textColor:'red'}}/>
        </ListSubheader>
      </ImageListItem>
      
      {/* //! items */}
        {data?.results.map((e) => (
          <ImageListItem
            onClick ={()=> handleClickImage(e.id,e.media_type)}
            key={e.id} 
            cols={isXsScreen ? 6 : 3} 
            sx={{ 
              cursor: 'pointer',
              '&:hover': {
                filter: 'brightness(120%)'
              },
            
            }}              
          >
            <img
              src=   {`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              srcSet={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
              alt={ e.media_type === TrendingMediaType.Movie? e.title : e.name  }
              loading="lazy"
              />

            <ImageListItemBar
              title={`${e.media_type === TrendingMediaType.Movie ? e.title : e.name}`}
              subtitle={
                <span style={{display:'flex', alignItems:'end'}}>
                  {e.vote_average.toFixed(1)}
                  <GradeIcon color="warning" sx={{fontSize: 'small' }} />
                </span>
              }              
            />
          </ImageListItem>
        ))}
    </ImageList>

    </>
  );
}
