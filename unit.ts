const units = ["d", "M", "y", "h", "m", "s", "w"] as const;

export type Unit = (typeof units)[number];

const isValidUnit = (str: string | undefined): str is Unit =>
  str?.length == 1 && units.includes(str as Unit);

export const parseUnit = (unit: string | undefined): Unit | undefined =>
  isValidUnit(unit) ? unit : undefined;
