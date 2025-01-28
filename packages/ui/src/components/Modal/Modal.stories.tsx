import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Modal } from '@/components/Modal';
import { Col } from '@/components/Col';
import { Input } from '@/components/Input';
import { PrimaryButton } from '@/components/Button';

type Args = ComponentProps<typeof Modal> & {
  showLeftIcon: boolean;
  showRightIcon: boolean;
  showError: boolean;
  showLabel: boolean;
  showNote: boolean;
};

const meta: Meta<Args> = {
  title: 'Modal',
  component: Modal,
  args: {
    title: 'Title',
    className: 'w-xxl',
    children: (
      <Col className="items-start gap-md">
        <Input
          $size="l"
          $variant="underline"
          className="w-full"
          id="modalTest"
          label="Name"
          placeholder="Placeholder"
        />
        <PrimaryButton $size="l" label="Submit" />
      </Col>
    ),
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {};
