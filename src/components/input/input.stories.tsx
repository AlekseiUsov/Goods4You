import type { Meta, StoryObj } from "@storybook/react";
// components
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    placeholder: {
      description: "текст placeholderа",
    },
    onChange: {
      description: "обработчик события ввода",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const SearchInput: Story = {
  args: {
    placeholder: "введите текст",
  },
  parameters: {
    docs: {
      description: {
        story: "Input для поиска товаров в каталоге",
      },
    },
  },
};
