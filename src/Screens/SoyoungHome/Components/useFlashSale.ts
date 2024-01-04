import { isValidFlasSale } from "@Constant/service";
import { checkFlashSale } from "@Redux/flashSale/actions";
import { getFlashSaleState } from "@Redux/flashSale/selectors";
import { FlashSale } from "@typings/flashsale";
import { isEmpty } from "lodash";
import moment from "moment";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocused } from "src/Hooks/useNavigation";
import { fromUtc } from "src/utils/date";

export default function useFlashSales(
  onUpdate?: (flashSales: FlashSale[]) => void
) {
  const dispatch = useDispatch();
  const fsState = useSelector(getFlashSaleState);

  useFocused(() => {
    dispatch(checkFlashSale.request());
  });

  const flashSales = useMemo(() => {
    const { currentFlashSale, nextFlashSale } = fsState;
    const result: FlashSale[] = [];
    if (isValidFlasSale(currentFlashSale)) {
      result.push(currentFlashSale);
    }
    const validFlashSales = nextFlashSale
      .filter((item) => {
        const endTimestamp = moment(fromUtc(item.dateRange.to))
          .add(item.timeRange.to.unixTime, "seconds")
          .valueOf();
        return Date.now() < endTimestamp;
      })
      .sort((a, b) => {
        const aStart = moment(fromUtc(a.dateRange.from))
          .add(a.timeRange.from.unixTime, "seconds")
          .valueOf();
        const bStart = moment(fromUtc(b.dateRange.from))
          .add(b.timeRange.from.unixTime, "seconds")
          .valueOf();
        return aStart - bStart;
      });
    const firstNextFlashSale = validFlashSales[0];

    if (!!firstNextFlashSale) {
      // Check first next flash sale to see if it is current flash sale
      const { hour, minute } = firstNextFlashSale.timeRange.from;
      const startTimestamp = moment(fromUtc(firstNextFlashSale.dateRange.from))
        .add(hour, "hours")
        .add(minute, "minutes")
        .valueOf();
      const isUpcoming = Date.now() < startTimestamp;

      result.push({
        ...firstNextFlashSale,
        isUpcoming,
      });
      // Append the rest
      const rest = validFlashSales.slice(1);
      if (!isEmpty(rest)) {
        result.push(...rest.map((item) => ({ ...item, isUpcoming: true })));
      }
    }
    if (onUpdate) {
      onUpdate(result);
    }
    return result;
  }, [fsState]);

  return flashSales;
}
