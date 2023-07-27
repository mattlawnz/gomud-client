import type { Meta, StoryObj } from '@storybook/react';

import { PromptOutput } from './PromptOutput';

const meta: Meta<typeof PromptOutput> = {
  component: PromptOutput,
};

export default meta;
type Story = StoryObj<typeof PromptOutput>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <PromptOutput />,
};
