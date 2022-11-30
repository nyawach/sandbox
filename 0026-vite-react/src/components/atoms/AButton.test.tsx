import { render, screen } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'
import AButton from '~/components/atoms/AButton'

type MockType = React.MouseEventHandler<HTMLButtonElement>

describe('AButton.tsx', () => {
  test('テキストが入っている', async () => {
    const mockOnClick = vi.fn<MockType[], void>()
    render(<AButton onClick={() => mockOnClick()} text={'テスト'}></AButton>)
    screen.debug()
    const element = await screen.findByText('テスト')
    expect(element).toBeInTheDocument()
  })

  test('onClickが1度実行される', async () => {
    const mockOnClick = vi.fn<MockType[], void>()
    render(<AButton onClick={() => mockOnClick()} text={'テスト'}></AButton>)
    screen.debug()
    const element = await screen.findByText('テスト')
    element.click()
    expect(mockOnClick).toBeCalledTimes(1)
  })
})
