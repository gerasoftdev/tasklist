import type { Preview } from '@storybook/react';
import '@repo/ui/css/index.css';
import '@/utils/i18n';
import { MockProviders } from '@/utils/testUtils';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(?:background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const ProvidersComponent = MockProviders(context.parameters);

      return (
        <ProvidersComponent>
          <div className="bg-g100">
            <Story />
          </div>
        </ProvidersComponent>
      );
    },
  ],
};

export default preview;
