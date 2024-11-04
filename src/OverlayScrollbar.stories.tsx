import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { OverlayScrollbar } from './OverlayScrollbar'

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof OverlayScrollbar> = {
  component: OverlayScrollbar,
}

export default meta
type Story = StoryObj<typeof OverlayScrollbar>

export const FirstStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
    as: 'section',
    className: 'w-32 h-[300px] overflow-scroll',
  },

  render: (args) => {
    return (
      <OverlayScrollbar {...args}>
        {Array(50)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className={['h-8 mb-1 border border-gray-100', index % 2 === 0 ? 'bg-gray-500' : 'bg-white'].join(' ')}
              >
                item {index}
              </div>
            )
          })}
      </OverlayScrollbar>
    )
  },
}

export const SecondStory: Story = {
  args: {
    //👇 The args you need here will depend on your component
    as: 'main',
    className: 'w-32 h-[300px] overflow-scroll',
  },

  render: (args) => {
    return (
      <OverlayScrollbar {...args}>
        <div>
          {Array(50)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  key={index}
                  className={['h-8 mb-1 border border-gray-100', index % 2 === 0 ? 'bg-gray-500' : 'bg-white'].join(
                    ' ',
                  )}
                >
                  item {index}
                </div>
              )
            })}
        </div>
      </OverlayScrollbar>
    )
  },
}
