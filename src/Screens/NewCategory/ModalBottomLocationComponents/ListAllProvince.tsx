import CircleTick from '@Components/CircleTick/CircleTick'
import Column from "@Components/Column";
import Row from '@Components/Row'
import Text from '@Components/Text'
import { BORDER_COLOR } from "@Constant/Color";
import { getAllAddressVietNam } from '@Redux/Action/BookingAction'
import { getDataFilterServiceState } from '@Redux/category/selectors'
import { escapeRegExp, isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import slugify from "slugify";

type Props = {
  onChoice: (item) => void;
  provinceChoiced: any;
};

const ListAllProvince = ({ onChoice, provinceChoiced }: Props) => {
  const [listAllProvince, setListAllProvince] = useState([]);
  const [listAllProvinceFilter, setListAllProvinceFilter] = useState([]);

  const {
    dataForModalFilterService: { location },
  } = useSelector(getDataFilterServiceState);

  const { cityName, codeCity } = useMemo(() => {
    const [{ cityName = [], codeCity = [] }] = location || [];
    return {
      cityName: Array.from(new Set(cityName)),
      codeCity: Array.from(new Set(codeCity)),
    };
  }, [location]);

  useEffect(() => {
    _getAllAddressVietNam();
  }, []);

  // FOR API
  const _getAllAddressVietNam = async () => {
    let result = await getAllAddressVietNam();
    if (result?.isAxiosError) return;
    let temp = [...result?.data];
    let primaryArr = [];
    let codeArr = [79];
    temp = temp.filter((item, index) => {
      if (codeArr.includes(item?.code)) {
        primaryArr.push(item);
      }
      return !codeArr.includes(item?.code);
    });
    let newList = [...primaryArr, ...temp];
    setListAllProvince(newList);
  };

  const filterByNames = (data, inputValue) => {
    const re = new RegExp(escapeRegExp(inputValue), "i");
    const results = data.filter((item) => {
      if (item?.name) {
        if (re.test(slugify(item?.name, " "))) {
          return true;
        } else {
          return false;
        }
      }
    });
    if (!isEmpty(results)) {
      setListAllProvinceFilter(results);
    }
  };

  const _renderItem = ({ item, index }) => {
    const _handleChoiceProvince = () => {
      onChoice({
        cityName: item,
        codeCity: codeCity[index],
      });
    };
    return (
      <TouchableOpacity onPress={_handleChoiceProvince}>
        <Row
          flex={1}
          borderBottomWidth={1}
          borderBottomColor={BORDER_COLOR}
          padding={8 * 2}
        >
          <Column flex={1}>
            <Text>{item}</Text>
          </Column>
          <CircleTick
            isTicked={provinceChoiced?.codeCity === codeCity[index]}
          />
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Column flex={1}>
      {/* TEMP CLOSE */}
      {/* <Row
        gap={8}
        padding={8 * 2}>
        <IconFindGrey style={sizeIcon.lg} />
        <TextInput
          onChangeText={(text) => filterByNames(listAllProvince, text)}
          style={{ padding: 0, flex: 1 }}
          placeholder='Tìm kiếm thành phố' />
      </Row> */}
      <Row marginVertical={8} margin={8 * 2}>
        <Text weight="bold">Chọn Tỉnh/Thành</Text>
      </Row>
      <Column flex={1}>
        <FlatList
          renderItem={_renderItem}
          // data={!isEmpty(listAllProvinceFilter) ? listAllProvinceFilter : listAllProvince}
          data={cityName ?? []}
          keyExtractor={(item, index) => `${index}-${item}`}
        />
      </Column>
    </Column>
  );
};

export default ListAllProvince

const styles = StyleSheet.create({})
