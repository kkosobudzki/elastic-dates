import { applyDifference, calculateDifference } from "./diff";
import { applyRounding } from "./rounding";

type DateString = string;

export class UnsupportedFormat extends Error {
  constructor() {
    super("String must start with 'now' and contain up to 1 rounding rule");
  }
}

const format =
  /^(?:now)((?:[-+]{1}[1-9]{1}[0-9]*[dMyhmsw]{1})*)(?:\/([dMyhmsw]{1}))?$/;

const utc = () => new Date(Date.now());

export const parse = (datestring: DateString): Date => {
  const match = datestring.match(format);

  if (match === null) {
    throw new UnsupportedFormat();
  }

  const [_, diff, rounding] = match;

  let date = utc();

  applyDifference(diff, date);
  applyRounding(rounding, date);

  return date;
};

export const stringify = (date: Date): DateString => {
  const diff = calculateDifference(date, utc());

  return `now${diff}`;
};
