import { StyleSheet, View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { _moderateScale } from "@Constant/Scale";
import Text from "@Components/Text";
import Row from "@Components/Row";
import Column from "@Components/Column";
import { BASE_COLOR, RED } from "@Constant/Color";
import { useDispatch, useSelector } from "react-redux";
import { getDataCreateBookingState } from "@Redux/booking/selectors";
import { formatMonney } from "@Constant/Utils";
import Collapsible from "react-native-collapsible";
import { getServicePrice } from "@Constant/service";
import { isEmpty } from "lodash";
import { getInfoUserReducer } from "@Redux/Selectors";
import { getPartnerLevel, setCurrPartnerLevel } from "@Redux/affiliate/actions";
import { getCurrPartnerLevelState, getListPartnerLevelState } from "@Redux/affiliate/selectors";
import { sumBy } from "lodash";
import { calculateDiscountAmount } from "src/utils/booking";

const Bill = () => {
  const dispatch = useDispatch()
  const { infoUser } = useSelector(getInfoUserReducer);
  const { data: listPartnerLevel } = useSelector(getListPartnerLevelState);
  const { data: currPartnerLevel } = useSelector(getCurrPartnerLevelState);
  const { dataCoupon, dataServices, dataInsurance } = useSelector(
    getDataCreateBookingState
  );

  useEffect(() => {
    dispatch(getPartnerLevel.request());
  }, []);

  useEffect(() => {
    if (!isEmpty(listPartnerLevel) && !isEmpty(infoUser)) {
      let findCurrPartnerLevel = listPartnerLevel.find(
        (item) => item?.code == infoUser?.levelCode
      );
      if (findCurrPartnerLevel) {
        dispatch(setCurrPartnerLevel(findCurrPartnerLevel));
      }
    }
  }, [listPartnerLevel, infoUser]);

  const servicesPrice = useMemo(() => {
    return sumBy(dataServices, (service) => getServicePrice(service));
  }, [dataServices]);

  const insurancePrice = useMemo(() => {
    return sumBy(dataInsurance, (item: any) => item.price);
  }, [dataInsurance]);

  const originPrice = servicesPrice + insurancePrice;

  const discountLevel = useMemo(() => {
    return (
      (originPrice * currPartnerLevel?.promotion?.discountRetailService) / 100
    );
  }, [currPartnerLevel, originPrice]);

  const discountAmount = useMemo(() => {
    return calculateDiscountAmount(dataCoupon, originPrice);
  }, [dataCoupon, originPrice]);

  return (
    <View style={styles.container}>
      <Column gap={8}>
        <Row style={{ justifyContent: "space-between" }}>
          <Text size={14} weight="bold">
            Tổng tiền dịch vụ tạm tính:{" "}
          </Text>
          <Text size={14} weight="regular">
            {formatMonney(originPrice)} VNĐ
          </Text>
        </Row>
        <Row
          alignItems="flex-start"
          style={{ justifyContent: "space-between" }}
        >
          <Column gap={4} flex={1}>
            <Text size={14} weight="bold">
              Ưu đãi:
            </Text>
            <Collapsible
              collapsed={
                dataCoupon?.coupon?.couponType == "Refund" ? false : true
              }
            >
              <Text size={12}>
                (*) Tiền sẽ được hoàn về ví sau khi thanh toán{" "}
              </Text>
            </Collapsible>
          </Column>
          <Text size={14} color={RED} weight="regular">
            - {formatMonney(discountAmount)} VNĐ
          </Text>
        </Row>
        <Row
          alignItems="flex-start"
          style={{ justifyContent: "space-between" }}
        >
          <Column gap={4} flex={1}>
            <Text size={14} weight="bold">
              Giảm giá dựa trên bậc hạng:
            </Text>
            <Text size={12}>
              Bậc hiện tại: <Text size={12} weight="bold">{currPartnerLevel?.name}</Text> giảm <Text size={12} weight="bold">{currPartnerLevel?.promotion?.discountRetailService} %</Text>
            </Text>
          </Column>
          <Text size={14} color={RED} weight="regular">
            - {formatMonney(discountLevel)} VNĐ
          </Text>
        </Row>
        <Row style={{ justifyContent: "space-between" }}>
          <Text size={14} weight="bold">
            Tổng thanh toán tạm tính:
          </Text>
          <Text size={14} weight="bold" color={BASE_COLOR}>
            {formatMonney(originPrice - discountAmount - discountLevel)} VNĐ
          </Text>
        </Row>
      </Column>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: _moderateScale(8 * 2),
  },
});
