import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export function Header() {
  return (
    <div className="w-screen flex items-center justify-between bg-slate-800 px-28 py-4">
      <h1 className="text-xl text-slate-300 font-bold">API - Deslocamento</h1>
      <Button className="normal-case px-4 py-2 flex gap-2 items-center bg-blue-500 text-slate-300 hover:bg-blue-600 hover:transition-colors">
        <AddCircleOutlineIcon className="w-5 h-5" />
        Criar um novo Deslocamento
      </Button>
    </div>
  );
}
