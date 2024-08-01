import { beforeEach, describe, test, vi, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "../src/components";
import userEvent from "@testing-library/user-event";

describe("Input test", () => {
  describe("Props test", () => {
    const testPlaceholder = "placeholder";
    const textInputType = "text";
    const inputChildren = "test";
    const onChange = vi.fn();
    let input: HTMLInputElement;
    beforeEach(() => {
      render(
        <Input
          placeholder={testPlaceholder}
          onChange={onChange}
          children={inputChildren}
          type={textInputType}
        />
      );
      input = screen.getByTestId("testidinput");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("test input placeholder", () => {
      expect(input.placeholder).toBe(testPlaceholder);
    });

    test("test input type", () => {
      expect(input.type).toBe(textInputType);
    });

    test("enter text", async () => {
      await userEvent.type(input, inputChildren);
      expect(onChange).toBeCalledTimes(4);
      expect(input.value).toBe(inputChildren);
    });
  });
});
