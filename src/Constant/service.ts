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

const calculateToppingPrice = (data: Service) => {
  let total = 0;
  if (
    data != null &&
    data?.optionsSelected != null &&
    data?.optionsSelected?.length > 0
  ) {
    for (let i = 0; i < data?.optionsSelected?.length; i++) {
      const element = data?.optionsSelected[i];
      for (let j = 0; j < element?.data.length; j++) {
        const elementChild = element?.data[j];
        total +=
          elementChild?.extraAmount != null ? elementChild?.extraAmount : 0;
      }
    }
  }
  return total;
};

export const getServicePrice = (service: Service) => {
  if (
    isCurrentFlashSale(service.currentFlashSale) &&
    service.preferentialInCurrentFlashSale
  ) {
    return (
      service.preferentialInCurrentFlashSale.finalPrice +
      calculateToppingPrice(service)
    );
  }
  return service.price + calculateToppingPrice(service);
};
