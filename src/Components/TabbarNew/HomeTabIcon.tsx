import React, { memo } from "react";
import IconIHome from "../../SGV/i_home.svg";
import IconAHome from "../../SGV/a_home.svg";

import { _moderateScale } from "../../Constant/Scale";
import { BASE_COLOR } from "@Constant/Color";

type Props = {
  focused: boolean;
};

const HomeTabIcon = memo((props: Props) => {
  return (
    <>
      {props?.focused ? (
        <IconAHome width={24} height={24} color={BASE_COLOR} />
      ) : (
        <IconIHome width={24} height={24} />
      )}
    </>
  );
});

export default HomeTabIcon;
