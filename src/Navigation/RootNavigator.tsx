import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { Platform } from "react-native";
// import RNBootSplash from "react-native-bootsplash";
import ModalCreateGroupChat from "../Components/Message/CreateGroupChat";
// MODAL
// COMPONENT
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import Login from "../Screens/Auth/Login";
import Register from "../Screens/Auth/Register";
import Activation from "../Screens/Auth/Activation";
// import { fcmService } from '../FCMConfig/FCMService';
// import { localNotificationService } from '../FCMConfig/LocalNotificationService';
import Chatting from "../Screens/Chat/Chatting/index";
import ModalAddMemberToGroupChat from "../Screens/Chat/InfoRoomChat/AddMemberToGroupChat";
import EditChat from "../Screens/Chat/InfoRoomChat/index";
import ListMembers from "../Screens/Members/index";
import BookingMain from "../Screens/Booking/index";
import BookingForBranch from "../Screens/Booking/bookingForBranch/index";
import ListService from "../Screens/ListService/index";

// SCREEN
import ModalCommentPost from "../Screens/ModalCommentPost/ModalCommentPost";
import CommentPostFromNotifi from "../Screens/Timeline/CommentPostFromNotifi";
import MainTab from "./TabNavigator/MainTab";
import DetailService from "../Screens/NewDetailService/index";
// import DetailServiceScreen from '../Screens/DetailService/index'
import ScanQRCode from "../Screens/QRCode/OpenCamera";
import Affiliate from "../Screens/Affiliate/index";
import HealthRecord from "../Screens/HealthRecord/index";
import EditProfile from "../Screens/EditProfile/index";
import PickServiceToBooking from "../Screens/NewPickerServiceBooking/index";
// import PickServiceToBooking from "../Screens/Booking/bookingForBranch/PickServiceToBooking";
import ListBooking from "../Screens/NewListBookings/index";
// import ListBooking from "../Screens/ListBooking/index";
import ListDeposit from "../Screens/ListDeposit/index";
import ListPayment from "../Screens/ListPayment/index";
import ListMedicine from "../Screens/ListMedicine/index";
import ListDepositRequest from "../Screens/ListDepositRequest";
import ListTreatmentDetail from "../Screens/ListTreatmentDetail";
import ListOrderService from "../Screens/ListOrderService";
import VideoRequest from "../Screens/VideoRequest";
import DetailBrand from "../Screens/NewDetailBranch/index";
// import DetailBrand from '../Screens/DetailBrand/index'
import FakeModal from "../Screens/DemoFakeModal/index";
// import DetailDoctor from '../Screens/DetailDoctor/index'
import DetailDoctor from "../Screens/NewDetailDoctor";
import DetailPractitioner from "../Screens/NewDetailPractitioner/index";
import BookingForDoctor from "../Screens/Booking/bookingForDoctor";
import EditBooking from "../Screens/Booking/editBooking/index";
import LoseWeight from "../Screens/LoseWeight/index";
import ListProduct from "../Screens/ListProduct";
import DetailProduct from "../Screens/DetailProduct/index";
import DiaryOfTreatment from "../Screens/DiaryOfTreatment";
import PurchaseDepositRequest from "../Screens/PurchaseDepositRequest/index";

import DetailNewFeed from "../Screens/DetailNewFeed";
import CreateNewFeed from "../Screens/CreateNewFeed";
import EditNewFeed from "../Screens/CreateNewFeed/UpdatePost";
import NewFeedSearch from "../Screens/NewFeedSearch";

import ModalListDiary from "../Screens/ModalListDiary";

import ModalServiceReview from "../Screens/ServiceReview/index";
import ModalBookingReview from "../Screens/BookingReview/index";

import InfoRoomChat from "../Screens/InfoRoomChat/index";
import AddFood from "../Screens/LoseWeight/AddFood";
import AddingFood from "../Screens/AddingFood/index";
import AddingActivity from "../Screens/AddingActivity/index";
import DetailFood from "../Screens/DetailFood/index";
import DetailActivity from "../Screens/DetailActivity/index";
import ListActivityToAdd from "../Screens/ListActivityToAdd/index";
import SettingLoseWeight from "../Screens/SettingLoseWeight/index";
import ChartRPCarlo from "../Screens/ChartRPCarlo/index";
import ChartRPWeight from "../Screens/ChartRPWeight/index";
import QALoseWeight from "../Screens/SettingLoseWeight/QALoseWeight";
import MyGoal from "../Screens/SettingLoseWeight/MyGoal";
import WaterGoal from "../Screens/SettingLoseWeight/WaterGoal";
import ListFoodInMenu from "../Screens/LoseWeight/ListFoodInMenu";

import ListBankForWithdraw from "../Screens/Withdraw/ListBank";
import WithDraw from "../Screens/Withdraw/Withdraw";
import ListSpSocical from "../Screens/SocialAssistance/index";
import DetailSpSocial from "../Screens/SocialAssistance/Detail";
import DetailNews from "../Screens/DetailNews/index";
import ListNews from "../Screens/ListNews/index";
import QAService from "../Screens/QAService/index";
import ServiceMaterial from "../Screens/ServiceMaterial/index";

import CreateDiaryDaily from "../Screens/ListDiaryOfPartnerChild/Components/CreatedDiaryForm";
import UpdateDiaryDaily from "../Screens/ListDiaryOfPartnerChild/Components/UpdateDiaryForm";

import InfoBooking from "../Screens/InfoBooking/index";
import DetailBooking from "../Screens/NewDetailBooking/index";
import InfoMaterial from "../Screens/InfoMaterial/index";

import AskForLgin from "../Screens/Auth/AskForLogin";
import LoginInApp from "../Screens/AuthIn/LoginInApp";
import RegisterInApp from "../Screens/AuthIn/RegisterInApp";
import ActivationInApp from "../Screens/AuthIn/ActivationInApp";
import FillPhoneToGetNewPass from "../Screens/AuthIn/FillPhoneToGetNewPass";
import GetOtpNewPass from "../Screens/AuthIn/GetOtpNewPass";

import VideoCall from "../Screens/VideoCall/VideoCall";
import HistoryLiaTicket from "../Screens/Affiliate/HistoryLiATicket";
import SettingApp from "../Screens/SettingApp/SettingApp";
import MyPersonalPage from "../Screens/MyPersonalPage/MyPersonalPage";
import EditDiary from "../Screens/CreateNewFeed/EditDiary";
import ListDiaryByType from "../Screens/ListDiaryByType/ListDiaryByType";
import WheelSpin from "../Screens/WheelSpin/WheelSpin";

import QRScreen from "../Screens/QRCode/index";

import Mission from "../Screens/Mission";
import FeedBackBranch from "../Screens/DetailBrand/FeedBackBranch";
import FeedBackDoctor from "../Screens/DetailDoctor/FeedBackDoctor";
import FeedBackService from "../Screens/DetailService/FeedBackService";
// import CreateBooking from "../Screens/CreateBooking/CreateBooking";
import CreateBooking from "../Screens/NewCreateBooking/index";
import ListVoucher from "../Screens/ListVoucher/ListVoucher";
import OtherPersonalPage from "../Screens/MyPersonalPage/OtherPersonalPage";
import ListAllHistoryTreatment from "../Screens/Profile/ListAllHistoryTreatment";
import FlashSale from "../Screens/FlashSale/index copy";
import CreateBookingFlashSale from "../Screens/CreateBooking/CreateBookingFlashSale";
import DetailServiceFlashSale from "../Screens/DetailService/DetailServiceFlashSale";
import DetailEncyclopedia from "../Screens/DetailNews/DetailEncyclopedia";
import ListServiceByKey from "../Screens/ListServiceByKey/ListServiceByKey";
import VerificationCTV from "../Screens/VerificationCTV/VerificationCTV";
// import dynamicLinks from '@react-native-firebase/dynamic-links';
import ShareToSocial from "../Screens/DetailService/ShareToSocial";
import VoiceCall from "../Screens/VideoCall/VoiceCall";
import ListMyAddress from "../Screens/ListMyAddress/ListMyAddress";
import CreateNewAddress from "../Screens/ListMyAddress/CreateNewAddress";
import Commission from "../Screens/Affiliate/Commission/Commission";
import Teammate from "../Screens/Affiliate/Teammate/Teammate";
import AffiliateService from "../Screens/Affiliate/Service/index";
import AffiliateWallet from "../Screens/Affiliate/Wallet/index";
import NotCollab from "../Screens/Affiliate/NotCollab";
import QAAffiliate from "../Screens/Affiliate/Q&A/index";
import Ranked from "../Screens/Affiliate/Ranked/Ranked";
import ListServiceCompare from "../Screens/CompareService/ListService";
import CompareService from "../Screens/CompareService/CompareService";
import StorageVideo from "../Screens/DetailService/StorageVideo";
import LiAUni from "../Screens/LiAUNI/LiAUni";
import Lession from "../Screens/LiAUNI/Lession";
import StartExam from "../Screens/LiAUNI/StartExam";
import FaceAI from "../Screens/FaceAI/FaceAI";
import ResultAIScanEyes from "../Screens/ResultAIScanEyes/ResultAIScanEyes";
import NewAffiliate from "../Screens/NewAffiliate/NewAffiliate";
import ListF1 from "../Screens/NewAffiliate/ListF1";
import InfoF1 from "../Screens/NewAffiliate/InfoF1";
import ListOrderBookingAll from "../Screens/NewAffiliate/ListOrderBookingAll";
import QANewAffiliate from "../Screens/NewAffiliate/QAAffiliate";
import InfoWalletNewAffiliate from "../Screens/NewAffiliate/InfoWalletNewAffiliate";
import ListRanked from "../Screens/NewAffiliate/ListRanked";
import LiAVoucher from "../Screens/LiAVoucher";
import DetailLiAVoucher from "../Screens/LiAVoucher/DetailLiAVoucher";
import MyVouchers from "../Screens/LiAVoucher/MyVouchers";
import DetailNewsVoucher from "../Screens/LiAVoucher/DetailNewsVoucher";
import VerticalVideoPlayer from "@Screens/VerticalVideoPlayer/VerticalVideoPlayer";
import DetailMaterial from "@Screens/DetailMaterial";
import ListBeautyInsurance from "@Screens/ListBeautyInsurance";
import DetailBeautyInsurance from "@Screens/DetailBeautyInsurance";
import withHost from "@Components/withHost";
import NewUpdateInfoUser from "@Screens/NewUpdateInfoUser";
import NewSettingApp from "src/NewSettingApp";
import ScreenHTML from "@Screens/ScreenHTML";
import NewHealthRecord from "@Screens/NewHealthRecord";
import ListRelativesProfile from "@Screens/ListRelativesProfile";
import RelativesInfo from "@Screens/ListRelativesProfile/RelativesInfo";
import AIChatting from "@Screens/Chat/AIChatting";

const rootStack = createStackNavigator();

const navigationOptions = {
  headerShown: false,
  // ...TransitionPreset,
  // gestureResponseDistance: {
  //     vertical: 800
  // }
  gestureEnabled: Platform.OS == "ios" ? true : false,
  cardOverlayEnabled: true,
};

const optionsModal = {
  gestureEnabled: Platform.OS == "ios" ? false : false,
  ...TransitionPresets.ModalSlideFromBottomIOS,
  cardStyle: {
    backgroundColor: "transparent",
  },
};

const RootNavigator = () => {
  return (
    <rootStack.Navigator
      //  initialRouteName={ScreenKey.MODAL_CREATE_GROUP_CHAT}
      screenOptions={navigationOptions}
    >
      {true ? (
        <>
          <rootStack.Screen component={MainTab} name="MainTab" />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_PRODUCT}
            component={DetailProduct}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MISSION_SCREEN}
            component={Mission}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.FLASHSALE_SCREEN}
            component={FlashSale}
          />

          {/* <rootStack.Screen options={{ ...TransitionPresets.ModalPresentationIOS }} name={ScreenKey.QR_CODE} component={QRCode} /> */}

          <rootStack.Screen
            options={{ ...TransitionPresets.ModalPresentationIOS }}
            name={ScreenKey.SCAN_QR_CODE}
            component={ScanQRCode}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.HEALTH_RECORD}
            component={NewHealthRecord}
          />
          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.TREATMENT_RECORD} component={TreatmentRecord} /> */}

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CHATTING}
            component={Chatting}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.AI_CHATTING}
            component={AIChatting}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_MEMBER_APP}
            component={ListMembers}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.EDIT_CHATTING_ROOM}
            component={EditChat}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.MODAL_CREATE_GROUP_CHAT}
            component={ModalCreateGroupChat}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.ADD_MEMBERS_TO_GROUP_CHAT}
            component={ModalAddMemberToGroupChat}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.INFO_ROOM_CHAT}
            component={InfoRoomChat}
          />

          {/* AFFILIATE */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.AFFILIATE}
            component={Affiliate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.AFFILIATE_NOT_COLLAB}
            component={NotCollab}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.VERIFICATION_CTV}
            component={VerificationCTV}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_BANK_FOR_WITHDRAW}
            component={ListBankForWithdraw}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.WITH_DRAW}
            component={WithDraw}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.HISTORY_LIA_TICKET}
            component={HistoryLiaTicket}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.COMMISSION}
            component={Commission}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.TEAMMATE}
            component={Teammate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.AFFILIATE_SERVICE}
            component={AffiliateService}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.AFFILIATE_WALLET}
            component={AffiliateWallet}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.QA_AFFILIATE}
            component={QAAffiliate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.RANKED}
            component={Ranked}
          />

          {/* Booking */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.BOOKING_MAIN}
            component={BookingMain}
          />
          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_BRANCH} component={ListBranch} /> */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_BRAND}
            component={DetailBrand}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_NEW_FEED}
            component={DetailNewFeed}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.SEARCH_NEW_FEED}
            component={NewFeedSearch}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MY_PERSONAL_PAGE}
            component={MyPersonalPage}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.OTHER_PERSONAL_PAGE}
            component={OtherPersonalPage}
          />

          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_DOCTOR} component={ListDoctor} /> */}
          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.DETAIL_DOCTOR} component={DetailDoctor} /> */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_DOCTOR}
            component={DetailDoctor}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_PRACTITIONER}
            component={DetailPractitioner}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.VIDEO_REQUEST}
            component={VideoRequest}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.BOOKING_FOR_BRANCH}
            component={BookingForBranch}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.BOOKING_FOR_DOCTOR}
            component={BookingForDoctor}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.EDIT_BOOKING}
            component={EditBooking}
          />

          {/* Info Booking */}

          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.INFO_BOOKING}
            component={InfoBooking}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_BOOKING}
            component={DetailBooking}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.INFO_MATERIAL}
            component={InfoMaterial}
          />

          {/* Diary */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DIARY_OF_TREATMENT}
            component={DiaryOfTreatment}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.EDIT_DIARY}
            component={EditDiary}
          />

          <rootStack.Screen
            options={{ ...optionsModal }}
            name={ScreenKey.MODAL_LIST_DIARY}
            component={ModalListDiary}
          />

          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.PICK_SERVICE_TO_BOOKING}
            component={PickServiceToBooking}
          />
          {/* <rootStack.Screen
                options={optionsModal}
                name={ScreenKey.PICK_SERVICE_TO_BOOKING}
                component={PickServiceToBooking}
              /> */}
          {/* -------- */}
          {/* Service */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_SERVICE}
            component={ListService}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_PRODUCT}
            component={ListProduct}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_SERVICE}
            component={DetailService}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.STORAGE_VIDEO}
            component={StorageVideo}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MATERIAL_SERVICE}
            component={ServiceMaterial}
          />
          <rootStack.Screen
            options={{ ...optionsModal }}
            name={ScreenKey.LIST_SERVICE_COMPARE}
            component={ListServiceCompare}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.COMPARE_SERVICE}
            component={CompareService}
          />

          {/* -------- */}
          {/* Profile */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.EDIT_PROFILE}
            component={NewUpdateInfoUser}
          />
          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.PICK_TREATMENT_TO_BOOKING} component={PickTreatmentDiary} /> */}

          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_PARTNER_DIARY} component={ListDiary} /> */}
          {/* <rootStack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_PARTNER_DIARY_CHILD} component={ListDiaryOfPartnerChild} /> */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CREATE_PARTNER_DIARY_DAILY}
            component={CreateDiaryDaily}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.UPDATE_PARTNER_DIARY_DAILY}
            component={UpdateDiaryDaily}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_BOOKING}
            component={ListBooking}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_DEPOSIT}
            component={ListDeposit}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_PAYMENT}
            component={ListPayment}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_MEDICINE}
            component={ListMedicine}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_DEPOSIT_REQUEST}
            component={ListDepositRequest}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_ORDER_SERVICE}
            component={ListOrderService}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_TREATMENT_DETAIL}
            component={ListTreatmentDetail}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.PURCHASE_DEPOSIT_REQUEST}
            component={PurchaseDepositRequest}
          />

          {/* Lose Weight */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LOSE_WEIGHT}
            component={LoseWeight}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.SETTING_LOSE_WEIGHT}
            component={SettingLoseWeight}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.ADD_FOOD}
            component={AddFood}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_FOOD_IN_MENU}
            component={ListFoodInMenu}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.ADDING_FOOD}
            component={AddingFood}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.ADDING_ACTIVITY}
            component={AddingActivity}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_FOOD}
            component={DetailFood}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_ACTIVITY_TO_ADD}
            component={ListActivityToAdd}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_ACTIVITY}
            component={DetailActivity}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CHART_RP_CARLO}
            component={ChartRPCarlo}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CHART_RP_WEIGHT}
            component={ChartRPWeight}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.QA_LOSE_WEIGHT}
            component={QALoseWeight}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.QA_SERVICE}
            component={QAService}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MY_GOAL}
            component={MyGoal}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.WATER_GOAL}
            component={WaterGoal}
          />

          {/* SOCIAL ASSISTANCE */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_SP_SOCIAL}
            component={ListSpSocical}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_SP_SOCIAL}
            component={DetailSpSocial}
          />

          {/* -------- */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_NEWS}
            component={ListNews}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_NEWS}
            component={DetailNews}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_ENCYCLOPEDIA}
            component={DetailEncyclopedia}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.ModalPresentationIOS }}
            name={ScreenKey.CREATE_NEW_FEED}
            component={CreateNewFeed}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.ModalPresentationIOS }}
            name={ScreenKey.EDIT_NEW_FEED}
            component={EditNewFeed}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.MODAL_COMMENT_POST}
            component={ModalCommentPost}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MODAL_COMMENT_POST_FROM_NOTIFI}
            component={CommentPostFromNotifi}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.MODAL_SERVICE_REVIEW}
            component={ModalServiceReview}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.MODAL_BOOKING_REVIEW}
            component={ModalBookingReview}
          />

          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.VIDEO_CALL}
            component={VideoCall}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.VOICE_CALL}
            component={VoiceCall}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.SETTING_APP}
            component={NewSettingApp}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_DIARY_BY_TYPE}
            component={ListDiaryByType}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_SERVICE_BY_KEY}
            component={ListServiceByKey}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.WHEEL_SPIN}
            component={WheelSpin}
          />

          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.QR_CODE}
            component={QRScreen}
          />

          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.FEED_BACK_BRANCH}
            component={FeedBackBranch}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.FEED_BACK_DOCTOR}
            component={FeedBackDoctor}
          />
          <rootStack.Screen
            options={optionsModal}
            name={ScreenKey.FEED_BACK_SERVICE}
            component={FeedBackService}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CREATE_BOOKING}
            component={CreateBooking}
          />
          {/* <rootStack.Screen
                options={{ ...TransitionPresets.SlideFromRightIOS }}
                name={ScreenKey.CREATE_BOOKING}
                component={CreateBooking}
              /> */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CREATE_BOOKING_FLASH_SALE}
            component={CreateBookingFlashSale}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_SERVICE_FLASH_SALE}
            component={DetailServiceFlashSale}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_VOUCHER}
            component={ListVoucher}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_ALL_HISTORY_TREATMENT}
            component={ListAllHistoryTreatment}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.SHARE_TO_SOCIAL}
            component={ShareToSocial}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_MY_ADDRESS}
            component={ListMyAddress}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.CREATE_NEW_ADDRESS}
            component={CreateNewAddress}
          />

          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIA_UNI}
            component={LiAUni}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LESSION}
            component={Lession}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.START_EXAM}
            component={StartExam}
          />

          {/* AUTH IN APP */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LOGIN_IN_APP}
            component={LoginInApp}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.REGISTER_IN_APP}
            component={RegisterInApp}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.ACTIVATION_IN_APP}
            component={ActivationInApp}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.FILL_PHONE_TO_GET_NEW_PASS}
            component={FillPhoneToGetNewPass}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.GET_OTP_NEW_PASS}
            component={GetOtpNewPass}
          />

          {/* AI */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={"FACE_AI"}
            component={FaceAI}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.RESULT_AI_SCAN_EYES}
            component={ResultAIScanEyes}
          />

          {/* NEW AFFILIATE */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.NEW_AFFILIATE}
            component={NewAffiliate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_F1}
            component={ListF1}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.INFO_F1}
            component={InfoF1}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.ORDER_BOOKING_ALL_AFFILIATE}
            component={ListOrderBookingAll}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.QA_NEW_AFFILIATE}
            component={QANewAffiliate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.INFO_WALLET_NEW_AFFILIATE}
            component={InfoWalletNewAffiliate}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_RANKED}
            component={ListRanked}
          />

          {/* LiA Voucher */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIA_VOUCHER}
            component={LiAVoucher}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_LIA_VOUCHER}
            component={DetailLiAVoucher}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.MY_VOUCHERS}
            component={MyVouchers}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_NEWS_VOUCHER}
            component={DetailNewsVoucher}
          />

          {/* VIDEO PLAYER */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.VERTICAL_VIDEO_PLAYER}
            component={VerticalVideoPlayer}
          />

          {/* MATERIAL */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_MATERIAL}
            component={DetailMaterial}
          />

          {/* BEAUTY INSURANCE */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_BEAUTY_INSURANCE}
            component={ListBeautyInsurance}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.DETAIL_BEAUTY_INSURANCE}
            component={DetailBeautyInsurance}
          />

          {/* SCREEN FOR RENDER HTML */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.SCREEN_HTML}
            component={ScreenHTML}
          />

          {/* RELATIVES PROFILE */}
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.LIST_RELATIVES_PROFILE}
            component={ListRelativesProfile}
          />
          <rootStack.Screen
            options={{ ...TransitionPresets.SlideFromRightIOS }}
            name={ScreenKey.RELATIVES_INFO}
            component={RelativesInfo}
          />

          <rootStack.Screen
            options={{
              headerShown: false,
              cardStyle: { backgroundColor: "transparent" },
              cardOverlayEnabled: true,
              cardStyleInterpolator: ({ current: { progress } }) => ({
                cardStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 0.5, 0.9, 1],
                    outputRange: [0, 0.25, 0.7, 1],
                  }),
                },
                overlayStyle: {
                  opacity: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                    extrapolate: "clamp",
                  }),
                },
              }),
            }}
            name={"fakeModal"}
            component={FakeModal}
          />
        </>
      ) : (
        <>
          <rootStack.Screen name="AskForLogin" component={AskForLgin} />
          <rootStack.Screen name="Login" component={Login} />
          <rootStack.Screen name={ScreenKey.REGISTER} component={Register} />
          <rootStack.Screen
            name={ScreenKey.ACTIVATION}
            component={Activation}
          />
        </>
      )}
    </rootStack.Navigator>
  );
};

export default withHost(RootNavigator);
