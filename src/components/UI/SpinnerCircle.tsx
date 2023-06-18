import { Paper } from "@mui/material"
import { FC } from "react"
import { ClipLoader } from "react-spinners"

interface Props{
  isLoading: boolean
  height: string
  width: string    
}

export const SpinnerCircle:FC<Props> = ({isLoading, height, width}) => {
  return (
    <>
    {
      isLoading 
      ?
        <Paper sx={{
          height:{height},
          width:{width},
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
        }}>

        <ClipLoader
          color="#36d7b7"
          size={200}
          speedMultiplier={1}
          loading={isLoading}
        />

        </Paper>
      : null
    }
    </>
  )
}