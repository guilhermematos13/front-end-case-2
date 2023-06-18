'use client'
import { User } from '@phosphor-icons/react'
import { Button } from '../../components/Button'

export default function ClientsPage() {
  return (
    <div className="mt-20 flex h-screen w-screen flex-col items-center px-48">
      <div className="mb-8 flex w-full justify-between">
        <h1 className="text-3xl font-bold text-blue-primary">Clientes</h1>
        <div>
          <Button
            icon={<User size={20} weight="fill" />}
            title="Criar um novo Cliente"
          />
        </div>
      </div>
    </div>
  )
}
