import { useCallback, useState } from "react";
import { getAllNewsv2 } from "../Redux/Action/News";
import { URL_ORIGINAL } from "../Constant/Url";

export default function useAllNews() {
  const [listImage, setListImage] = useState([]);
  const [primaryColor, setPrimaryColor] = useState(null);

  const getAllNews = useCallback(async () => {
    let result = await getAllNewsv2({
      condition: {
        isPin: { equal: true },
      },
      sort: {
        orderNumber: -1,
      },
      limit: 5,
    });
    if (result?.isAxiosError) return;

    let listImages = result?.data?.data?.map((item, index) => {
      return {
        _id: item?._id,
        url: `${URL_ORIGINAL}${item?.representationFileArr[0]?.link}`,
      };
    });

    setListImage(listImages);
  }, []);
}
