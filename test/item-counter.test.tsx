import React from "react";
import { beforeEach, describe, test, vi, expect, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components";
import userEvent from "@testing-library/user-event";

describe("Button test", () => {
  describe("Props test", () => {
    const onClick = vi.fn();
    let button: HTMLButtonElement;
    beforeEach(() => {
      render(
        <Button
          variant="text"
          children="button"
          ariaLabel="closeButton"
          onClick={onClick}
        />
      );
      button = screen.getByTestId("testidbutton");
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    test("test button children", () => {
      expect(button.textContent).toBe("button");
    });

    test("test button aria-label", () => {
      expect(button.ariaLabel).toBe("closeButton");
    });

    test("button click", async () => {
      await userEvent.click(button);
      await userEvent.click(button);
      expect(onClick).toBeCalledTimes(2);
    });
  });
});
