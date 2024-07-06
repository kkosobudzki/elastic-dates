import {
  describe,
  expect,
  test,
  beforeAll,
  afterAll,
  setSystemTime,
} from "bun:test";
import { parse, stringify, UnsupportedFormat } from ".";

beforeAll(() => {
  setSystemTime(new Date("2020-05-01T00:00:00.000Z"));
});

afterAll(() => {
  setSystemTime();
});

test("system time is mocked", () => {
  expect(new Date().toISOString()).toBe("2020-05-01T00:00:00.000Z");
});

describe("parse", () => {
  test("invalid format", () => {
    expect(() => parse("-1y/y")).toThrow(UnsupportedFormat);
  });

  test("now minus one year rounded to the nearest year", () => {
    expect(parse("now-1y/y")).toEqual(new Date("2019-01-01T00:00:00.000Z"));
  });

  test("now rounded to the nearest year", () => {
    expect(parse("now/y")).toEqual(new Date("2020-01-01T00:00:00.000Z"));
  });

  test("now minus 1 day", () => {
    expect(parse("now-1d")).toEqual(new Date("2020-04-30T00:00:00.000Z"));
  });

  test("now add 1 day", () => {
    expect(parse("now+1d")).toEqual(new Date("2020-05-02T00:00:00.000Z"));
  });

  test("now minus four days and four hours", () => {
    expect(parse("now-4d-4h")).toEqual(new Date("2020-04-26T20:00:00.000Z"));
  });
});

describe("stringify", () => {
  test("now minus 1 day", () => {
    expect(stringify(new Date("2020-04-30T00:00:00.000Z"))).toBe("now-1d");
  });

  test("now add 1 day", () => {
    expect(stringify(new Date("2020-05-02T00:00:00.000Z"))).toBe("now+1d");
  });

  test("now minus four days and four hours", () => {
    expect(stringify(new Date("2020-04-26T20:00:00.000Z"))).toBe("now-4d-4h");
  });
});
