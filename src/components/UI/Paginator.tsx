import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FC } from 'react';

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
  }

  return (
    <>
    <Stack spacing={2} mt={5} >
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