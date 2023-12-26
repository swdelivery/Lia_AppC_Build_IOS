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
  const { currentFlashSale, nextFlashSale } = useSelector(getFlashSaleState);

  useFocused(() => {
    dispatch(checkFlashSale.request());
  });

  const flashSales = useMemo(() => {
    const result: FlashSale[] = [];
    if (currentFlashSale) {
      const { hour, minute } = currentFlashSale.timeRange.to;
      const endTimestamp = moment(fromUtc(currentFlashSale.dateRange.to))
        .add(hour, "hours")
        .add(minute, "minutes")
        .valueOf();
      if (Date.now() < endTimestamp) {
        result.push(currentFlashSale);
      }
    }
    const firstNextFlashSale = nextFlashSale[0];
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
      const rest = nextFlashSale.slice(1);
      if (!isEmpty(rest)) {
        result.push(...rest.map((item) => ({ ...item, isUpcoming: true })));
      }
    }
    if (onUpdate) {
      onUpdate(result);
    }
    return result;
  }, [currentFlashSale, ...nextFlashSale]);

  return flashSales;
}
