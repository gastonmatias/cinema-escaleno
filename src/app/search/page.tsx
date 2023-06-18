"use client"
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react"
import { NextPage } from "next"
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"

import { ISearchItem } from "@/interfaces/searchMulti"
import { Layout } from "@/components"
import { ItemSearchCard } from "@/components/searchCards/ItemSearchCard"
import { getSearchMulti } from "@/services"
import { Paginator } from "@/components/UI/Paginator"
import { SpinnerCircle } from "@/components/UI"

const SearchPage:NextPage = () => {

  const [querySearch, setQuerySearch] = useState('');
  const [isSearchExecuted, setIsSearchExecuted] = useState(false);
  const [page, setPage] = useState(1);
  
  //! INIT REACT QUERY SEARCH MULTI ----------------------------------------------
  const {isLoading, data:dataSearch, isRefetching, refetch, isFetching} = useQuery({
    enabled: false, // disable this query from automatically running
    queryKey:['repoDataSearch'],
    queryFn: () => getSearchMulti(querySearch, page),
  }) //! END REACT QUERY SEARCH MULTI ----------------------------------------------

  // ! EXEC BUSQUEDA 
  const handleSearch = async (e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsSearchExecuted(true)
    await refetch()
  } //! END exec busqueda

  
  //! INIT Manejo del input -------------------------------------------------------
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    setQuerySearch(e.target.value)
  }
  
  const handleKeyPress = (e:KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  }; //! END Manejo del input -------------------------------------------------------

  return (
    <>
    <Layout title={"search"}>
      <Container>
        <Typography variant="h2" color="white" sx={{my:3}}>
            Search Movie/Serie/Actor
        </Typography>

        <Grid container spacing={2}>

            <Grid item md={6} xs={12}>
                <TextField 
                    fullWidth id="filterBy" 
                    label="Filter by name" 
                    variant="outlined" 
                    // placeholder="lord of the rings"
                    value={querySearch}
                    onChange= {(e:any)=>handleInputChange(e)}
                    onKeyDown={(e:any)=>handleKeyPress(e)}
                />
            </Grid>

            <Grid item md={3} xs={12} sx={{display:'flex'}}>{/* flex para el stretch default */}
                <Button 
                    fullWidth 
                    variant="contained" 
                    color="primary"
                    // disabled={isLoading}
                    disabled={querySearch===''}
                    onClick={(e:any) => handleSearch(e)}
                    >
                  Search
                </Button>
            </Grid>

            {
              dataSearch?.results.length>0 && isSearchExecuted
              ?
                <Grid item xs={12} justifyContent="center" alignItems="center"  sx={{border:'1px black'}}>
                  <Paginator count={dataSearch.total_pages} setPage={setPage} page={page} refetch={refetch}/>
                </Grid>
              : null
            }
        </Grid>

      { isLoading && isRefetching || isFetching
        ? <SpinnerCircle isLoading={isLoading} height={"70vh"} width={"70vw"}/> 
        : null 
      }

      {
        !isLoading && !isFetching
        ?
        <>
        <Grid container 
        gap={2} 
        // justifyContent='center' 
        justifyContent='space-around' 
        bgcolor={'#121212'}
        p={0}
        marginTop={5}
        >
 

          {
            dataSearch?.results?.map((e: ISearchItem) => (

              <Grid 
                item 
                key={e.id}
                xs={5} sm={3} md={2}
                justifyContent="space-between"
                alignItems="stretch"
                >
                <ItemSearchCard item={e}  />
              </Grid>
            ))
          }
        </Grid>
        </>
        : null
      }

      {
        dataSearch?.results.length===0 && isSearchExecuted
          ? <Typography variant="h5" color="primary" sx={{bgcolor:'black', p:3, border:'black'}} textAlign='center'>
              Oops! no hay resultados con el criterio de búsqueda
            </Typography>
          : null
      }

      </Container>
    </Layout>
    </>
  )
}
export default SearchPage