import Column from '@Components/Column'
import RenderHTML from '@Components/RenderHTML/RenderHTML'
import Text from '@Components/Text'
import { _width } from '@Constant/Scale'
import React from 'react'
import { StyleSheet } from 'react-native'

const DATA = `<div> <p>Khi đời sống người dân bị ảnh hưởng nhiều do đại dịch COVID-19, nhiều hoàn cảnh vốn đã khó khăn nay càng khó khăn hơn, thấu hiểu và sẽ chia trước hoàn cảnh đó, Nhóm thiện nguyện Chung Một Tấm Lòng phối hợp UBND Thị trấn Tân Trụ trao tặng 120 phần quà cho hộ nghèo, cận nghèo trên địa bàn thị trấn Tân Trụ.</p> <div id="attachment_411573" class="wp-caption aligncenter"><img class="" src="https://media.la34.com.vn/upload/image/202201/medium/233384_04-1-Nhom-thien-nguyen-Chung-Mot-Tam-Long-tang-qua-doi-tuong-co-hoan-canh-kho-khan.png" alt="" width="570" height="321" srcset="" sizes=""><p class="wp-caption-text"><span>Nhóm thiện nguyện Chung 1 Tấm Lòng tặng quà hộ nghèo, cận nghèo tại thị trấn Tân Trụ</span></p></div> <p>Mỗi phần quà trị giá 340.000đ, gồm: 10 kg gạo, 01 thùng mì gói và các nhu yếu phẩm cần thiết khác. Tổng giá trị đợt tặng quà này hơn 40 triệu đồng do Nhóm thiện nguyện Chung 1 Tấm Lòng vận động mạnh thường quân hỗ trợ.<div class="ads-zone "><div class="row"><div class="col-md-12"><div class="ads-zone-group zonegroup-vertical" id="ads-zone-12" data-id="12" data-type="vertical" data-position="ads_article_detail_center" data-timeflip="4000"></div></div></div></div></p> <p>Để đảm bảo công tác phòng chống dịch tránh tập trung dông người, địa phương gửi thư mời theo khung giờ, hoạt động trao tặng diễn ra nhanh chóng. Anh Trần Văn Đến- Trưởng nhóm thiện nguyện Chung 1 Tấm Lòng, huyện Tân Trụ cho biết: Trong năm 2021, chứng kiến nhiều hoàn cảnh khó khăn của người dân bị ảnh hưởng bởi dịch COVID-19, Nhóm vận động các nhà hảo tâm đã tổ chức trao tặng hơn 700 phần quà với kinh phí hơn 200 triệu đồng để kịp thời chia sẽ với những người có hoàn cảnh khó khăn; với tinh thần “tương thân tương ái”, Nhóm mong muốn người yếu thế vượt qua khó khăn, vươn lên trong cuộc sống.</p> <p> </p> </div>`

const Story = () => {
  return (
    <Column margin={8 * 2}>
      <Text weight='bold'>Câu chuyện</Text>
      <Column>
        <RenderHTML
          contentWidth={_width - 8 * 4}
          data={DATA} />
      </Column>
    </Column>
  )
}

export default Story

const styles = StyleSheet.create({})
