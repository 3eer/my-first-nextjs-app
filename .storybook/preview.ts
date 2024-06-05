import type { Preview } from '@storybook/react';
import '@/app/ui/global.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'blue',
          value: '#2F6FEB',
        },
      ],
    },
  },
};

export default preview;
