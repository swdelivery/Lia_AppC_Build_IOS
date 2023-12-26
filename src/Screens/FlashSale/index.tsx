import React, { useCallback, useState } from "react";
import { _moderateScale } from "../../Constant/Scale";
import Screen from "@Components/Screen";
import Header from "./Component/Header";
import FlashSaleTimes from "./Component/FlashSaleTimes";
import { useDispatch } from "react-redux";
import { checkFlashSale } from "@Redux/flashSale/actions";
import { FlashSale } from "@typings/flashsale";
import FlashSaleServices from "./Component/FlashSaleServices";

const FlashSaleList = () => {
  const dispatch = useDispatch();
  const [selectedFlashSale, setSelectedFlashSale] = useState<FlashSale>();

  const refreshFlashSale = useCallback(() => {
    dispatch(checkFlashSale.request());
  }, []);

  return (
    <Screen>
      <Header />
      <FlashSaleTimes
        selectedFlashSale={selectedFlashSale}
        onFlashSaleSelect={setSelectedFlashSale}
        onFlashSaleUpdate={refreshFlashSale}
      />
      <FlashSaleServices flashSale={selectedFlashSale} />
    </Screen>
  );
};

export default FlashSaleList;
