'use client'

import { createTheme } from '@mui/material/styles';
import { red } from "@mui/material/colors"

export const synthwaveTheme = createTheme({
    palette:{
        mode: 'dark',
        // primary: 'teal',
        background:{
            // default: '#2d3438'
            default: '#1A103C' //synthwave
            // default: '#18052D' //hbo
            // default: '#311b92'//deep purple
            // default: '#482880'// purple
        },
        error: {
            main: red[400],
        }
    }
})
