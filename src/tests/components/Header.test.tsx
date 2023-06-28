import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

const mockUseRouter = jest.fn()

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => mockUseRouter,
}))

describe('Component > Header', () => {
  it('should be view element on header', () => {
    const { container } = render(<Header />)

    const title = screen.getByText('Gestão de Deslocamento')

    expect(title).toBeInTheDocument()
    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })
})
