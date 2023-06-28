import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from '../../components/Modal'

describe('Component > Modal', () => {
  const mockButtonClick = jest.fn()
  it('should be view element on modal', async () => {
    render(
      <Modal closeModal={mockButtonClick} openModal={true}>
        <div>
          <p>Teste</p>
        </div>
      </Modal>,
    )

    const button = screen.getByText('Teste')

    await userEvent.click(button)

    waitFor(() => {
      expect(mockButtonClick).toHaveBeenCalled()
    })
  })
})
