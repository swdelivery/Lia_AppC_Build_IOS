/**
 * Convert date from utc to local and keep the date and time value
 * @param datestr date string
 * @returns
 */
export const fromUtc = (datestr: string | Date) => {
  const dt = new Date(datestr);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
};
