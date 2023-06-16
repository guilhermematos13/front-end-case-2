import Button from '@mui/material/Button';

interface MenuButtonProps {
  title: string;
}

export function MenuButton({ title }: MenuButtonProps) {
  return (
    <Button className="bg-blue-primary/80 px-4 py-2 text-slate-100 normal-case hover:bg-green-primary/80 hover:transition-colors">
      {title}
    </Button>
  );
}
