import { render } from '@testing-library/react'
import { LoadingTable } from '../../components/LoadingTable'

describe('Component > Loading', () => {
  it('should be view element on loading', () => {
    const { container } = render(<LoadingTable />)

    expect(container.querySelectorAll('svg')).toHaveLength(1)
  })
})
