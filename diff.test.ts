import { describe, expect, test } from "bun:test";
import { applyDifference, calculateDifference } from "./diff";

describe("apply difference", () => {
  test("now minus 1 year", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now-1y", date);

    expect(date).toEqual(new Date("2023-04-30T00:00:00.000Z"));
  });

  test("now plus 2 year", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+2y", date);

    expect(date).toEqual(new Date("2026-04-30T00:00:00.000Z"));
  });

  test("now minus 3 months", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now-3M", date);

    expect(date).toEqual(new Date("2024-01-30T00:00:00.000Z"));
  });

  test("now plus 14 months", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+14M", date);

    expect(date).toEqual(new Date("2025-06-30T00:00:00.000Z"));
  });

  test("now minus 13 days", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now-13d", date);

    expect(date).toEqual(new Date("2024-04-17T00:00:00.000Z"));
  });

  test("now plus 30 days", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+30d", date);

    expect(date).toEqual(new Date("2024-05-30T00:00:00.000Z"));
  });

  test("now minus 13 hours", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now-13h", date);

    expect(date).toEqual(new Date("2024-04-29T11:00:00.000Z"));
  });

  test("now plus 5 hours", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+5h", date);

    expect(date).toEqual(new Date("2024-04-30T05:00:00.000Z"));
  });

  test("now minus 13 minutes", () => {
    let date = new Date("2024-04-29T11:00:00.000Z");

    applyDifference("now-13m", date);

    expect(date).toEqual(new Date("2024-04-29T10:47:00.000Z"));
  });

  test("now plus 67 minutes", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+67m", date);

    expect(date).toEqual(new Date("2024-04-30T01:07:00.000Z"));
  });

  test("now minus 10 seconds", () => {
    let date = new Date("2024-04-29T16:00:00.000Z");

    applyDifference("now-10s", date);

    expect(date).toEqual(new Date("2024-04-29T15:59:50.000Z"));
  });

  test("now plus 67 seconds", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+67s", date);

    expect(date).toEqual(new Date("2024-04-30T00:01:07.000Z"));
  });

  test("now plus everything", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now+1y+2M+3w+4d+5h+6m+7s", date);

    expect(date).toEqual(new Date("2025-07-25T05:06:07.000Z"));
  });

  test("now minus everything", () => {
    let date = new Date("2024-04-30T00:00:00.000Z");

    applyDifference("now-7y-6M-5w-4d-3h-2m-1s", date);

    expect(date).toEqual(new Date("2016-09-20T20:57:59.000Z"));
  });
});

describe("calculate difference", () => {
  test("one year ago", () => {
    let date = new Date("2023-07-03T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-1y");
  });

  test("in one year", () => {
    let date = new Date("2025-07-03T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+1y");
  });

  test("in one year and two days", () => {
    let date = new Date("2025-07-05T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+1y+2d");
  });

  test("two months ago", () => {
    let date = new Date("2024-05-03T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-2M");
  });

  test("in three months", () => {
    let date = new Date("2024-10-03T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+3M");
  });

  test("two days ago", () => {
    let date = new Date("2024-07-01T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-2d");
  });

  test("one day ago", () => {
    let date = new Date("2023-12-31T11:22:33.456Z");
    let relativeTo = new Date("2024-01-01T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-1d");
  });

  test("in 30 days", () => {
    let date = new Date("2024-08-02T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+30d");
  });

  test("in 1 month", () => {
    let date = new Date("2024-08-03T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+1M");
  });

  test("in 1 month and 2 days", () => {
    let date = new Date("2024-08-05T11:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+1M+2d");
  });

  test("1 month and 2 days ago", () => {
    let date = new Date("2024-07-03T11:22:33.456Z");
    let relativeTo = new Date("2024-08-05T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-1M-2d");
  });

  test("5 hours ago", () => {
    let date = new Date("2024-07-03T06:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-5h");
  });

  test("in 5 hours", () => {
    let date = new Date("2024-07-03T16:22:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+5h");
  });

  test("51 minutes ago", () => {
    let date = new Date("2024-07-03T10:09:33.456Z");
    let relativeTo = new Date("2024-07-03T11:00:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-51m");
  });

  test("in 15 minutes", () => {
    let date = new Date("2024-07-03T11:37:33.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+15m");
  });

  test("11 seconds ago", () => {
    let date = new Date("2024-07-03T11:00:22.456Z");
    let relativeTo = new Date("2024-07-03T11:00:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("-11s");
  });

  test("in 13 seconds", () => {
    let date = new Date("2024-07-03T11:22:46.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+13s");
  });

  test("in 1 year 2 months 3 days 4 hours 5 minutes 6 seconds", () => {
    let date = new Date("2025-09-06T15:27:39.456Z");
    let relativeTo = new Date("2024-07-03T11:22:33.456Z");

    expect(calculateDifference(date, relativeTo)).toBe("+1y+2M+3d+4h+5m+6s");
  });
});
