import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';

const StyledAppBar = styled(AppBar)({
  backgroundColor: '#2c3e50',
});

const StyledButton = styled(Button)({
  color: 'white',
  marginLeft: '10px',
});

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ResumeBanao
          </Typography>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <StyledButton component={Link} to="/">
              Home
            </StyledButton>
            <StyledButton component={Link} to="/editor">
              Create Resume
            </StyledButton>
            <StyledButton component={Link} to="/about">
              About
            </StyledButton>
          </Box>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: "block", md: "none" } }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">
              Home
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/editor">
              Create Resume
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/about">
              About
            </MenuItem>
          </Menu>
        </Toolbar>
      </StyledAppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to AI Resume Builder
          </Typography>
          <Typography variant="body1" paragraph>
            Create professional resumes with the power of AI. Get started now!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/editor"
          >
            Create Your Resume
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default Home;
