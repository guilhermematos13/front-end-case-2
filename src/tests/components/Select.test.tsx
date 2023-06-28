import { render, screen } from '@testing-library/react'
import { Select } from '../../components/Select'

describe('Component > Input', () => {
  it('should be view element on input', () => {
    render(
      <Select value={'teste'} onChange={() => null}>
        <p>Teste</p>
      </Select>,
    )

    expect(screen.getByDisplayValue('teste')).toBeInTheDocument()
  })
})
