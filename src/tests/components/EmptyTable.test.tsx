import { render, screen } from '@testing-library/react'
import { EmptyTable } from '../../components/EmptyTable'

describe('Component > EmptyTable', () => {
  it('should be view element on empty table', async () => {
    render(<EmptyTable />)

    const text = screen.getByText('Não existem registros para exibir.')

    expect(text).toBeInTheDocument()
  })
})
