import type { Meta, StoryObj } from '@storybook/react';

import { ActionButtons } from './ActionButtons';

const meta: Meta<typeof ActionButtons> = {
  component: ActionButtons,
};

export default meta;
type Story = StoryObj<typeof ActionButtons>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => (
    <ActionButtons
      toggleFullScreen={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  ),
};
