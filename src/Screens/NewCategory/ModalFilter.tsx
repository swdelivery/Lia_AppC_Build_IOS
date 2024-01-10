import Button from '@Components/Button/Button'
import Column from '@Components/Column'
import { IconCancelGrey } from '@Components/Icon/Icon'
import Row from '@Components/Row'
import Text from '@Components/Text'
import { GREY, GREY_FOR_TITLE, NEW_BASE_COLOR, WHITE } from '@Constant/Color'
import { sizeIcon } from '@Constant/Icon'
import { _width } from '@Constant/Scale'
import { styleElement } from '@Constant/StyleElement'
import { getListServiceFilter, selectServiceBranchGroup, selectServiceChildCodeGroup, selectServiceLocation, selectServiceRangePrice, selectServiceUtilities } from '@Redux/category/actions'
import { getDataFilterServiceState } from '@Redux/category/selectors'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import useVisible from 'src/Hooks/useVisible'
import ModalBottomLocation from './ModalBottomLocation'
import FilterLocation from './ModalFilterComponents/FilterLocation'
import SliderPrice from './ModalFilterComponents/SliderPrice'
import WrapList from './ModalFilterComponents/WrapList'
import WrapListString from "./ModalFilterComponents/WrapListString";

const WIDTH_MODAL = _width / 1.15


type Props = {
  visible: boolean;
  onClose?: () => void;
};

const ModalFilter = ({ visible, onClose }: Props) => {
  const dispatch = useDispatch();
  const { top } = useSafeAreaInsets();
  const tranX = useSharedValue(0);
  const opacityBackDrop = useSharedValue(0);
  const visibleModalBottomLocation = useVisible();
  const { bottom } = useSafeAreaInsets();

  // DATA FOR USER TO SELECT
  const {
    dataForModalFilterService: {
      childrenServiceGroup,
      typeGroupBranch,
      utilitiesGroupBranch,
    },
  } = useSelector(getDataFilterServiceState);

  // DATA'S USER HAS SELECTED FROM STORE
  const {
    dataServiceParentCodeGroup,
    dataServiceCoupon,
    dataServiceAverageRating,
    dataServiceMostPopular,
    dataServiceSortPrice,
    dataServiceChildCodeGroup,
    dataServiceLocation,
    dataServiceBranchGroup,
    dataServiceRangePrice,
    dataServiceUtilities,
  } = useSelector(getDataFilterServiceState);

  const [selectedListTagService, setSelectedListTagService] = useState([]);
  const [selectedListTagType, setSelectedListTagType] = useState([]);
  const [selectedListTagUtilitie, setSelectedListTagUtilitie] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [provinceChoiced, setProvinceChoiced] = useState(null);

  useEffect(() => {
    if (visible) {
      _handleFillDataStoreToState();
      tranX.value = withTiming(-WIDTH_MODAL, { duration: 300 });
      opacityBackDrop.value = withTiming(1, { duration: 300 });
    } else {
      tranX.value = withTiming(0, { duration: 300 });
    }
  }, [visible]);

  // FUNCTION
  const _handleFillDataStoreToState = () => {
    setSelectedListTagService(dataServiceChildCodeGroup);
    setProvinceChoiced(dataServiceLocation);
    setSelectedListTagType(dataServiceBranchGroup);
    setSelectedPrice(dataServiceRangePrice);
    setSelectedListTagUtilitie(dataServiceUtilities);
  };

  const _handleSelectTagService = (data) => {
    let arrTemp = [...selectedListTagService];
    let indexFinded = arrTemp?.findIndex((item) => item?.code == data?.code);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagService(arrTemp);
  };
  const _handleSelectTagType = (data) => {
    let arrTemp = [...selectedListTagType];
    let indexFinded = arrTemp?.findIndex((item) => item == data);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagType(arrTemp);
  };
  const _handleSelectTagUtilitie = (data) => {
    let arrTemp = [...selectedListTagUtilitie];
    let indexFinded = arrTemp?.findIndex((item) => item == data);
    if (indexFinded !== -1) {
      arrTemp.splice(indexFinded, 1);
    } else {
      arrTemp.push(data);
    }
    setSelectedListTagUtilitie(arrTemp);
  };

  // CHANGE TO INITIAL STATE
  const _handleClearData = () => {
    setSelectedListTagService([]);
    setSelectedListTagType([]);
    setSelectedListTagUtilitie([]);
    setSelectedPrice(null);
    setProvinceChoiced(null);
  };

  // CONFIRM FILTER
  const _handleConfirm = () => {
    requestAnimationFrame(() => {
      let dataFetch = {
        condition: {},
        sort: {},
      };
      if (!isEmpty(selectedListTagService)) {
        dataFetch["condition"]["codeGroup"] = {
          in: selectedListTagService.map((item) => item?.code),
        };
      } else {
        dataFetch["condition"]["codeGroup"] = {
          in: [dataServiceParentCodeGroup?.code],
        };
      }
      if (dataServiceCoupon) {
        dataFetch["condition"]["isOnFlashSale"] = { equal: true };
      }
      if (dataServiceAverageRating) {
        dataFetch["sort"]["averageRating"] = -1;
      }
      if (dataServiceMostPopular) {
        dataFetch["sort"]["reviewCount"] = -1;
        dataFetch["sort"]["countPartner"] = -1;
      }
      if (dataServiceSortPrice) {
        dataFetch["sort"]["price"] = dataServiceSortPrice;
      }
      if (!isEmpty(provinceChoiced)) {
        dataFetch["condition"]["cityCode"] = {
          equal: provinceChoiced?.codeCity[0],
        };
      }
      if (!isEmpty(selectedListTagType)) {
        dataFetch["condition"]["type"] = {
          in: selectedListTagType,
        };
      }
      if (selectedPrice) {
        dataFetch["condition"]["price"] = {
          from: 0,
          to: selectedPrice,
        };
      }
      if (!isEmpty(selectedListTagUtilitie)) {
        dataFetch["condition"]["utilities"] = {
          in: selectedListTagUtilitie,
        };
      }
      dispatch(getListServiceFilter.request(dataFetch));
      dispatch(selectServiceChildCodeGroup(selectedListTagService));
      dispatch(selectServiceLocation(provinceChoiced));
      dispatch(selectServiceBranchGroup(selectedListTagType));
      dispatch(selectServiceRangePrice(selectedPrice));
      dispatch(selectServiceUtilities(selectedListTagUtilitie));
    });
    _handleClosing();
  };

  // ANIMATION
  const _handleClosing = () => {
    _handleClearData();
    tranX.value = withTiming(0, { duration: 300 }, (isFinished) => {
      if (isFinished) {
        runOnJS(_handleHide)();
      }
    });
    opacityBackDrop.value = withTiming(0, { duration: 200 });
  };
  const _handleHide = () => {
    onClose();
  };

  const animOpacityBackDrop = useAnimatedStyle(() => {
    return { opacity: opacityBackDrop.value };
  });
  const animTranXModal = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: tranX.value,
        },
      ],
    };
  });

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <Column height={top} backgroundColor={"white"} />
      <Animated.View
        style={[
          {
            width: _width,
            height: "100%",
          },
          { backgroundColor: "rgba(0,0,0,.7)" },
          animOpacityBackDrop,
        ]}
      >
        <TouchableOpacity
          onPress={_handleClosing}
          style={[StyleSheet.absoluteFillObject]}
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.containerRightTab,
          { right: -WIDTH_MODAL },
          animTranXModal,
        ]}
      >
        <Column
          marginBottom={8 * 2}
          alignItems="center"
          marginTop={top + 8 * 2}
        >
          <Text color={GREY_FOR_TITLE} weight="bold">
            BỘ LỌC TÌM KIẾM
          </Text>

          <TouchableOpacity
            hitSlop={styleElement.hitslopSm}
            onPress={_handleClosing}
            style={styles.btnCancel}
          >
            <IconCancelGrey style={sizeIcon.md} />
          </TouchableOpacity>
        </Column>
        <ScrollView>
          {!isEmpty(childrenServiceGroup) ? (
            <WrapList
              selected={selectedListTagService}
              onSelected={_handleSelectTagService}
              data={childrenServiceGroup}
              title="Dịch vụ"
            />
          ) : (
            <></>
          )}
          <FilterLocation
            provinceChoiced={provinceChoiced}
            visibleModalBottomLocation={visibleModalBottomLocation}
          />
          {!isEmpty(typeGroupBranch) ? (
            <WrapListString
              selected={selectedListTagType}
              onSelected={_handleSelectTagType}
              data={typeGroupBranch}
              title="Loại hình"
            />
          ) : (
            <></>
          )}
          <SliderPrice
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
          />
          {!isEmpty(utilitiesGroupBranch) ? (
            <WrapListString
              selected={selectedListTagUtilitie}
              onSelected={_handleSelectTagUtilitie}
              data={utilitiesGroupBranch}
              title="Tiện ích"
            />
          ) : (
            <></>
          )}
        </ScrollView>

        <Row
          marginVertical={8 * 2}
          paddingHorizontal={8 * 2}
          gap={8 * 2}
          paddingBottom={bottom}
        >
          <Column width={120}>
            <Button.Custom
              titleSize={14}
              bgColor={"#F2F2F5"}
              colorText={GREY}
              title={`Thiết lập lại`}
              onPress={_handleClearData}
              height={40}
            />
          </Column>
          <Button.Gradient
            titleSize={14}
            containerStyle={{ flex: 1 }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            colors={[NEW_BASE_COLOR, NEW_BASE_COLOR]}
            title={`Áp dụng`}
            onPress={_handleConfirm}
            height={40}
          />
        </Row>
      </Animated.View>
      <ModalBottomLocation
        provinceChoiced={provinceChoiced}
        setProvinceChoiced={setProvinceChoiced}
        onClose={visibleModalBottomLocation.hide}
        visible={visibleModalBottomLocation.visible}
      />
    </View>
  );
};

export default ModalFilter;

const styles = StyleSheet.create({
  btnCancel: {
    position: "absolute",
    zIndex: 1,
    right: 8 * 2,
  },
  containerRightTab: {
    width: WIDTH_MODAL,
    height: "100%",
    position: "absolute",
    zIndex: 1,
    backgroundColor: WHITE,
  },
  container: {
    width: "100%",
    position: "absolute",
    zIndex: 1,
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
  },
});
