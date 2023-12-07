import { StyleProp } from "react-native";
import React, { useMemo } from "react";
import { _moderateScale, _widthScale } from "../../Constant/Scale";
import { BranchService } from "@typings/branch";
import { ViewStyle } from "react-native";
import HorizontalServicesV2 from "@Components/HorizontalServicesV2";
import Fade from "@Components/Fade";

type Props = {
  title?: string;
  items: BranchService[];
  containerStyle?: StyleProp<ViewStyle>;
};
const HorizontalServices = ({ items, title, containerStyle }: Props) => {
  const data = useMemo(() => {
    return items.map((item) => item.service).filter((item) => item);
  }, [items]);

  return (
    <Fade visible={data.length > 0}>
      <HorizontalServicesV2
        items={data}
        title={title}
        containerStyle={containerStyle}
        paddingHorizontal={0}
      />
    </Fade>
  );
};

export default HorizontalServices;
