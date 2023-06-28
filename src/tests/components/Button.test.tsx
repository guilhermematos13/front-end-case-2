import { render, screen, waitFor } from '@testing-library/react'
import { Button } from '../../components/Button'
import { House } from '@phosphor-icons/react'
import userEvent from '@testing-library/user-event'

describe('Component > Button', () => {
  const mockButtonClick = jest.fn()
  it('should be view element on button', async () => {
    const { container } = render(
      <Button icon={<House />} title="Teste" onClick={mockButtonClick} />,
    )

    const button = screen.getByText('Teste')

    await userEvent.click(button)

    expect(container.querySelectorAll('svg')).toHaveLength(1)
    expect(button).toBeInTheDocument()

    waitFor(() => {
      expect(mockButtonClick).toHaveBeenCalled()
    })
  })
})
