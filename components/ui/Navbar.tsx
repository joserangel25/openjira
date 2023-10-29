import React from 'react'
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useUiContext } from '@/hooks';
import NextLink from 'next/link';


type Props = {}

export const Navbar = (props: Props) => {

  const { openSideMenu } = useUiContext()
  return (
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton onClick={openSideMenu} >
          <MenuOutlinedIcon />
        </IconButton>


        <NextLink href="/" passHref>
          <Typography variant='h6' fontWeight={600} color={'white'}>
            OpenJira
          </Typography>
        </NextLink>

      </Toolbar>
    </AppBar >
  )
}