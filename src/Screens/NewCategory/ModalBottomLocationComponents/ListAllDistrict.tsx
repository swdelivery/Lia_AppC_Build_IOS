import CircleTick from "@Components/CircleTick/CircleTick";
import Column from "@Components/Column";
import { IconBackGrey, IconFindGrey } from "@Components/Icon/Icon";
import Row from "@Components/Row";
import Text from "@Components/Text";
import TextInput from "@Components/TextInput";
import { BORDER_COLOR } from "@Constant/Color";
import { sizeIcon } from "@Constant/Icon";
import { getDistrictsByP } from "@Redux/Action/BookingAction";
import { escapeRegExp, isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import slugify from "slugify";

type Props = {
  onChoice: (item) => void;
  provinceChoiced: any;
  onBack: (item) => void;
  districtChoiced: any;
};

const ListAllDistrict = ({
  onChoice,
  provinceChoiced,
  onBack,
  districtChoiced,
}: Props) => {
  const [listAllDistrict, setListAllDistrict] = useState([]);
  const [listAllDistrictFilter, setListAllDistrictFilter] = useState([]);

  useEffect(() => {
    _getDistrictByP(provinceChoiced);
  }, [provinceChoiced]);

  // FOR API
  const _getDistrictByP = async (provinceChoiced) => {
    let result = await getDistrictsByP(provinceChoiced?.code);
    if (result?.isAxiosError) return;
    setListAllDistrict(result?.data?.districts);
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
      setListAllDistrictFilter(results);
    }
  };

  const _renderItem = ({ item, index }) => {
    const _handleChoiceDistrict = () => {
      onChoice(item);
    };
    return (
      <TouchableOpacity onPress={_handleChoiceDistrict}>
        <Row
          borderBottomWidth={1}
          borderBottomColor={BORDER_COLOR}
          padding={8 * 2}
        >
          <Column flex={1}>
            <Text>{item?.name}</Text>
          </Column>
          <CircleTick isTicked={districtChoiced?.code == item?.code} />
        </Row>
      </TouchableOpacity>
    );
  };

  return (
    <Column flex={1}>
      <Row gap={8} padding={8 * 2}>
        <IconFindGrey style={sizeIcon.lg} />
        <TextInput
          onChangeText={(text) => filterByNames(listAllDistrict, text)}
          style={{ padding: 0, flex: 1 }}
          placeholder="Tìm kiếm quận huyện"
        />
      </Row>
      <TouchableOpacity onPress={() => onBack("province")}>
        <Row margin={8 * 2} marginLeft={8} marginVertical={8}>
          <IconBackGrey style={sizeIcon.sm} />
          <Text weight="bold">Chọn Quận/Huyện</Text>
        </Row>
      </TouchableOpacity>
      <Column flex={1}>
        <FlatList
          renderItem={_renderItem}
          data={
            !isEmpty(listAllDistrictFilter)
              ? listAllDistrictFilter
              : listAllDistrict
          }
          keyExtractor={(item, index) => `${index}-${item?.codename}`}
        />
      </Column>
    </Column>
  );
};

export default ListAllDistrict;

const styles = StyleSheet.create({});
