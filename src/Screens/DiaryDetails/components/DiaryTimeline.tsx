import { DailyDiary, Diary } from "@typings/diary";
import React, { useCallback, useMemo } from "react";
import TimelineItem from "./TimelineItem";
import Column from "@Components/Column";
import {
  createPartnerDiaryDailyv2,
  updatePartnerDailyDiaryv2,
} from "@Redux/Action/PartnerDiary";
import moment from "moment";

type Props = {
  diary: Diary;
  dailyDiaryArr: DailyDiary[];
  onDiaryUpdate: () => void;
};

export default function DiaryTimeline({
  diary,
  dailyDiaryArr,
  onDiaryUpdate,
}: Props) {
  const todayCreated = useMemo(() => {
    if (!dailyDiaryArr?.length) return false;
    return moment().isSame(dailyDiaryArr[0].date, "day");
  }, [...dailyDiaryArr]);

  const handleItemUpdate = useCallback(
    async (item: Partial<DailyDiary>) => {
      if (item._id) {
        await updatePartnerDailyDiaryv2(item._id, item);
      } else {
        await createPartnerDiaryDailyv2({
          partnerDiaryId: diary?._id,
          date: new Date(),
          ...item,
        });
      }
      onDiaryUpdate();
    },
    [diary, onDiaryUpdate]
  );

  function renderItem(item: DailyDiary, index: number) {
    return (
      <TimelineItem
        key={item._id}
        item={item}
        isFirst={index === 0 && !todayCreated}
        onItemUpdate={handleItemUpdate}
      />
    );
  }

  return (
    <Column marginHorizontal={15}>
      {!todayCreated && (
        <TimelineItem
          // @ts-ignore
          item={{
            date: new Date().toISOString(),
            images: [],
          }}
          isFirst
          onItemUpdate={handleItemUpdate}
        />
      )}
      {dailyDiaryArr.map(renderItem)}
    </Column>
  );
}
