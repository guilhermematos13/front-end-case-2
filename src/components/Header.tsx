'use client'

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material'
import {
  AddRoad,
  AirlineSeatReclineExtra,
  ArrowBackIosNew,
  DirectionsCar,
  Menu,
  Person,
  Home,
} from '@mui/icons-material'
import { useState } from 'react'
import { MenuBannersData } from '../data/MenuBannersData'
import { useRouter } from 'next/navigation'

export default function Header() {
  const Route = useRouter()
  const [openSideMenu, setOpenSideMenu] = useState(false)

  const handleSideMenuChange = () => {
    setOpenSideMenu((prev) => !prev)
  }

  const handleRedirectPage = (url: string) => {
    Route.push(url)
    setOpenSideMenu(false)
  }

  return (
    <div>
      <Drawer anchor="left" open={openSideMenu} onClose={handleSideMenuChange}>
        <List className="flex h-screen flex-col items-end bg-slate-300/50 px-4">
          <button onClick={handleSideMenuChange}>
            <ArrowBackIosNew className="h-6 w-6 text-blue-primary hover:text-green-primary" />
          </button>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleRedirectPage('/')
              }}
              className="rounded-md hover:bg-green-primary/50"
            >
              <ListItemIcon className="text-blue-primary">
                <Home />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          {MenuBannersData.map((menu, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    handleRedirectPage(menu.route)
                  }}
                  className="rounded-md hover:bg-green-primary/50"
                >
                  <ListItemIcon className="text-blue-primary">
                    {menu.title === 'Clientes' ? (
                      <Person />
                    ) : menu.title === 'Condutores' ? (
                      <AirlineSeatReclineExtra />
                    ) : menu.title === 'Veiculos' ? (
                      <DirectionsCar />
                    ) : (
                      <AddRoad />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={menu.title} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-blue-primary">
          <Toolbar className="flex justify-between px-14">
            <div>
              <IconButton
                onClick={handleSideMenuChange}
                className="rounded-full text-slate-100 hover:bg-slate-100/10"
              >
                <Menu />
              </IconButton>
            </div>
            <Typography
              variant="h5"
              className="text-center text-slate-100 xs:text-sm sm:text-lg md:text-2xl"
            >
              Gestão de Deslocamento
            </Typography>
            <div className="h-6 w-6"></div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}
