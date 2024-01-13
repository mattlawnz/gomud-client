import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    viewport: {
      // Make sure it shows for small mobile in landscape mode as default
      // See https://storybook.js.org/docs/essentials/viewport
      defaultViewport: 'mobile1',
      defaultOrientation: 'landscape',
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
