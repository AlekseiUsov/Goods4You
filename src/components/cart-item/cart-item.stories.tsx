import type { Meta, StoryObj } from "@storybook/react";
// components
import { CartItem } from "./cart-item";

const meta: Meta<typeof CartItem> = {
  title: "moleculs/CartItem",
  component: CartItem,
  tags: ["autodocs"],
  argTypes: {
    quantity: {
      description: "отображает кол-во товара по выбранной позиции",
    },
    thumbnail: {
      description: "изображение товара",
    },
    title: {
      description: "название товара",
    },
    price: {
      description: "стоимость товара",
    },
    id: {
      table: {
        disable: true,
      },
    },
    total: {
      table: {
        disable: true,
      },
    },
    discountedTotal: {
      table: {
        disable: true,
      },
    },
    discountPercentage: {
      table: {
        disable: true,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CartItem>;

export const Cart: Story = {
  args: {
    quantity: 0,
    price: 19.99,
    title: "Eyeshadow Palette with Mirror",
    thumbnail:
      "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
  },
  parameters: {
    docs: {
      description: {
        story: "Карточка товара в корзине",
      },
    },
  },
};
