import type { Meta, StoryObj } from "@storybook/react";
// components
import { ItemCounter } from "./item-counter";

const meta: Meta<typeof ItemCounter> = {
  title: "moleculs/ItemCounter",
  component: ItemCounter,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Счетчик товаров внутри карточки католога и корзины",
      },
    },
  },
  argTypes: {
    size: {
      description: "внутри кнопки может быть или текст или иконка",
    },
    count: {
      description: "счетчик товаров приходящий из пропсов",
    },
    setCount: {
      description: "меняет внутреннее состояние счетчика",
    },
    additionalClass: {
      description: "пропсом можно прокинуть доп класс",
    },
  },
};

export default meta;

type Story = StoryObj<typeof ItemCounter>;

export const ItemCounterSmall: Story = {
  args: {
    size: "small",
    count: 3,
  },
  parameters: {
    docs: {
      description: {
        story: "Средний счетчик",
      },
    },
  },
};

export const ItemCounterMedium: Story = {
  args: {
    size: "medium",
    count: 2,
  },
  parameters: {
    docs: {
      description: {
        story: "Большой счетчик",
      },
    },
  },
};
