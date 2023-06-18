import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC, useEffect } from 'react';

interface Props{
    count: number;
    setPage: Function;
    page: number;
    refetch: Function
}


export const Paginator:FC<Props> = ({count, setPage, page,refetch}) => {

  const handleChange = async (event: React.ChangeEvent<unknown>, value: number) => {
        await setPage(value)
        await refetch()
        console.log({page});
        console.log({value});
  };

  return (
    <>
    {/* <Stack spacing={2} mt={5} sx={{display:'flex', flexDirection:'column'}}> */}
    <Stack spacing={2} mt={5} >
    {/* <Stack spacing={2} mt={5} sx={{display:'flex', flex:'1'}}> */}
      <Pagination
        count={count} 
        page={page} 
        onChange={(e:any, value: number) => handleChange(e, value)} 
        variant='outlined'
        color='secondary'
        />
    </Stack>
  </>
  );
}