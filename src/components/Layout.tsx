'use client'

import { Container } from "@mui/system"
import Head from "next/head"
import { Navbar } from "./Navbar"
import { ReactNode } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { darkTheme } from "@/themes/darkTheme";

interface Props{
    title: string;
    children: ReactNode
}

export const Layout = ({ title, children }:Props) => {

    return (
    <>
    <Head>
        <title>{title}</title>
        <meta name="description" content="cinema" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <ThemeProvider theme={darkTheme}>
        <CssBaseline/>
        <Navbar/>

        <Container sx={{mt:10}} >
            {children}
        </Container>

    </ThemeProvider>
    </>
  )
}