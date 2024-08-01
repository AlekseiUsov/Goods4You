import { describe, it, expect } from "vitest";
import { setRaiting } from "../src/utils/setRaiting";

describe("utils", () => {
  describe("setRaiting", () => {
    it("Проверяем с 1", () => {
      const result = setRaiting(1);
      const equal = ["highlighted", "", "", "", ""];
      expect(result).toEqual(equal);
    });
    it("Проверяем с 0", () => {
      const result = setRaiting(0);
      const equal = ["", "", "", "", ""];
      expect(result).toEqual(equal);
    });
    it("Проверяем с 2-ой", () => {
      const result = setRaiting(2);
      const equal = ["highlighted", "highlighted", "", "", ""];
      expect(result).toEqual(equal);
    });
  });
});
