import { FC } from "react"

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ISearchItem, SearchMediaType } from "@/interfaces/searchMulti";
import { useRouter } from "next/navigation";

interface Props{
    item:ISearchItem
}

export const ItemSearchCard:FC<Props> = ({item}) => {
  
  const imgPoster = `https://image.tmdb.org/t/p/w500/${item.poster_path}`

  const router = useRouter()
  
  const handleClickCard = (type:SearchMediaType) => {
    type === SearchMediaType.Movie
      ? router.push(`/movies/${item.id}`)
    : type === SearchMediaType.Tv
        ? router.push(`/series/${item.id}`)
        : type === SearchMediaType.Person
        ? alert('Oops! Page Actors in Progress, try movie or tv serie instead')
        :null
      // TODO: page people, x mientras redirige a 404 
      // : type === SearchMediaType.Person
      //   ? router.push(`/people/${item.id}`) : null
  }

  return (
  <>
      <Card onClick={() => handleClickCard(item.media_type)} >
      <CardActionArea>
        <CardMedia
          component="img"
          image={item.poster_path? imgPoster: 'https://media.istockphoto.com/id/1352945762/vector/no-image-available-like-missing-picture.jpg?s=612x612&w=0&k=20&c=4X-znbt02a8EIdxwDFaxfmKvUhTnLvLMv1i1f3bToog='}
          alt="img"
        />

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {
              item.media_type === SearchMediaType.Movie 
                ? item.title 
              : item.media_type === SearchMediaType.Tv
                ? item.name
              : item.media_type === SearchMediaType.Person
                ? item.name
              : null
            }
          </Typography>
          
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.media_type}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {
              item.media_type === SearchMediaType.Movie 
                ? item.release_date 
              : item.media_type === SearchMediaType.Tv
                ? item.first_air_date
              : item.media_type === SearchMediaType.Person
                ? item.known_for?.map(e=> e.title)
              : null
            }
          </Typography>

        </CardContent>
      </CardActionArea>
    </Card>
  </>
  )
}
