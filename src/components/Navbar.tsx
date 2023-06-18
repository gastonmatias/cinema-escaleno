'use client'

import { useRouter } from "next/navigation";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useState } from 'react';

const pages = ['Movies', 'Series', 'About'];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] =   useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    alert('Oops! section in progress, try cinema or search ;)')
  };

  const router = useRouter()

  return (
    <AppBar position="fixed" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {/* //! init MOBILE ---------------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* //! end MOBILE ---------------------- */}

          {/*//! INIT LOGO ---------------  */}
          <LocalMoviesIcon sx={{ display: { xs: 'flex' }, mr: 1 }} />
          
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
            //   display: { xs: 'flex', md: 'none' },
              display: { xs: 'flex' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Cinema
          </Typography>
          {/*//! END LOGO ---------------  */}
          
          {/*//! DSEKTOP -----------------------------------------  */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display:'flex'}}>
              <Button
                onClick={() => router.push(`/search`)}
                // sx={{ my: 2, color: 'white', display: 'flex' }}
                sx={{ my: 2, display: 'flex' }}
                variant="outlined"
              >
                Search  <SearchIcon sx={{ml:1}}/>
              </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}