'use client';

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
  Typography
} from '@mui/material';
import {
  AddRoad,
  AirlineSeatReclineExtra,
  ArrowBackIosNew,
  DirectionsCar,
  Menu,
  Person
} from '@mui/icons-material';
import { useState } from 'react';
import { MenuBannersData } from '../data/MenuBannersData';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const handleSideMenuOpen = () => {
    setOpenSideMenu(true);
  };

  const handleSideMenuClose = () => {
    setOpenSideMenu(false);
  };

  const Route = useRouter();

  return (
    <div>
      <Drawer anchor="left" open={openSideMenu} onClose={handleSideMenuClose}>
        <List className="bg-slate-300/50 h-screen flex flex-col items-end px-4">
          <button onClick={handleSideMenuClose}>
            <ArrowBackIosNew className="h-6 w-6 text-blue-primary hover:text-green-primary" />
          </button>
          {MenuBannersData.map((menu, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton
                  onClick={() => {
                    Route.push(`${menu.route}`);
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
            );
          })}
        </List>
      </Drawer>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" className="bg-blue-primary">
          <Toolbar className="flex justify-between px-14">
            <div>
              <IconButton
                onClick={() => {
                  handleSideMenuOpen();
                }}
                className="text-slate-100 hover:bg-slate-100/10 rounded-full"
              >
                <Menu />
              </IconButton>
            </div>
            <Typography
              variant="h5"
              className="text-slate-100 xs:text-sm text-center sm:text-lg md:text-2xl"
            >
              Gestão de Deslocamento
            </Typography>
            <div className="w-6 h-6"></div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
