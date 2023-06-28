import { render, screen } from '@testing-library/react'
import ClientPhoto from '../../public/client.png'

import { MenuBanner } from '../../components/MenuBanner'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => jest.fn(),
}))

describe('Component > MenuBanner', () => {
  it('should be view element on menu banner', () => {
    const { container } = render(
      <MenuBanner
        description="Teste MenuBanner"
        title="Teste Unitario"
        image={ClientPhoto}
        route="/clientes"
      />,
    )

    expect(container.querySelectorAll('img')).toHaveLength(1)
    expect(screen.getByText('Teste MenuBanner'))
    expect(screen.getByText('Teste Unitario'))
  })
})
