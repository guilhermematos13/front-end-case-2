interface LabelProps {
  title: string
  htmlFor: string
}

export function Label({ title, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="cursor-pointer text-lg font-bold text-blue-primary/80"
    >
      {title}
    </label>
  )
}
