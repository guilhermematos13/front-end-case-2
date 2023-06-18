import Button from '@mui/material/Button'

interface MenuButtonProps {
  title: string
  onClick?: () => void
}

export function MenuButton({ title, onClick }: MenuButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-blue-primary/80 px-4 py-2 normal-case text-slate-100 hover:bg-green-primary/80 hover:transition-colors"
    >
      {title}
    </Button>
  )
}
