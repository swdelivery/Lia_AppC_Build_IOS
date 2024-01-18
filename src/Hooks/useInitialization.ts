import { getFlashSaleState } from "@Redux/flashSale/selectors";
import { getImageVoucherHomeState } from "@Redux/imageVoucher/selectors";
import { getListNewsState } from "@Redux/news/selectors";
import { getServiceGroupState } from "@Redux/service/selectors";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BootSplash from "react-native-bootsplash";
import { getNews } from "@Redux/news/actions";
import { getServiceGroup } from "@Redux/service/actions";
import { loadMoreVouchers } from "@Redux/voucher/actions";
import { getImageVoucherHome } from "@Redux/imageVoucher/actions";
import { ConfigFileCode } from "@typings/configFile";
import { checkFlashSale } from "@Redux/flashSale/actions";
import { getDoctorList } from "@Redux/doctor/actions";
import { getDoctorListState } from "@Redux/doctor/selectors";

/**
 * Initializes the app by checking if all necessary data is loaded.
 *
 * @return {void} No return value
 */
export default function useInitialization(): void {
  const dispatch = useDispatch();

  const { isFirstLoaded: isFirstLoadedNews } = useSelector(getListNewsState);
  const { isFirstLoaded: isFirstLoadedServiceGroup } =
    useSelector(getServiceGroupState);
  const { isFirstLoaded: isFirstLoadedImageVoucher } = useSelector(
    getImageVoucherHomeState
  );
  const { isFirstLoaded: isFirstLoadedGetFlashSale } =
    useSelector(getFlashSaleState);
  const { isFirstLoaded: isFirstLoadedGetDoctor } =
    useSelector(getDoctorListState);

  useEffect(() => {
    if (
      isFirstLoadedNews &&
      isFirstLoadedServiceGroup &&
      isFirstLoadedImageVoucher &&
      isFirstLoadedGetFlashSale &&
      isFirstLoadedGetDoctor
    ) {
      setTimeout(() => {
        _hideSplashScreen();
      }, 500);
    }
  }, [
    isFirstLoadedNews,
    isFirstLoadedServiceGroup,
    isFirstLoadedImageVoucher,
    isFirstLoadedGetFlashSale,
    isFirstLoadedGetDoctor,
  ]);

  useEffect(() => {
    dispatch(
      getNews.request({
        condition: {
          isPin: { equal: true },
        },
        sort: {
          orderNumber: -1,
        },
        limit: 5,
      })
    );
    dispatch(
      getServiceGroup.request({
        condition: {
          parentCode: {
            equal: null,
          },
        },
        sort: {
          orderNumber: -1,
        },
        limit: 100,
        page: 1,
      })
    );
    dispatch(getImageVoucherHome.request(ConfigFileCode.ImageVoucherHome));
    dispatch(checkFlashSale.request());
    dispatch(getDoctorList.request());
  }, []);

  const _hideSplashScreen = useCallback(async () => {
    BootSplash.hide({ fade: true });
  }, []);
}
