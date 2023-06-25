interface LabelProps {
  title: string
  htmlFor?: string
}

export function Label({ title, htmlFor }: LabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mt-2 cursor-pointer font-bold text-blue-primary/80 xs:text-sm md:text-lg"
    >
      {title}
    </label>
  )
}
