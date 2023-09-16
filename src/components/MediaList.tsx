import { FC } from "react";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import {  Grid, Theme, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery/useMediaQuery";

import LocalFireDepartmentOutlinedIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GradeIcon from '@mui/icons-material/Grade';

import { useRouter } from "next/navigation";
import { IMediaList, MediaType} from "@/interfaces/MediaList";
import { Paginator } from "./UI";

interface Props{
  data: IMediaList
  title: string
  type: MediaType
}

export const MediaList:FC<Props> = ({data, title, type}) => {
  
  const router = useRouter()

  const theme = useTheme<Theme>();
  const isXsScreen = useMediaQuery( theme.breakpoints.only('xs'));

  const handleClickImage = (id:number) => {
    type === MediaType.Movie
      ? router.push(`/movies/${id}`)
      : router.push(`/series/${id}`)
  }

  return (
    <>
    <ImageList cols={12}>

      {/* //! title */}
      <ImageListItem key="Subheader" cols={12}>
        <ListSubheader component="div" sx={{display:'flex', alignContent:'center'}}>
          {`${title}`}
          <TrendingUpIcon color="primary"
            sx={{ml:1, alignSelf:'center'}}/>
          <LocalFireDepartmentOutlinedIcon color="error"
            sx={{ml:1, alignSelf:'center', textColor:'red'}}/>
        </ListSubheader>
      </ImageListItem>
      
      {/* //! items */}
        {data?.results.map((e) => (
          <ImageListItem
            onClick ={()=> handleClickImage(e.id)}
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
              alt={ type === MediaType.Movie? e.title : e.name  }
              loading="lazy"
              />

            <ImageListItemBar
              title={`${type === MediaType.Movie ? e.title : e.name}`}
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
