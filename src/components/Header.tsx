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
import { useState } from 'react'
import {
  Car,
  CaretLeft,
  House,
  List as ListIcon,
  RoadHorizon,
  SteeringWheel,
  User,
} from '@phosphor-icons/react'
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
    <>
      <Drawer anchor="left" open={openSideMenu} onClose={handleSideMenuChange}>
        <List className="flex h-screen flex-col items-end bg-slate-300/50 px-4">
          <button
            onClick={handleSideMenuChange}
            className="text-md mb-4 mt-2 flex cursor-pointer items-center justify-center rounded-md border-none px-2 py-2 text-center hover:bg-gray-300/40 "
          >
            <CaretLeft size={24} className="text-blue-primary" /> Voltar
          </button>
          <ListItem>
            <ListItemButton
              onClick={() => {
                handleRedirectPage('/')
              }}
              className="rounded-md hover:bg-green-primary/50"
            >
              <ListItemIcon className="flex items-center justify-start text-blue-primary">
                <House size={24} />
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
                  <ListItemIcon className="flex items-center justify-start text-blue-primary">
                    {menu.title === 'Clientes' ? (
                      <User size={24} />
                    ) : menu.title === 'Condutores' ? (
                      <SteeringWheel size={24} />
                    ) : menu.title === 'Veiculos' ? (
                      <Car size={24} />
                    ) : (
                      <RoadHorizon size={24} />
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
          <Toolbar className="flex justify-between xs:px-4 md:px-10 lg:px-14">
            <IconButton
              onClick={handleSideMenuChange}
              className="rounded-full text-slate-100 hover:bg-slate-100/10"
            >
              <ListIcon size={28} />
            </IconButton>
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
    </>
  )
}
