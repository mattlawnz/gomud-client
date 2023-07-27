import type { Meta, StoryObj } from '@storybook/react';

import { Portrait } from './Portrait';

const meta: Meta<typeof Portrait> = {
  component: Portrait,
};

export default meta;
type Story = StoryObj<typeof Portrait>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  render: () => <Portrait />,
};
