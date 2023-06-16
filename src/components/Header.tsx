import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-blue-primary">
        <Toolbar className="flex justify-between px-14">
          <div>
            <IconButton className="text-slate-100 hover:bg-slate-100/10 rounded-full">
              <Menu />
            </IconButton>
          </div>
          <Typography variant="h5">Gestão de Deslocamento</Typography>
          <div className="w-6 h-6"></div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
