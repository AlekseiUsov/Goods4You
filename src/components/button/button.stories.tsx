import type { Meta, StoryObj } from "@storybook/react";
// components
import { Button } from "./button";
import { Plus } from "../../assets/icons";

const meta: Meta<typeof Button> = {
  title: "atoms/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Варианты кнопки",
      },
    },
  },
  argTypes: {
    variant: {
      description: "внутри кнопки может быть или текст или иконка",
    },
    children: {
      description: "Что будет внутри кнопки (текст или иконка)",
    },
    iconSize: {
      description: "Указывает размер иконки",
    },
    disabled: {
      description: "Отражает состояние disabled",
    },
    ariaLabel: {
      description: "Дополнительно может добавить атрибут aria-label",
    },
    additionalClass: {
      description: "добавляет дополнительный класс",
    },
    onClick: {
      description:
        "обратчик клика данного типа:  (() => void) | ((e: SyntheticEvent) => void)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const TextButton: Story = {
  args: {
    variant: "icon",
    children: "Btn",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка с текстом",
      },
    },
  },
};

export const TextButtonDisabled: Story = {
  args: {
    variant: "text",
    children: "Кнопка",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка с текстом в состоянии disabled",
      },
    },
  },
};

export const IconButtonSmall: Story = {
  args: {
    variant: "icon",
    children: Plus,
    iconSize: "small",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка с иконкой маленькая",
      },
    },
  },
};

export const IconButtonMeduim: Story = {
  args: {
    variant: "icon",
    children: Plus,
    iconSize: "medium",
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка с иконкой средняя",
      },
    },
  },
};
