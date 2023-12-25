/**
 * Convert date from utc to local and keep the date and time value
 * @param datestr date string
 * @returns
 */
export const fromUtc = (datestr: string | Date) => {
  const dt = new Date(datestr);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
};

export function getTwoDigits(number: number): string {
  return number.toString().padStart(2, "0");
}

export function formatDuration(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {
    hours: getTwoDigits(hours),
    minutes: getTwoDigits(minutes),
    seconds: getTwoDigits(remainingSeconds),
  };
}
