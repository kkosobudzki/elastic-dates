import { describe, expect, test } from "bun:test";

import { applyRounding } from "./rounding";

describe("rounding", () => {
  test("rounds to the nearest year", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("y", date);

    expect(date.toISOString()).toEqual("2024-01-01T00:00:00.000Z");
  });

  test("rounds to the nearest month", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("M", date);

    expect(date.toISOString()).toEqual("2024-07-01T00:00:00.000Z");
  });

  test("rounds to the nearest week", () => {
    let date = new Date("2024-07-10T11:22:33.456Z");

    applyRounding("w", date);

    expect(date.toISOString()).toEqual("2024-07-08T00:00:00.000Z");
  });

  test("rounds to the nearest day", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("d", date);

    expect(date.toISOString()).toEqual("2024-07-03T00:00:00.000Z");
  });

  test("rounds to the nearest hour", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("h", date);

    expect(date.toISOString()).toEqual("2024-07-03T11:00:00.000Z");
  });

  test("rounds to the nearest minute", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("m", date);

    expect(date.toISOString()).toEqual("2024-07-03T11:22:00.000Z");
  });

  test("rounds to the nearest second", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");

    applyRounding("s", date);

    expect(date.toISOString()).toEqual("2024-07-03T11:22:33.000Z");
  });
});
