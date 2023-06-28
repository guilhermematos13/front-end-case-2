import { render, screen } from '@testing-library/react'
import { Label } from '../../components/Label'

describe('Component > Input', () => {
  it('should be view element on input', () => {
    render(<Label title="Teste" />)

    expect(screen.getByText('Teste'))
  })
})
