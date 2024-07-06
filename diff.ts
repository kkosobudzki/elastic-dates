import type { Unit } from "./unit";
import { parseUnit } from "./unit";

type ApplyDifference = (diff: number, relativeTo: Date) => void;

const diffFormat = /((?<diff>[-+]{1}[1-9]{1}[0-9]*)(?<unit>[dMyhmsw]{1}))/g;

const months: ApplyDifference = (diff, relativeTo) => {
  relativeTo.setUTCMonth(relativeTo.getUTCMonth() + diff);
};

const years: ApplyDifference = (diff, relativeTo) => {
  relativeTo.setUTCFullYear(relativeTo.getUTCFullYear() + diff);
};

const hours: ApplyDifference = (diff, relativeTo) => {
  relativeTo.setUTCHours(relativeTo.getUTCHours() + diff);
};

const days: ApplyDifference = (diff, relativeTo) =>
  hours(diff * 24, relativeTo);

const minutes: ApplyDifference = (diff, relativeTo) => {
  relativeTo.setUTCMinutes(relativeTo.getUTCMinutes() + diff);
};

const seconds: ApplyDifference = (diff, relativeTo) => {
  relativeTo.setUTCSeconds(relativeTo.getUTCSeconds() + diff);
};

const weeks: ApplyDifference = (diff, relativeTo) =>
  hours(diff * 168, relativeTo);

const differencesToDate: Record<Unit, ApplyDifference> = {
  d: days,
  M: months,
  y: years,
  h: hours,
  m: minutes,
  s: seconds,
  w: weeks,
};

export const applyDifference = (
  diffStr: string | undefined,
  relativeTo: Date,
): Date => {
  if (diffStr === undefined) {
    return relativeTo;
  }

  const matches = diffStr.matchAll(diffFormat);

  if (matches === null) {
    throw new Error("Invalid diff format");
  }

  for (const match of matches) {
    if (match.groups) {
      const { diff, unit } = match.groups;

      const knownUnit = parseUnit(unit);

      if (knownUnit) {
        differencesToDate[knownUnit](parseInt(diff), relativeTo);
      }
    }
  }

  return relativeTo;
};

const formatDifference = (diff: number, unit: Unit): string => {
  if (diff > 0) {
    return `+${diff}${unit}`;
  }

  if (diff < 0) {
    return `${diff}${unit}`;
  }

  return "";
};

type Seconds = number;

const calculateTimeDifference = (date: Date, relativeTo: Date): string => {
  const diff: Seconds = Math.round(
    (date.getTime() - relativeTo.getTime()) / 1_000,
  );

  const seconds = diff % 60;
  const minutes = Math.abs(diff) > 60 ? Math.round(diff / 60) % 60 : 0;
  const hours = Math.abs(diff) > 3_600 ? Math.round(diff / 3_600) % 24 : 0;

  return (
    formatDifference(hours, "h") +
    formatDifference(minutes, "m") +
    formatDifference(seconds, "s")
  );
};

const isLessThanMonthBetween = (from: Date, to: Date) => {
  if (from.getTime() <= to.getTime()) {
    const months = to.getUTCMonth() - from.getUTCMonth();

    return (
      months == 0 ||
      (months == 1 && from.getUTCDate() > to.getUTCDate()) ||
      (to.getUTCMonth() == 0 && from.getUTCMonth() == 11)
    );
  }

  return isLessThanMonthBetween(to, from);
};

const isLessThanYearBetween = (from: Date, to: Date) => {
  if (from.getTime() <= to.getTime()) {
    const years = to.getUTCFullYear() - from.getUTCFullYear();

    return years == 0 || (years == 1 && from.getUTCMonth() > to.getUTCMonth());
  }

  return isLessThanYearBetween(to, from);
};

type DateDuration = {
  years: number;
  months: number;
  days: number;
};

const calculateDateDuration = (date: Date, relativeTo: Date): DateDuration => {
  if (isLessThanYearBetween(date, relativeTo)) {
    if (isLessThanMonthBetween(date, relativeTo)) {
      const diff: Seconds = (date.getTime() - relativeTo.getTime()) / 1_000;

      return {
        years: 0,
        months: 0,
        days: Math.abs(diff) >= 86_400 ? Math.round(diff / 86_400) : 0,
      };
    }

    const pivot = new Date(date);
    pivot.setUTCFullYear(relativeTo.getUTCFullYear());
    pivot.setUTCMonth(relativeTo.getUTCMonth());

    const { days } = calculateDateDuration(pivot, relativeTo);

    return {
      years: 0,
      months: date.getUTCMonth() - relativeTo.getUTCMonth(),
      days: days,
    };
  }

  const pivot = new Date(date);
  pivot.setUTCFullYear(relativeTo.getUTCFullYear());

  const { months, days } = calculateDateDuration(pivot, relativeTo);

  return {
    years: date.getUTCFullYear() - relativeTo.getUTCFullYear(),
    months: months,
    days: days,
  };
};

const calculateDateDifference = (date: Date, relativeTo: Date): string => {
  const { years, months, days } = calculateDateDuration(date, relativeTo);

  return (
    formatDifference(years, "y") +
    formatDifference(months, "M") +
    formatDifference(days, "d")
  );
};

export const calculateDifference = (date: Date, relativeTo: Date): string =>
  calculateDateDifference(date, relativeTo) +
  calculateTimeDifference(date, relativeTo);
