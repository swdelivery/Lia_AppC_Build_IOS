import { FlashSale } from "@typings/flashsale";
import { Service } from "@typings/serviceGroup";
import moment from "moment";
import { fromUtc } from "src/utils/date";

export const isValidFlasSale = (flashSale?: FlashSale) => {
  if (!flashSale) {
    return false;
  }
  const { unixTime } = flashSale.timeRange.to;
  const endTimestamp = moment(fromUtc(flashSale.dateRange.to))
    .add(unixTime, "seconds")
    .valueOf();
  return Date.now() < endTimestamp;
};

export const isCurrentFlashSale = (flashSale?: FlashSale) => {
  if (!flashSale) {
    return false;
  }
  const startTimestamp = moment(fromUtc(flashSale.dateRange.from))
    .add(flashSale.timeRange.from.unixTime, "seconds")
    .valueOf();
  const endTimestamp = moment(fromUtc(flashSale.dateRange.to))
    .add(flashSale.timeRange.to.unixTime, "seconds")
    .valueOf();
  return Date.now() >= startTimestamp && Date.now() <= endTimestamp;
};

export const getServicePrice = (service: Service) => {
  if (
    isCurrentFlashSale(service.currentFlashSale) &&
    service.preferentialInCurrentFlashSale
  ) {
    return service.preferentialInCurrentFlashSale.finalPrice;
  }
  return service.price;
};
