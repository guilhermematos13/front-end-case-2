import { render, screen } from '@testing-library/react'
import { Input } from '../../components/Input'

describe('Component > Input', () => {
  it('should be view element on input', () => {
    render(
      <Input
        name="input name"
        value={'value input'}
        placeholder="placeholder input"
        onChange={() => null}
      />,
    )

    expect(screen.getByPlaceholderText('placeholder input')).toBeInTheDocument()
    expect(screen.getByDisplayValue('value input')).toBeInTheDocument()
  })
})
