import { MyVoucher } from "@typings/voucher";

export const calculateDiscountAmount = (
  dataCoupon: MyVoucher,
  originPrice: number
) => {
  if (dataCoupon?._id && originPrice) {
    if (dataCoupon?.coupon?.couponType == "Discount") {
      if (dataCoupon?.coupon?.discountType == "fixed") {
        if (originPrice >= dataCoupon?.coupon?.minRequiredOrderAmount) {
          return dataCoupon?.coupon?.discountAmount;
        }
      } else if (dataCoupon?.coupon?.discountType == "percent") {
        if (originPrice >= dataCoupon?.coupon?.minRequiredOrderAmount) {
          let discountAmountTemp =
            (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
          if (
            dataCoupon?.coupon?.maxAmountDiscount &&
            discountAmountTemp > dataCoupon?.coupon?.maxAmountDiscount
          ) {
            return dataCoupon?.coupon?.maxAmountDiscount;
          } else {
            return (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
          }
        }
      }
    } else if (dataCoupon?.coupon?.couponType == "Refund") {
      if (dataCoupon?.coupon?.discountType == "fixed") {
        if (
          !dataCoupon?.coupon?.minRequiredOrderAmount ||
          originPrice >= dataCoupon?.coupon?.minRequiredOrderAmount
        ) {
          return dataCoupon?.coupon?.discountAmount;
        }
      } else if (dataCoupon?.coupon?.discountType == "percent") {
        if (
          !dataCoupon?.coupon?.minRequiredOrderAmount ||
          originPrice > dataCoupon?.coupon?.minRequiredOrderAmount
        ) {
          let discountAmountTemp =
            (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
          if (
            dataCoupon?.coupon?.maxAmountDiscount &&
            discountAmountTemp >= dataCoupon?.coupon?.maxAmountDiscount
          ) {
            return dataCoupon?.coupon?.maxAmountDiscount;
          } else {
            return (originPrice * dataCoupon?.coupon?.discountAmount) / 100;
          }
        }
      }
    }
  } else {
    return 0;
  }
};
