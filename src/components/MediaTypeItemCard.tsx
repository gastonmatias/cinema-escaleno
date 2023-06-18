import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import GradeIcon from '@mui/icons-material/Grade';
import { IMediaItemDetail } from '@/interfaces/MediaItemDetails';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Button, Grid, Paper } from '@mui/material';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

interface Props{
    data: IMediaItemDetail
    isMovie: boolean
}

const cardClasses ={
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid gray',
    borderRadius: '5px',
    textAlign: 'center'
  }

export const MediaTypeItemCard:FC<Props> = ({data,isMovie}) => {

  const handleMoreInfoClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
    <Grid container gap={2} sx={{mt:2}}>
      
      <Grid item xs={12} sm={5} >
        {/* //! INIT POSTER */}
        <Card sx={cardClasses}>
          <CardMedia
            component='img'
            sx={{objectFit:'contain'}}        
            image={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
            title={data.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                    {data.vote_average.toFixed(1)}
                    <GradeIcon color="warning" sx={{fontSize: 'normal' }} />
              </span>
            </Typography>
            
            <Typography variant="body2" color="text.secondary">
              <span style={{display:'flex', alignItems:'end', justifyContent:'center'}}>
                { isMovie? data.release_date : data.first_air_date} 
                <CalendarMonthOutlinedIcon  sx={{fontSize: 'normal' }}/>
              </span>
            </Typography>
            </CardContent>
          </Card>
        </Grid> {/* //! END POSTER */}

        {/* //! INIT CONTENT */}
        <Grid item xs={12} sm={5} display='flex'>
          <Paper  sx={{p:3, display:'flex', flexDirection:'column'}}>
              <Typography variant="h4" color='secondary'>
                { data.tagline ? <em>"{data.tagline}"</em> : null}
              </Typography>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                  {data.overview}
              </Typography>
              
              <Typography variant="body1" sx={{ mt: 2 }}>
                  <strong>Genres: </strong>{data.genres.map( e => e.name).join(' - ')}
              </Typography>
              <div style={{ flexGrow: 1 }}></div>

              {data.homepage ? 
                <Button variant='outlined' endIcon={<ArrowOutwardIcon />}
                sx={{ justifySelf: 'flex-end', alignSelf: 'flex-end', mt:2 }}
                onClick={() => handleMoreInfoClick(data.homepage)}>
                    More Info
                </Button>
                :null
              }
          </Paper>
        </Grid> {/* //! END CONTENT */}
  </Grid>
  </>
  );
}