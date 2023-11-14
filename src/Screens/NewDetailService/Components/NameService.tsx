import { StyleSheet } from "react-native";
import React from "react";
import { _moderateScale, _widthScale } from "../../../Constant/Scale";
import CountStar2 from "../../../Components/NewCountStar/CountStar";
import Text from "@Components/Text";
import { RED } from "@Constant/Color";
import Column from "@Components/Column";
import { formatMonney } from "@Constant/Utils";
import Row from "@Components/Row";
import Icon from "@Components/Icon";
import { Service } from "@typings/serviceGroup";

type Props = {
  service: Service;
};

const NameService = ({ service }: Props) => {
  return (
    <Column style={styles.infoService} gap={8}>
      <Text size={18} weight="bold" color={RED}>
        {formatMonney(service?.price, true)}
      </Text>

      <Text size={16} weight="bold">
        {service?.name}
      </Text>

      <Row top={2} gap={8}>
        <CountStar2 count={service?.reviewCount} rating={5} />
        <Text size={10}>|</Text>
        <Row gap={4} top={2}>
          <Icon name="account-multiple" size={16} color="grey" />
          <Text size={10}>({service?.countPartner})</Text>
        </Row>
      </Row>
    </Column>
  );
};

export default NameService;

const styles = StyleSheet.create({
  infoService: {
    paddingVertical: _moderateScale(8),
    width: _widthScale(360),
    // height: _moderateScale(8 * 20),
    alignSelf: "center",
    marginTop: _moderateScale(8),
    backgroundColor: "white",
    borderRadius: _moderateScale(8 * 2),
    paddingHorizontal: _moderateScale(8 * 1.5),
  },
  referenceSite: {
    paddingHorizontal: _moderateScale(8 * 1),
    paddingVertical: _moderateScale(4),
    borderRadius: _moderateScale(8),
    backgroundColor: "#FAF0EF",
    alignSelf: "flex-start",
  },
});
