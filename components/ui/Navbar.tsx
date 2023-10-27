import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useUiContext } from '@/hooks';

type Props = {}

export const Navbar = (props: Props) => {

  const { openSideMenu } = useUiContext()
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={openSideMenu} >
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant='h6' fontWeight={600}>OpenJira</Typography>
      </Toolbar>
    </AppBar>
  )
}