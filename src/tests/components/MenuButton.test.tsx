import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MenuButton } from '../../components/MenuButton'

describe('Component > MenuButton', () => {
  const mockButtonClick = jest.fn()
  it('should be view element on menu button', async () => {
    render(<MenuButton title="Teste" onClick={mockButtonClick} />)

    const button = screen.getByText('Teste')

    await userEvent.click(button)
    expect(button).toBeInTheDocument()

    waitFor(() => {
      expect(mockButtonClick).toHaveBeenCalled()
    })
  })
})
