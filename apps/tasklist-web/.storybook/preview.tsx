import type { Preview } from '@storybook/react';
import '@repo/ui/css/index.css';
import '@/utils/i18n';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(?:background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
