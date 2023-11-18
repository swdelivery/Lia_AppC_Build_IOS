import { FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { newGetServiceByGroup } from "@Redux/Action/ServiceGroup";
import { _width, _widthScale } from "@Constant/Scale";
import ItemService from "./ItemService";

const ListServices = (props) => {
  const { route } = props;

  const [listServices, setListServices] = useState([]);

  useEffect(() => {
    if (route?.code) {
      _getServiceByGRCode(route?.code);
    }
  }, [route?.code]);

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
    let result = await newGetServiceByGroup(condition);
    setListServices(result?.data?.data);
  };

  const _renderItem = ({ item, index }) => {
    return <ItemService data={item} />;
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 8 }}
      numColumns={2}
      data={listServices}
      renderItem={_renderItem}
      keyExtractor={({ item, index }) => index}
    />
  );
};

export default ListServices;

const styles = StyleSheet.create({});
