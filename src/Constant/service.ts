import { FlashSale } from "@typings/flashsale";
import { Service, ServiceOption } from "@typings/serviceGroup";
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

const calculate = (listOption?: ServiceOption[]) => {
  let total = 0;
  if (listOption != null && listOption?.length > 0) {
    for (let i = 0; i < listOption?.length; i++) {
      const element = listOption[i];
      for (let j = 0; j < element?.data.length; j++) {
        const elementChild = element?.data[j];
        total += elementChild?.extraAmount != null ? elementChild?.extraAmount : 0;
      }
    }
  }
  return total;
}

export const getServicePrice = (service: Service) => {
  let totalOptions = calculate(service.optionsSelected != null ? service.optionsSelected : [])
  if (
    isCurrentFlashSale(service.currentFlashSale) &&
    service.preferentialInCurrentFlashSale
  ) {
    return service.preferentialInCurrentFlashSale.finalPrice + totalOptions;
  }
  return service.price + totalOptions;
};
