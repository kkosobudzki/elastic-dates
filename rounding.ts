import type { Unit } from "./unit";
import { parseUnit } from "./unit";

type ApplyRounding = (date: Date) => void;

const days: ApplyRounding = (date) => {
  date.setUTCHours(0, 0, 0, 0);
};

const months: ApplyRounding = (date) => {
  date.setUTCDate(1);
  date.setUTCHours(0, 0, 0, 0);
};

const years: ApplyRounding = (date) => {
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
};

const hours: ApplyRounding = (date) => {
  date.setUTCMinutes(0, 0, 0);
};

const minutes: ApplyRounding = (date) => {
  date.setUTCSeconds(0, 0);
};

const seconds: ApplyRounding = (date) => {
  date.setUTCMilliseconds(0);
};

const weeks: ApplyRounding = (date) => {
  const dayOfTheWeek = date.getUTCDay();

  // 0 => Sunday
  date.setUTCDate(
    date.getUTCDate() - dayOfTheWeek + (dayOfTheWeek == 0 ? -6 : 1),
  );
  date.setUTCHours(0, 0, 0, 0);
};

const roundings: Record<Unit, ApplyRounding> = {
  d: days,
  M: months,
  y: years,
  h: hours,
  m: minutes,
  s: seconds,
  w: weeks,
};

export const applyRounding = (
  roundingStr: string | undefined,
  date: Date,
): Date => {
  const unit = parseUnit(roundingStr);

  if (unit) {
    roundings[unit](date);
  }

  return date;
};
