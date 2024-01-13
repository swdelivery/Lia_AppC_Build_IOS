import { StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Screen from "@Components/Screen";
import { BASE_COLOR, BORDER_COLOR, NEW_BASE_COLOR } from "@Constant/Color";
import { _moderateScale, _width } from "@Constant/Scale";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataCreateBookingState,
  getServiceListFilterState,
} from "@Redux/booking/selectors";
import ModalConfirmService from "./Components/ModalConfirmService";
import {
  getListServiceFilter,
  openModalAddServiceToBooking,
  selectServices,
} from "@Redux/booking/actions";
import { navigation } from "rootNavigation";
import { formatMonney } from "@Constant/Utils";
import Tabs from "./Components/Tabs";
import useSelectedItems from "src/Hooks/useSelectedItems";
import ItemService from "./Components/ItemService";
import Button from "@Components/Button/Button";
import LiAHeader from "@Components/Header/LiAHeader";
import useFlashSales from "@Screens/SoyoungHome/Components/useFlashSale";
import { head, uniqBy } from "lodash";
import { getServicePrice } from "@Constant/service";
import { RenderItemProps } from "@typings/common";
import { Service, ServiceGroup } from "@typings/serviceGroup";
import { FlashList } from "@shopify/flash-list";

const NewPickerServiceBooking = () => {
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const { dataBranch, dataDoctor, dataPractitioner, dataServices } =
    useSelector(getDataCreateBookingState);
  const { data: dataListService } = useSelector(getServiceListFilterState);
  const { isShowModalAddServiceToBooking } = useSelector(
    getDataCreateBookingState
  );
  const flashSales = useFlashSales();
  const currentFlashSale = !head(flashSales)?.isUpcoming
    ? head(flashSales)
    : null;

  const { selectedItems, isItemSelected, toggleItem } = useSelectedItems(
    dataListService,
    {
      keyExtractor: (item) => item._id,
      initialSelectedItems: dataServices,
    }
  );

  useEffect(() => {}, [dataServices]);

  useEffect(() => {
    dispatch(
      getListServiceFilter.request({
        treatmentDoctorCode: dataDoctor?.code
          ? { equal: dataDoctor?.code }
          : undefined,
        practitionerCode: dataPractitioner
          ? { equal: dataPractitioner.code }
          : undefined,
        branchCode: dataBranch ? { equal: dataBranch?.code } : undefined,
      })
    );
  }, []);

  // @ts-ignore
  const routes: ServiceGroup[] = useMemo(() => {
    let listServiceTemp = dataListService;
    const newArray = uniqBy(
      listServiceTemp.flatMap((service) => service.serviceGroupArr),
      "_id"
    );
    return [{ _id: "all", name: "Tất cả", code: "all" }, ...newArray];
  }, [dataListService]);

  const _hideModalConfirmService = useCallback(() => {
    dispatch(openModalAddServiceToBooking(false));
  }, []);

  const _handleConfirmOrder = useCallback(() => {
    dispatch(selectServices(Object.values(selectedItems)));
    navigation.goBack();
  }, [selectedItems]);

  const listServices = useMemo(() => {
    if (index === 0) {
      return dataListService;
    }
    const codeGroup = routes[index].code;
    return dataListService.filter((item) => item.codeGroup.includes(codeGroup));
  }, [dataListService, index, routes]);

  const totalAmount = useMemo(() => {
    return Object.values(selectedItems).reduce((acc, item) => {
      return acc + getServicePrice(item);
    }, 0);
  }, [selectedItems]);

  const selectedFlashSale = useMemo(() => {
    if (!currentFlashSale) {
      return;
    }
    return Object.values(selectedItems).find((item) => {
      if (
        item.currentFlashSale &&
        item.currentFlashSale._id === currentFlashSale._id &&
        (!item.preferentialInCurrentFlashSale.limit ||
          item.preferentialInCurrentFlashSale.limit >
            item.preferentialInCurrentFlashSale.usage)
      ) {
        return true;
      }
      return false;
    });
  }, [selectedItems, currentFlashSale]);

  const hasItemSelected = useMemo(() => {
    return Object.keys(selectedItems).length > 0;
  }, [selectedItems]);

  const _renderItem = ({ item, index }: RenderItemProps<Service>) => {
    const isSelected = isItemSelected(item);
    const canSelect = !(
      selectedFlashSale && currentFlashSale?._id === item.currentFlashSale?._id
    );
    return (
      <ItemService
        data={item}
        isSelected={isSelected}
        canSelect={canSelect}
        onToggleSelection={toggleItem}
      />
    );
  };

  return (
    <Screen safeBottom>
      <LiAHeader safeTop title="Chọn dịch vụ" />
      {routes?.length > 0 && (
        <Tabs tabs={routes} index={index} onTabChange={setIndex} />
      )}
      <FlashList
        contentContainerStyle={styles.contentContainer}
        numColumns={2}
        data={listServices}
        renderItem={_renderItem}
        estimatedItemSize={100}
        extraData={selectedItems}
      />
      {hasItemSelected && (
        <View style={styles.bottomAction}>
          <Button.Gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[BASE_COLOR, NEW_BASE_COLOR]}
            title={`Xác nhận ${formatMonney(totalAmount)}  VNĐ`}
            onPress={_handleConfirmOrder}
            height={40}
          />
        </View>
      )}
      <ModalConfirmService
        data={isShowModalAddServiceToBooking?.data}
        isShow={isShowModalAddServiceToBooking?.flag}
        hideModal={_hideModalConfirmService}
      />
    </Screen>
  );
};

export default NewPickerServiceBooking;

const styles = StyleSheet.create({
  bottomAction: {
    borderTopWidth: 1,
    borderTopColor: BORDER_COLOR,
    justifyContent: "center",
    marginHorizontal: _moderateScale(8 * 2),
    marginBottom: 8,
  },
  contentContainer: {},
});
