import React, { useRef, useEffect, useState, memo } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import * as Color from "../../Constant/Color";
import {
  BG_GREY_OPACITY_3,
  BLUE,
  BLUE_2,
  GREY_FOR_TITLE,
  WHITE,
  GREY,
} from "../../Constant/Color";
import { FONT_DINTEXT_PRO, stylesFont } from "../../Constant/Font";
import { _moderateScale, _widthScale, _width } from "../../Constant/Scale";
import { styleElement } from "../../Constant/StyleElement";
import { ImageBackground, Image, Dimensions } from "react-native";
import { sizeIcon, sizeLogo } from "../../Constant/Icon";

import { navigation } from "../../../rootNavigation";
import ScreenKey from "../../Navigation/ScreenKey";
import ItemService from "./Component/ItemService";
import {
  getAllServiceGroup,
  getServiceByGroup,
  newGetServiceByGroup,
  getServiceGroupv2,
} from "../../Redux/Action/ServiceGroup";
import { filter, find } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { URL_ORIGINAL, URL_AVATAR_DEFAULT } from "../../Constant/Url";
import { getDataServiceFiles } from "../../Redux/Action/Service";
import ImageView from "react-native-image-viewing";
import { alertCustomNotAction, formatMonney } from "../../Constant/Utils";
import ModalIframeYoutube from "../../Components/ModalIframeYoutube/ModalIframeYoutube";
import StatusBarCustom from "../../Components/StatusBar/StatusBarCustom";
import AlarmNotifi from "../../Components/AlarmNotifi/AlarmNotifi";
import LinearGradient from "react-native-linear-gradient";
import CountStar from "../../Components/CountStar/index";
import cloneDeep from "lodash/cloneDeep";
import FastImage from "react-native-fast-image";
import ModalPickSingleNotSearch from "../../Components/ModalPickSingleNotSearch/ModalPickSingleNotSearch";
import useItemExtractor from "src/Hooks/useItemExtractor";
import { Service } from "@typings/serviceGroup";
import { RenderItemProps } from "@typings/common";
import ServiceItem, {
  PLACEHOLDER_HEIGHT,
  Placeholder,
} from "@Screens/SoYoungService/components/ServiceItem";
import PlaceholderSkeletons from "@Components/PlaceholderSkeletons";

const ListService = memo((props) => {
  const [isLoading, setLoading] = useState(false);
  const [listService, setListService] = useState([]);

  const [listChildGr, setListChildGr] = useState([]);
  const [listChildGrActive, setListChildGrActive] = useState([]);

  const [listFilter, setListFilter] = useState([
    {
      id: "2",
      name: "Giá tăng dần",
      key: "Giá",
      flag: "up",
      slug: "price",
    },
    {
      id: "1",
      name: "Giá giảm dần",
      key: "Giá",
      flag: "down",
      slug: "price",
    },
    // {
    //     id: '3',
    //     name: 'Lượt đánh giá nhiều nhất',
    //     key: 'Đánh giá',
    //     flag: 'down',
    //     slug:'review'
    // },
    // {
    //     id: '4',
    //     name: 'Đánh giá',
    //     flag: 'up'
    // },
  ]);
  const [currFilter, setCurrFilter] = useState({
    id: "2",
    name: "Giá tăng dần",
    key: "Giá",
    flag: "up",
    slug: "price",
  });

  const [showModalPickFilter, setShowModalPickFilter] = useState(false);

  useEffect(() => {
    if (props?.currGrChoice?.parentCode) {
      console.log({ ALOOOO: props?.currGrChoice?.parentCode });

      if (props?.route?.codeGR == props?.currGrChoice?.parentCode) {
        setListChildGrActive([props?.currGrChoice]);
        _getChildGr(props?.route?.codeGR);
      }
      return;
    }

    if (props?.route?.codeGR) {
      _getChildGr(props?.route?.codeGR);
      _getServiceByGRCode(props?.route?.codeGR);
    }
  }, [props?.route]);

  useEffect(() => {
    console.log({ listChildGrActive });
    if (listChildGrActive?.length == 0) {
      _getServiceByGRCode(props?.route?.codeGR);
    } else {
      _getServiceByListGRCode(listChildGrActive?.map((item) => item?.code));
    }
  }, [listChildGrActive]);

  useEffect(() => {
    if (currFilter?.id) {
      if (listChildGrActive?.length == 0) {
        _getServiceByGRCode(props?.route?.codeGR);
      } else {
        _getServiceByListGRCode(listChildGrActive?.map((item) => item?.code));
      }
    }
  }, [currFilter]);

  // const _getServiceWithFilter = async () => {
  //     let condition = {
  //         "condition": {
  //             "codeGroup": {
  //                 "in": listCodeGr
  //             }
  //         },
  //         "sort": {
  //             "price": currFilter?.flag == 'up' ? 1 : -1
  //         },
  //         "limit": 100,
  //         "page": 1
  //     }
  //     let result = await newGetServiceByGroup(condition)
  //     setListService(result?.data?.data)
  // }

  const _getChildGr = async (codeGR) => {
    let result = await getServiceGroupv2({
      condition: {
        parentCode: {
          equal: codeGR,
        },
      },
      sort: {
        orderNumber: -1,
      },
    });
    if (result?.isAxiosError) return;
    setListChildGr([...result?.data?.data]);
  };

  const _getServiceByListGRCode = async (listCodeGr) => {
    let condition = {
      condition: {
        codeGroup: {
          in: listCodeGr,
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };

    if (currFilter?.id) {
      if (currFilter?.flag == "up") {
        condition.sort = {
          price: 1,
        };
      }
      if (currFilter?.flag == "down") {
        condition.sort = {
          price: -1,
        };
      }
    }

    let result = await newGetServiceByGroup(condition);
    setListService(result?.data?.data);
  };

  const _getServiceByGRCode = async (codeGR) => {
    let condition = {
      condition: {
        codeGroup: {
          in: [codeGR],
        },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 100,
      page: 1,
    };

    if (currFilter?.id) {
      if (currFilter?.flag == "up") {
        condition.sort = {
          price: 1,
        };
      }
      if (currFilter?.flag == "down") {
        condition.sort = {
          price: -1,
        };
      }
    }
    setLoading(true);

    let result = await newGetServiceByGroup(condition);
    setListService(result?.data?.data);

    setLoading(false);
  };

  const _handlePressImage = (_id) => {
    props?.pressImage(_id);
  };

  const _handlePressVideo = (_id) => {
    props?.pressVideo(_id);
  };

  const _handlePressDetail = (_id) => {
    navigation.navigate(ScreenKey.DETAIL_SERVICE, { idService: _id });
  };

  const _handleAddChildGr = (data) => {
    let listTemp = cloneDeep(listChildGrActive, true);

    let indexFinded = listTemp?.findIndex((item) => item?._id == data?._id);
    if (indexFinded !== -1) {
      listTemp = listTemp.filter((item) => item?._id !== data?._id);
    } else {
      listTemp.push(data);
    }
    setListChildGrActive(listTemp);
  };

  function renderItem({ item }: RenderItemProps<Service>) {
    return <ServiceItem item={item} />;
  }

  const { keyExtractor } = useItemExtractor<Service>((item) => item._id);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.BG_BEAUTY_OPACITY_2,
        marginTop: _moderateScale(8 * 2),
      }}
    >
      <ModalPickSingleNotSearch
        hide={() => {
          setShowModalPickFilter(false);
        }}
        onSelect={(item) => {
          // setCurrScope(item)
          setCurrFilter(item);
        }}
        data={listFilter}
        show={showModalPickFilter}
      />

      <View
        style={[
          styles.wave,
          { justifyContent: "center", alignItems: "center" },
        ]}
      ></View>
      <View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: _moderateScale(8 * 2) }}
          contentContainerStyle={{ paddingRight: _moderateScale(8 * 2) }}
          horizontal
        >
          <View
            style={{
              flex: 5,
              flexDirection: "row",
              paddingBottom: _moderateScale(4),
              paddingLeft: _moderateScale(8 * 1),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setListChildGrActive([]);
              }}
              style={[
                { marginBottom: _moderateScale(4) },
                styles.btnChildGr,
                listChildGrActive?.length == 0 && styles.btnChildGrActive,
              ]}
            >
              <Text
                style={[
                  styles.btnChildGr__text,
                  listChildGrActive?.length == 0 &&
                    styles.btnChildGrActive__text,
                ]}
              >
                Tất cả
              </Text>
            </TouchableOpacity>

            {listChildGr?.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => _handleAddChildGr(item)}
                  style={[
                    styles.btnChildGr,
                    { marginBottom: _moderateScale(4) },
                    listChildGrActive?.find(
                      (itemFind) => itemFind?._id == item?._id
                    ) && styles.btnChildGrActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.btnChildGr__text,
                      listChildGrActive?.find(
                        (itemFind) => itemFind?._id == item?._id
                      ) && styles.btnChildGrActive__text,
                    ]}
                  >
                    {item?.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
        <View
          style={{
            paddingBottom: _moderateScale(8),
            paddingLeft: _moderateScale(8 * 3),
            alignItems: "flex-end",
            paddingRight: _moderateScale(8 * 3),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setShowModalPickFilter(true);
            }}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text
              style={{
                ...stylesFont.fontNolan500,
                fontSize: _moderateScale(14),
                color: Color.BLACK,
              }}
            >
              {currFilter?.key}
            </Text>
            {currFilter?.flag == "down" ? (
              <Image
                style={[sizeIcon.lg, { marginLeft: _moderateScale(4) }]}
                source={require("../../NewIcon/arrowDown.png")}
              />
            ) : (
              <></>
            )}
            {currFilter?.flag == "up" ? (
              <Image
                style={[sizeIcon.lg, { marginLeft: _moderateScale(4) }]}
                source={require("../../NewIcon/arrowUp.png")}
              />
            ) : (
              <></>
            )}
          </TouchableOpacity>

          {/* <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Image style={sizeIcon.sm} source={require('../../NewIcon/sort.png')} />
                        <Text style={{ ...stylesFont.fontNolan500, fontSize: _moderateScale(14), color: GREY , marginLeft:_moderateScale(4)}}>Sắp xếp theo: {
                            <Text style={{ color: Color.BLUE_FB, ...stylesFont.fontNolanBold, fontStyle: 'italic' }}>
                                Giá tăng dần
                        </Text>
                        }
                        </Text>
                    </View> */}
        </View>
      </View>

      <FlatList
        contentContainerStyle={styles.container}
        numColumns={2}
        data={listService}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // onEndReached={loadMoreData}
        // refreshing={isLoading}
        // onRefresh={refreshData}
        ListEmptyComponent={
          isLoading ? (
            <PlaceholderSkeletons count={5} itemHeight={PLACEHOLDER_HEIGHT}>
              <Placeholder />
            </PlaceholderSkeletons>
          ) : null
        }
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {},
  btnChildGrActive: {
    paddingVertical: _moderateScale(4),
    paddingHorizontal: _moderateScale(8),
    borderRadius: _moderateScale(4),
    marginRight: _moderateScale(8 * 1),
    backgroundColor: Color.BASE_COLOR,
  },
  btnChildGrActive__text: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(13),
    bottom: 1,
    color: WHITE,
  },
  btnChildGr: {
    paddingVertical: _moderateScale(4),
    paddingHorizontal: _moderateScale(8),
    borderRadius: _moderateScale(4),
    marginRight: _moderateScale(8 * 1),
    backgroundColor: Color.BG_GREY_OPACITY_5,
  },
  btnChildGr__text: {
    ...stylesFont.fontNolan500,
    fontSize: _moderateScale(13),
    bottom: 1,
    color: Color.BLACK_OPACITY_8,
  },
  itemService: {
    marginBottom: _moderateScale(12),
    marginHorizontal: _moderateScale(16),
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: BG_GREY_OPACITY_3,
  },
  leftService: {
    width: _moderateScale(80),
    height: _moderateScale(80),
    // backgroundColor: BASE_COLOR,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: _moderateScale(8),
    overflow: "hidden",
  },
  rightService: {
    paddingBottom: _moderateScale(12),
    paddingHorizontal: _moderateScale(12),
    flex: 1,
  },
  nameService: {
    fontSize: _moderateScale(16),
    color: Color.BASE_COLOR,
    ...stylesFont.fontNolanBold,
    marginBottom: _moderateScale(4),
  },
  briefService: {
    color: GREY,
    fontSize: _moderateScale(12),
    marginBottom: _moderateScale(4),
  },
  priceService: {
    fontSize: _moderateScale(16),
    ...stylesFont.fontDinTextProBold,
    color: Color.PRICE_ORANGE,
    opacity: 0.8,
  },
  bottomService: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionService: {
    flexDirection: "row",
    paddingTop: _moderateScale(4),
  },
  wave: {
    width: "100%",
    height: _moderateScale(8 * 4.5),
    backgroundColor: Color.BG_BEAUTY_OPACITY_2,
    borderTopStartRadius: _moderateScale(8 * 3),
    borderTopEndRadius: _moderateScale(8 * 3),
    position: "absolute",
    top: -_moderateScale(8 * 2 - 1),
  },
  btnChoice__text: {
    fontSize: _moderateScale(12),
    color: WHITE,
    bottom: _moderateScale(1),
  },
  btnChoice: {
    paddingHorizontal: _moderateScale(8 * 2),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(8 * 2),
    backgroundColor: Color.SECOND_COLOR,
    marginRight: _moderateScale(8 * 2),
  },
  price: {
    paddingHorizontal: _moderateScale(8 * 1.5),
    borderRadius: _moderateScale(4),
    backgroundColor: Color.SECOND_COLOR,
    position: "absolute",
    left: _moderateScale(8 * 2),
    height: _moderateScale(8 * 3.5),
    justifyContent: "center",
    alignItems: "center",
    top: -_moderateScale((8 * 3.5) / 2),
  },
  btnService: {
    width: _widthScale(8 * 19),
    // height:_heightScale(8*),
    backgroundColor: WHITE,
    borderRadius: _moderateScale(8 * 1),
    marginTop: _moderateScale(8 * 2),
    // marginRight: _moderateScale(8 * 2),
    // borderWidth: 1,
    // borderColor: BG_GREY_OPACITY_5,
    backgroundColor: "rgba(7,140,127,0.8)",
    backgroundColor: "#158C80",
    backgroundColor: "white",
  },
});

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.15,
  shadowRadius: 4,

  elevation: 1,
};

export default ListService;
