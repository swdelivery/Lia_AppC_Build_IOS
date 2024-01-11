import Column from "@Components/Column";
import {
  IconProfileBooking,
  IconProfileCare,
  IconProfileCoin,
  IconProfileHistory,
  IconProfileMedical,
  IconProfilePartnerShip,
  IconProfilePayment,
  IconProfilePolicy,
  IconProfileProtect,
  IconProfileShield,
  IconProfileStar,
  IconProfileVoucher,
  IconProfileWallet,
} from "@Components/Icon/Icon";
import Screen from "@Components/Screen";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Banner from "./Components/Banner";
import MainList from "./Components/MainList";
import Menu from "./Components/Menu";
import { FocusAwareStatusBar } from "@Components/StatusBar";
import { ProfileMirrorIcon, RecordIcon } from "src/SGV";

const NewProfile = () => {
  return (
    <Screen>
      <FocusAwareStatusBar barStyle="light-content" />
      <ScrollView>
        <Banner />
        <View style={styles.body}>
          <Column gap={8 * 2} marginTop={8 * 2}>
            <MainList />
            <Menu
              type={"row"}
              title={"Đơn hàng của tôi"}
              data={[
                {
                  flag: "list-booking",
                  name: "Lịch hẹn",
                  icon: <IconProfileBooking />,
                },
                {
                  flag: "examination-results",
                  name: "Kết quả\nthăm khám",
                  icon: <RecordIcon />,
                },
                {
                  flag: "treatment-history",
                  name: "Lịch sử\nđiều trị",
                  icon: <IconProfileHistory />,
                },
                {
                  flag: "list-medicine",
                  name: "Đơn thuốc",
                  icon: <IconProfileMedical />,
                },
                {
                  flag: "takecare",
                  name: "Chăm sóc",
                  icon: <IconProfileCare />,
                },
                {
                  flag: "payment",
                  name: "Thanh toán",
                  icon: <IconProfilePayment />,
                },
                { flag: "rating", name: "Đánh giá", icon: <IconProfileStar /> },
                {
                  flag: "refund",
                  name: "Hoàn tiền",
                  icon: <IconProfileCoin />,
                },
                // { name: "Bảo hành", icon: <IconProfileShield /> },
              ]}
            />
            <Menu
              type={"row"}
              title={"Tiện ích của tôi"}
              data={[
                {
                  flag: "lia-wallet",
                  name: "Ví LiA",
                  icon: <IconProfileWallet />,
                },
                {
                  flag: "lia-voucher",
                  name: "Kho Voucher",
                  icon: <IconProfileVoucher />,
                },
                {
                  flag: "magic-mirror",
                  name: "Gương thần",
                  icon: <ProfileMirrorIcon />,
                },
                {
                  flag: "skin-mirror",
                  name: "SaYoi",
                  icon: <ProfileMirrorIcon />,
                },
                // { name: "LPay Later", icon: <IconProfilePayLater /> },
                // { name: "Bảo hiểm", icon: <IconProfileInsurance /> },
              ]}
            />
            {/* <Menu
              type={"row"}
              title={"Phụng sự"}
              data={[
                {
                  flag: "charity",
                  name: "Lá lành\nđùm lá rách",
                  icon: <IconProfileHandHeartIn />,
                },
                // {
                //   name: "Quỹ thiện\nnguyện LiA",
                //   icon: <IconProfileLoveCare />,
                // },
                // { name: "Tuyển dụng", icon: <IconProfileFindJob /> },
                // { name: "Đào tạo", icon: <IconProfileEducation /> },
              ]}
            /> */}
            <Menu
              type={"column"}
              title={"Khác"}
              data={[
                {
                  flag: "policy",
                  name: "Chính sách và quy định chung",
                  icon: <IconProfilePolicy width={20} height={20} />,
                },
                {
                  flag: "protect",
                  name: "Chính sách bảo mật",
                  icon: <IconProfileProtect />,
                },
                {
                  flag: "contact",
                  name: "Liên hệ hợp tác",
                  icon: <IconProfilePartnerShip width={20} height={20} />,
                },
              ]}
            />
            {/* <View style={{ height: 100 }} /> */}
          </Column>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default NewProfile;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#F6FCFF",
    paddingBottom: 100,
  },
});
