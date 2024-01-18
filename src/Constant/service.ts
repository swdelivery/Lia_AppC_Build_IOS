import { FlashSale } from "@typings/flashsale";
import { Service, ServiceOption } from "@typings/serviceGroup";
import moment from "moment";
import { fromUtc } from "src/utils/date";

export const isValidFlasSale = (flashSale?: FlashSale) => {
  if (!flashSale) {
    return false;
  }
  const { hour, minute } = flashSale.timeRange.to;
  const endTimestamp = moment(fromUtc(flashSale.dateRange.to))
    .set({ hour, minute, second: 0, millisecond: 0 })
    .valueOf();
  return Date.now() < endTimestamp;
};

export const refineFlashSale = (service: Service): Service => {
  if (service.currentFlashSale) {
    const valid = isValidFlasSale(service.currentFlashSale);
    if (valid) {
      return service;
    } else {
      return {
        ...service,
        currentFlashSale: null,
        preferentialInCurrentFlashSale: null,
      };
    }
  }
  if (service.nextFlashSale) {
    const { hour, minute } = service.nextFlashSale.timeRange.from;
    const startTimestamp = moment(fromUtc(service.nextFlashSale.dateRange.from))
      .set({
        hour,
        minute,
        second: 0,
        millisecond: 0,
      })
      .valueOf();
    console.log({ startTimestamp });

    if (startTimestamp > Date.now()) {
      return service;
    }
    // Otherwise consider to map it to current flash sale
    const endTimestamp = moment(fromUtc(service.nextFlashSale.dateRange.to))
      .set({
        hour: service.nextFlashSale.timeRange.to.hour,
        minute: service.nextFlashSale.timeRange.to.minute,
        second: 0,
        millisecond: 0,
      })
      .valueOf();
    console.log({ endTimestamp });

    if (endTimestamp > Date.now()) {
      return {
        ...service,
        currentFlashSale: service.nextFlashSale,
        preferentialInCurrentFlashSale: service.preferentialInNextFlashSale,
        nextFlashSale: null,
        preferentialInNextFlashSale: null,
      };
    }
    console.log("3");
  }
  return service;
};

export const isCurrentFlashSale = (flashSale?: FlashSale) => {
  if (!flashSale) {
    return false;
  }
  const startTimestamp = moment(fromUtc(flashSale.dateRange.from))
    .set({
      hour: flashSale.timeRange.from.hour,
      minute: flashSale.timeRange.from.minute,
      second: 0,
      millisecond: 0,
    })
    .valueOf();
  const endTimestamp = moment(fromUtc(flashSale.dateRange.to))
    .set({
      hour: flashSale.timeRange.to.hour,
      minute: flashSale.timeRange.to.minute,
      second: 0,
      millisecond: 0,
    })
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
