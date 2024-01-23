import { BookingDate } from "@typings/booking";
import { TemplateData } from "@typings/chat";
import { FlashSale, FlashSaleTime } from "@typings/flashsale";
import moment from "moment";

/**
 * Convert date from utc to local and keep the date and time value
 * @param datestr date string
 * @returns
 */
export const fromUtc = (datestr: string | Date) => {
  const dt = new Date(datestr);
  return new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000);
  // FIXME: for now, return utc date. wait for confirmation from BE
  // return datestr;
};

export function getTwoDigits(number: number | string): string {
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

export function formatTime(time: FlashSaleTime) {
  return `${getTwoDigits(time.hour)}:${getTwoDigits(time.minute)}`;
}

export function fromFlashSaleDate(flashSale: FlashSale) {
  const from = moment(fromUtc(flashSale.dateRange.from))
    .set({
      hour: flashSale.timeRange.from.hour,
      minute: flashSale.timeRange.from.minute,
      second: 0,
      millisecond: 0,
    })
    .valueOf();
  const to = moment(fromUtc(flashSale.dateRange.to))
    .set({
      hour: flashSale.timeRange.to.hour,
      minute: flashSale.timeRange.to.minute,
      second: 0,
      millisecond: 0,
    })
    .valueOf();
  return {
    from,
    to,
  };
}

export function fromBookingDate(date: BookingDate) {
  return moment(fromUtc(date.dateTime))
    .set("hours", date.hour)
    .set("minutes", date.minute);
}

export function fromTemplateData(data: TemplateData["data"]) {
  if (data.date && data.time) {
    const [hour, minute] = data.time.split(":");
    return moment(data.date, "DD/MM/YYYY")
      .set({ hour: parseInt(hour), minute: parseInt(minute) })
      .format("DD/MM/YYYY, HH:mm");
  }
  return "Invalid date";
}
