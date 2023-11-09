import React, { memo } from "react";
import IconIHome from "../../SGV/i_home.svg";
import IconAHome from "../../SGV/a_home.svg";

import { _moderateScale } from "../../Constant/Scale";

type Props = {
  focused: boolean;
};

const HomeTabIcon = memo((props: Props) => {
  return (
    <>
      {props?.focused ? (
        <IconAHome
          width={_moderateScale(8 * 3)}
          height={_moderateScale(8 * 3)}
        />
      ) : (
        <IconIHome
          width={_moderateScale(8 * 3)}
          height={_moderateScale(8 * 3)}
        />
      )}
    </>
  );
});

export default HomeTabIcon;
