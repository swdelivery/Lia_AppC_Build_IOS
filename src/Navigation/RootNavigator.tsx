import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ModalCreateGroupChat from "../Components/Message/CreateGroupChat";
import { _heightScale } from "../Constant/Scale";
import ScreenKey from "./ScreenKey";
import Chatting from "../Screens/Chat/Chatting/index";
import ModalAddMemberToGroupChat from "../Screens/Chat/InfoRoomChat/AddMemberToGroupChat";
import EditChat from "../Screens/Chat/InfoRoomChat/index";
import ListMembers from "../Screens/Members/index";
import BookingMain from "../Screens/Booking/index";
import BookingForBranch from "../Screens/Booking/bookingForBranch/index";
import ListService from "../Screens/ListService/index";
import ModalCommentPost from "../Screens/ModalCommentPost/ModalCommentPost";
import CommentPostFromNotifi from "../Screens/Timeline/CommentPostFromNotifi";
import MainTab from "./TabNavigator/MainTab";
import DetailService from "../Screens/NewDetailService/index";
import ScanQRCode from "../Screens/QRCode/OpenCamera";
import Affiliate from "../Screens/Affiliate/index";
import PickServiceToBooking from "../Screens/NewPickerServiceBooking/index";
import ListBooking from "../Screens/NewListBookings/index";
import ListDeposit from "../Screens/ListDeposit/index";
import ListPayment from "../Screens/ListPayment/index";
import ListMedicine from "../Screens/ListMedicine/index";
import ListDepositRequest from "../Screens/ListDepositRequest";
import ListTreatmentDetail from "../Screens/ListTreatmentDetail";
import ListOrderService from "../Screens/ListOrderService";
import VideoRequest from "../Screens/VideoRequest";
import DetailBrand from "../Screens/NewDetailBranch/index";
import DetailDoctor from "../Screens/NewDetailDoctor";
import DetailPractitioner from "../Screens/NewDetailPractitioner/index";
import BookingForDoctor from "../Screens/Booking/bookingForDoctor";
import EditBooking from "../Screens/Booking/editBooking/index";
import LoseWeight from "../Screens/LoseWeight/index";
import ListProduct from "../Screens/ListProduct";
import DetailProduct from "../Screens/DetailProduct/index";
import DiaryOfTreatment from "../Screens/DiaryOfTreatment";
import PurchaseDepositRequest from "../Screens/PurchaseDepositRequest/index";
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
import LoginInApp from "../Screens/AuthIn/LoginInApp";
import RegisterInApp from "../Screens/AuthIn/RegisterInApp";
import ActivationInApp from "../Screens/AuthIn/ActivationInApp";
import FillPhoneToGetNewPass from "../Screens/AuthIn/FillPhoneToGetNewPass";
import GetOtpNewPass from "../Screens/AuthIn/GetOtpNewPass";
import VideoCall from "../Screens/VideoCall/VideoCall";
import HistoryLiaTicket from "../Screens/Affiliate/HistoryLiATicket";
import MyPersonalPage from "../Screens/MyPersonalPage/MyPersonalPage";
import EditDiary from "../Screens/DiaryDetails";
import ListDiaryByType from "../Screens/ListDiaryByType/ListDiaryByType";
import Mission from "../Screens/Mission";
import FeedBackBranch from "../Screens/DetailBrand/FeedBackBranch";
import FeedBackDoctor from "../Screens/DetailDoctor/FeedBackDoctor";
import FeedBackService from "../Screens/DetailService/FeedBackService";
import CreateBooking from "../Screens/NewCreateBooking/index";
import ListVoucher from "../Screens/ListVoucher/ListVoucher";
import OtherPersonalPage from "../Screens/MyPersonalPage/OtherPersonalPage";
import ListAllHistoryTreatment from "../Screens/Profile/ListAllHistoryTreatment";
import FlashSale from "../Screens/FlashSale";
import CreateBookingFlashSale from "../Screens/CreateBooking/CreateBookingFlashSale";
import DetailServiceFlashSale from "../Screens/DetailService/DetailServiceFlashSale";
import DetailEncyclopedia from "../Screens/DetailNews/DetailEncyclopedia";
import ListServiceByKey from "../Screens/ListServiceByKey/ListServiceByKey";
import VerificationCTV from "../Screens/VerificationCTV/VerificationCTV";
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
import DetailPost from "@Screens/Social/DetailPost";
import ListComments from "@Screens/Social/ListComments";
import DoctorList from "@Screens/DoctorList";
import SearchingHome from "@Screens/NewSearchHome/index";
import RechargeToWallet from "@Screens/RechargeToWallet/index";
import UpdatePartnerInfoBank from "@Screens/NewVerificationCTV/UpdatePartnerInfoBank";
import NewVerificationCTV from "@Screens/NewVerificationCTV/NewVerificationCTV";
import CurrCollaboratorRequest from "@Screens/NewVerificationCTV/CurrCollaboratorRequest";
import ServiceList from "@Screens/ServiceList";
import BranchList from "@Screens/BranchList";
import PractitionerList from "@Screens/PractitionerList";
import MaterialList from "@Screens/MaterialList";
import TakeCare from "@Screens/TakeCare";
import UpdateDailyDiaries from "@Screens/TakeCare/UpdateDailyDiaries";
import NewCategory from "@Screens/NewCategory";
import CharityFundDetails from "@Screens/CharityFundDetails";
import Charity from "@Screens/Charity";
import SearchingCharity from "@Screens/Charity/SearchingCharity";
import CharityAccountStatement from "@Screens/CharityAccountStatement";
import ListOutstanding from "@Screens/Charity/ListOutstanding";
import ModalFilter from "@Screens/CharityAccountStatement/ModalFilter";
import ResultFilter from "@Screens/CharityAccountStatement/ResultFilter";
import Companion from "@Screens/CharityFundDetails/Companion";
import Donation from "@Screens/CharityFundDetails/Donation";
import InfoCoFounder from "@Screens/CharityFundDetails/InfoCoFounder";
import ListCompanion from "@Screens/CharityFundDetails/ListCompanion";
import NewQRCode from "@Screens/NewQRCode";
import PickUtilities from "@Screens/NewQRCode/PickUtilities";
import NewWheelSpin from "@Screens/NewWheelSpin";
import ListDiary from "@Screens/ListDiaryOfPartner";
import DetailServiceProduct from "@Screens/DetailServiceProduct";
import ProductList from "@Screens/ProductList";
import SkinMirrorAI from "@Screens/SkinMirrorAI";
import { isAndroid } from "src/utils/platform";
import ListBranch from "@Screens/ListBranch";
import ListDoctor from "@Screens/ListDoctor";
import ListAllNews from "@Screens/Home/ListAllNews";
import ListAllEncyclopedia from "@Screens/Home/ListAllEncyclopedia";
import TreatmentRecord from "@Screens/TreatmentRecord/index";
import ListDiaryOfPartnerChild from "@Screens/ListDiaryOfPartnerChild";
import PickTreatmentDiary from "@Screens/ListDiaryOfPartner/Components/PickTreatmentToDiary";
import PartnerReviewService from "@Screens/PartnerReviewService";
import ListExaminationResults from "@Screens/ExaminationResults/ListExaminationResults";
import DetailExaminationResult from "@Screens/ExaminationResults/DetailExaminationResult";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      // initialRouteName={ScreenKey.CHARITY_FUND_DETAILS}
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen component={MainTab} name="MainTab" />
      <Stack.Screen name={ScreenKey.LIST_BRANCH} component={ListBranch} />
      <Stack.Screen name={ScreenKey.LIST_DOCTOR} component={ListDoctor} />
      <Stack.Screen name={ScreenKey.LIST_DOCTOR_IOS} component={ListDoctor} />
      {/* <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name={ScreenKey.LIST_SERVICE} component={ListService} /> */}
      <Stack.Screen name={ScreenKey.LIST_ALL_NEWS} component={ListAllNews} />
      <Stack.Screen
        name={ScreenKey.LIST_ALL_ENCYCLOPEDIA}
        component={ListAllEncyclopedia}
      />
      <Stack.Screen
        name={ScreenKey.TREATMENT_RECORD}
        component={TreatmentRecord}
      />
      <Stack.Screen
        name={ScreenKey.PICK_TREATMENT_TO_BOOKING}
        component={PickTreatmentDiary}
      />
      <Stack.Screen
        name={ScreenKey.LIST_PARTNER_DIARY_CHILD}
        component={ListDiaryOfPartnerChild}
      />

      <Stack.Screen
        component={CharityFundDetails}
        name={ScreenKey.CHARITY_FUND_DETAILS}
      />

      <Stack.Screen name={ScreenKey.DETAIL_PRODUCT} component={DetailProduct} />
      <Stack.Screen name={ScreenKey.MISSION_SCREEN} component={Mission} />
      <Stack.Screen name={ScreenKey.FLASHSALE_SCREEN} component={FlashSale} />

      {/* <Stack.Screen options={{ ...TransitionPresets.ModalPresentationIOS }} name={ScreenKey.QR_CODE} component={QRCode} /> */}

      <Stack.Screen name={ScreenKey.SCAN_QR_CODE} component={ScanQRCode} />
      <Stack.Screen
        name={ScreenKey.HEALTH_RECORD}
        component={NewHealthRecord}
      />
      {/* <Stack.Screen  name={ScreenKey.TREATMENT_RECORD} component={TreatmentRecord} /> */}

      <Stack.Screen name={ScreenKey.CHATTING} component={Chatting} />
      <Stack.Screen name={ScreenKey.AI_CHATTING} component={AIChatting} />
      <Stack.Screen name={ScreenKey.LIST_MEMBER_APP} component={ListMembers} />
      <Stack.Screen name={ScreenKey.EDIT_CHATTING_ROOM} component={EditChat} />
      <Stack.Screen name={ScreenKey.INFO_ROOM_CHAT} component={InfoRoomChat} />

      {/* AFFILIATE */}
      <Stack.Screen name={ScreenKey.AFFILIATE} component={Affiliate} />
      <Stack.Screen
        name={ScreenKey.AFFILIATE_NOT_COLLAB}
        component={NotCollab}
      />
      <Stack.Screen
        name={ScreenKey.VERIFICATION_CTV}
        component={VerificationCTV}
      />
      <Stack.Screen
        name={ScreenKey.NEW_VERIFICATION_CTV}
        component={NewVerificationCTV}
      />
      <Stack.Screen
        name={ScreenKey.CURR_COLLAB_REQUEST}
        component={CurrCollaboratorRequest}
      />
      <Stack.Screen
        name={ScreenKey.LIST_BANK_FOR_WITHDRAW}
        component={ListBankForWithdraw}
      />
      <Stack.Screen name={ScreenKey.WITH_DRAW} component={WithDraw} />
      <Stack.Screen
        name={ScreenKey.UPDATE_PARTNER_INFO_BANK}
        component={UpdatePartnerInfoBank}
      />
      <Stack.Screen
        name={ScreenKey.HISTORY_LIA_TICKET}
        component={HistoryLiaTicket}
      />
      <Stack.Screen name={ScreenKey.COMMISSION} component={Commission} />
      <Stack.Screen name={ScreenKey.TEAMMATE} component={Teammate} />
      <Stack.Screen
        name={ScreenKey.AFFILIATE_SERVICE}
        component={AffiliateService}
      />
      <Stack.Screen
        name={ScreenKey.AFFILIATE_WALLET}
        component={AffiliateWallet}
      />
      <Stack.Screen name={ScreenKey.QA_AFFILIATE} component={QAAffiliate} />
      <Stack.Screen name={ScreenKey.RANKED} component={Ranked} />

      {/* Booking */}
      <Stack.Screen name={ScreenKey.BOOKING_MAIN} component={BookingMain} />
      {/* <Stack.Screen  name={ScreenKey.LIST_BRANCH} component={ListBranch} /> */}
      <Stack.Screen name={ScreenKey.DETAIL_BRAND} component={DetailBrand} />
      {/* <Stack.Screen
            
            name={ScreenKey.DETAIL_NEW_FEED}
            component={DetailNewFeed}
          /> */}
      <Stack.Screen name={ScreenKey.DETAIL_POST} component={DetailPost} />
      <Stack.Screen
        name={ScreenKey.SEARCH_NEW_FEED}
        component={NewFeedSearch}
      />

      <Stack.Screen
        name={ScreenKey.MY_PERSONAL_PAGE}
        component={MyPersonalPage}
      />
      <Stack.Screen
        name={ScreenKey.OTHER_PERSONAL_PAGE}
        component={OtherPersonalPage}
      />

      {/* <Stack.Screen  name={ScreenKey.LIST_DOCTOR} component={ListDoctor} /> */}
      {/* <Stack.Screen  name={ScreenKey.DETAIL_DOCTOR} component={DetailDoctor} /> */}
      <Stack.Screen name={ScreenKey.DETAIL_DOCTOR} component={DetailDoctor} />
      <Stack.Screen
        name={ScreenKey.DETAIL_PRACTITIONER}
        component={DetailPractitioner}
      />

      <Stack.Screen name={ScreenKey.VIDEO_REQUEST} component={VideoRequest} />
      <Stack.Screen
        name={ScreenKey.BOOKING_FOR_BRANCH}
        component={BookingForBranch}
      />
      <Stack.Screen
        name={ScreenKey.BOOKING_FOR_DOCTOR}
        component={BookingForDoctor}
      />
      <Stack.Screen name={ScreenKey.EDIT_BOOKING} component={EditBooking} />
      <Stack.Screen name={ScreenKey.DETAIL_BOOKING} component={DetailBooking} />
      {/* Diary */}
      <Stack.Screen
        name={ScreenKey.DIARY_OF_TREATMENT}
        component={DiaryOfTreatment}
      />
      <Stack.Screen name={ScreenKey.EDIT_DIARY} component={EditDiary} />
      {/* <Stack.Screen
                options={optionsModal}
                name={ScreenKey.PICK_SERVICE_TO_BOOKING}
                component={PickServiceToBooking}
              /> */}
      {/* -------- */}
      {/* Service */}
      <Stack.Screen name={ScreenKey.LIST_SERVICE} component={ListService} />
      <Stack.Screen name={ScreenKey.NEW_CATEGORY} component={NewCategory} />
      <Stack.Screen name={ScreenKey.LIST_PRODUCT} component={ListProduct} />
      <Stack.Screen name={ScreenKey.DETAIL_SERVICE} component={DetailService} />
      <Stack.Screen name={ScreenKey.STORAGE_VIDEO} component={StorageVideo} />
      <Stack.Screen
        name={ScreenKey.MATERIAL_SERVICE}
        component={ServiceMaterial}
      />
      <Stack.Screen
        name={ScreenKey.COMPARE_SERVICE}
        component={CompareService}
      />

      {/* -------- */}
      {/* Profile */}
      <Stack.Screen
        name={ScreenKey.EDIT_PROFILE}
        component={NewUpdateInfoUser}
      />
      {/* <Stack.Screen  name={ScreenKey.PICK_TREATMENT_TO_BOOKING} component={PickTreatmentDiary} /> */}

      {/* <Stack.Screen  name={ScreenKey.LIST_PARTNER_DIARY} component={ListDiary} /> */}
      {/* <Stack.Screen  name={ScreenKey.LIST_PARTNER_DIARY_CHILD} component={ListDiaryOfPartnerChild} /> */}
      <Stack.Screen
        name={ScreenKey.CREATE_PARTNER_DIARY_DAILY}
        component={CreateDiaryDaily}
      />
      <Stack.Screen
        name={ScreenKey.UPDATE_PARTNER_DIARY_DAILY}
        component={UpdateDiaryDaily}
      />

      <Stack.Screen name={ScreenKey.LIST_BOOKING} component={ListBooking} />
      <Stack.Screen name={ScreenKey.LIST_DEPOSIT} component={ListDeposit} />
      <Stack.Screen name={ScreenKey.LIST_PAYMENT} component={ListPayment} />
      <Stack.Screen name={ScreenKey.LIST_MEDICINE} component={ListMedicine} />
      <Stack.Screen
        name={ScreenKey.LIST_DEPOSIT_REQUEST}
        component={ListDepositRequest}
      />
      <Stack.Screen
        name={ScreenKey.LIST_ORDER_SERVICE}
        component={ListOrderService}
      />
      <Stack.Screen
        name={ScreenKey.LIST_TREATMENT_DETAIL}
        component={ListTreatmentDetail}
      />
      <Stack.Screen
        name={ScreenKey.PURCHASE_DEPOSIT_REQUEST}
        component={PurchaseDepositRequest}
      />

      {/* Lose Weight */}
      <Stack.Screen name={ScreenKey.LOSE_WEIGHT} component={LoseWeight} />
      <Stack.Screen
        name={ScreenKey.SETTING_LOSE_WEIGHT}
        component={SettingLoseWeight}
      />
      <Stack.Screen name={ScreenKey.ADD_FOOD} component={AddFood} />
      <Stack.Screen
        name={ScreenKey.LIST_FOOD_IN_MENU}
        component={ListFoodInMenu}
      />
      <Stack.Screen name={ScreenKey.ADDING_FOOD} component={AddingFood} />
      <Stack.Screen
        name={ScreenKey.ADDING_ACTIVITY}
        component={AddingActivity}
      />
      <Stack.Screen name={ScreenKey.DETAIL_FOOD} component={DetailFood} />
      <Stack.Screen
        name={ScreenKey.LIST_ACTIVITY_TO_ADD}
        component={ListActivityToAdd}
      />
      <Stack.Screen
        name={ScreenKey.DETAIL_ACTIVITY}
        component={DetailActivity}
      />
      <Stack.Screen name={ScreenKey.CHART_RP_CARLO} component={ChartRPCarlo} />
      <Stack.Screen
        name={ScreenKey.CHART_RP_WEIGHT}
        component={ChartRPWeight}
      />
      <Stack.Screen name={ScreenKey.QA_LOSE_WEIGHT} component={QALoseWeight} />
      <Stack.Screen name={ScreenKey.QA_SERVICE} component={QAService} />
      <Stack.Screen name={ScreenKey.MY_GOAL} component={MyGoal} />
      <Stack.Screen name={ScreenKey.WATER_GOAL} component={WaterGoal} />

      {/* SOCIAL ASSISTANCE */}
      <Stack.Screen name={ScreenKey.LIST_SP_SOCIAL} component={ListSpSocical} />
      <Stack.Screen
        name={ScreenKey.DETAIL_SP_SOCIAL}
        component={DetailSpSocial}
      />

      {/* -------- */}
      <Stack.Screen name={ScreenKey.LIST_NEWS} component={ListNews} />
      <Stack.Screen name={ScreenKey.DETAIL_NEWS} component={DetailNews} />
      <Stack.Screen
        name={ScreenKey.DETAIL_ENCYCLOPEDIA}
        component={DetailEncyclopedia}
      />

      <Stack.Screen
        name={ScreenKey.MODAL_COMMENT_POST_FROM_NOTIFI}
        component={CommentPostFromNotifi}
      />
      <Stack.Screen
        name={ScreenKey.DETAIL_SERVICE_PRODUCT}
        component={DetailServiceProduct}
      />
      <Stack.Screen name={ScreenKey.PRODUCT_LIST} component={ProductList} />

      <Stack.Screen name={ScreenKey.SETTING_APP} component={NewSettingApp} />

      <Stack.Screen
        name={ScreenKey.LIST_DIARY_BY_TYPE}
        component={ListDiaryByType}
      />
      <Stack.Screen
        name={ScreenKey.LIST_SERVICE_BY_KEY}
        component={ListServiceByKey}
      />

      <Stack.Screen name={ScreenKey.WHEEL_SPIN} component={NewWheelSpin} />

      <Stack.Screen name={ScreenKey.CREATE_BOOKING} component={CreateBooking} />
      {/* <Stack.Screen
                
                name={ScreenKey.CREATE_BOOKING}
                component={CreateBooking}
              /> */}
      <Stack.Screen
        name={ScreenKey.CREATE_BOOKING_FLASH_SALE}
        component={CreateBookingFlashSale}
      />
      <Stack.Screen
        name={ScreenKey.DETAIL_SERVICE_FLASH_SALE}
        component={DetailServiceFlashSale}
      />
      <Stack.Screen name={ScreenKey.LIST_VOUCHER} component={ListVoucher} />

      <Stack.Screen
        name={ScreenKey.LIST_ALL_HISTORY_TREATMENT}
        component={ListAllHistoryTreatment}
      />
      <Stack.Screen
        name={ScreenKey.SHARE_TO_SOCIAL}
        component={ShareToSocial}
      />

      <Stack.Screen
        name={ScreenKey.LIST_MY_ADDRESS}
        component={ListMyAddress}
      />
      <Stack.Screen
        name={ScreenKey.CREATE_NEW_ADDRESS}
        component={CreateNewAddress}
      />

      <Stack.Screen name={ScreenKey.LIA_UNI} component={LiAUni} />
      <Stack.Screen name={ScreenKey.LESSION} component={Lession} />
      <Stack.Screen name={ScreenKey.START_EXAM} component={StartExam} />

      {/* AUTH IN APP */}
      <Stack.Screen name={ScreenKey.LOGIN_IN_APP} component={LoginInApp} />
      <Stack.Screen
        name={ScreenKey.REGISTER_IN_APP}
        component={RegisterInApp}
      />
      <Stack.Screen
        name={ScreenKey.ACTIVATION_IN_APP}
        component={ActivationInApp}
      />
      <Stack.Screen
        name={ScreenKey.FILL_PHONE_TO_GET_NEW_PASS}
        component={FillPhoneToGetNewPass}
      />
      <Stack.Screen
        name={ScreenKey.GET_OTP_NEW_PASS}
        component={GetOtpNewPass}
      />

      {/* AI */}
      <Stack.Screen name={"FACE_AI"} component={FaceAI} />
      <Stack.Screen
        name={ScreenKey.RESULT_AI_SCAN_EYES}
        component={ResultAIScanEyes}
      />

      {/* NEW AFFILIATE */}
      <Stack.Screen name={ScreenKey.NEW_AFFILIATE} component={NewAffiliate} />
      <Stack.Screen name={ScreenKey.LIST_F1} component={ListF1} />
      <Stack.Screen name={ScreenKey.INFO_F1} component={InfoF1} />
      <Stack.Screen
        name={ScreenKey.ORDER_BOOKING_ALL_AFFILIATE}
        component={ListOrderBookingAll}
      />
      <Stack.Screen
        name={ScreenKey.QA_NEW_AFFILIATE}
        component={QANewAffiliate}
      />
      <Stack.Screen
        name={ScreenKey.INFO_WALLET_NEW_AFFILIATE}
        component={InfoWalletNewAffiliate}
      />
      <Stack.Screen name={ScreenKey.LIST_RANKED} component={ListRanked} />
      <Stack.Screen
        name={ScreenKey.RECHARGE_TO_WALLET}
        component={RechargeToWallet}
      />

      {/* LiA Voucher */}
      <Stack.Screen name={ScreenKey.LIA_VOUCHER} component={LiAVoucher} />
      <Stack.Screen
        name={ScreenKey.DETAIL_LIA_VOUCHER}
        component={DetailLiAVoucher}
      />
      <Stack.Screen name={ScreenKey.MY_VOUCHERS} component={MyVouchers} />
      <Stack.Screen
        name={ScreenKey.DETAIL_NEWS_VOUCHER}
        component={DetailNewsVoucher}
      />

      {/* MATERIAL */}
      <Stack.Screen
        name={ScreenKey.DETAIL_MATERIAL}
        component={DetailMaterial}
      />

      {/* BEAUTY INSURANCE */}
      <Stack.Screen
        name={ScreenKey.LIST_BEAUTY_INSURANCE}
        component={ListBeautyInsurance}
      />
      <Stack.Screen
        name={ScreenKey.DETAIL_BEAUTY_INSURANCE}
        component={DetailBeautyInsurance}
      />

      {/* SCREEN FOR RENDER HTML */}
      <Stack.Screen name={ScreenKey.SCREEN_HTML} component={ScreenHTML} />

      {/* RELATIVES PROFILE */}
      <Stack.Screen
        name={ScreenKey.LIST_RELATIVES_PROFILE}
        component={ListRelativesProfile}
      />
      <Stack.Screen name={ScreenKey.RELATIVES_INFO} component={RelativesInfo} />
      <Stack.Screen name={ScreenKey.DOCTOR_LIST} component={DoctorList} />
      <Stack.Screen
        name={ScreenKey.PRACTITIONER_LIST}
        component={PractitionerList}
      />
      <Stack.Screen name={ScreenKey.BRANCH_LIST} component={BranchList} />
      <Stack.Screen name={ScreenKey.SERVICE_LIST} component={ServiceList} />
      <Stack.Screen name={ScreenKey.MATERIAL_LIST} component={MaterialList} />

      <Stack.Screen name={ScreenKey.SEARCHING_HOME} component={SearchingHome} />

      {/* TAKE CARE AFTER TREATMENT */}
      <Stack.Screen name={ScreenKey.TAKECARE} component={TakeCare} />
      <Stack.Screen
        name={ScreenKey.UPDATE_DAILY_DIARIES}
        component={UpdateDailyDiaries}
      />

      {/* CHARITY */}
      <Stack.Screen name={ScreenKey.CHARITY} component={Charity} />
      <Stack.Screen
        name={ScreenKey.SEARCHING_CHARITY}
        component={SearchingCharity}
      />
      <Stack.Screen
        name={ScreenKey.CHARITY_ACCOUNT_STATEMENT}
        component={CharityAccountStatement}
      />
      <Stack.Screen
        name={ScreenKey.CHARITY_LIST_OUTSTANDING}
        component={ListOutstanding}
      />
      <Stack.Screen
        name={ScreenKey.CHARITY_RESULT_FILTER_CASH_FLOW}
        component={ResultFilter}
      />
      <Stack.Screen name={ScreenKey.CHARITY_COMPANION} component={Companion} />
      <Stack.Screen name={ScreenKey.CHARITY_DONATION} component={Donation} />
      <Stack.Screen
        name={ScreenKey.CHARITY_INFO_CO_FOUNDER}
        component={InfoCoFounder}
      />
      <Stack.Screen
        name={ScreenKey.CHARITY_LIST_COMPANION}
        component={ListCompanion}
      />

      <Stack.Screen name={ScreenKey.LIST_PARTNER_DIARY} component={ListDiary} />
      <Stack.Screen name={ScreenKey.SKIN_MIRROR_AI} component={SkinMirrorAI} />

      {/* PARTNER REVIEW SERVICE */}
      <Stack.Screen
        name={ScreenKey.PARTNER_REVIEW_SERVICE}
        component={PartnerReviewService}
      />

      {/* EXAMINATION RESULTS */}
      <Stack.Screen
        name={ScreenKey.LIST_EXAMINATION_RESULTS}
        component={ListExaminationResults}
      />
      <Stack.Screen
        name={ScreenKey.DETAIL_EXAMINATION_RESULT}
        component={DetailExaminationResult}
      />

      <Stack.Group
        screenOptions={{
          presentation: isAndroid ? "fullScreenModal" : undefined,
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          name={ScreenKey.VERTICAL_VIDEO_PLAYER}
          component={VerticalVideoPlayer}
        />
        <Stack.Screen
          name={ScreenKey.MODAL_CREATE_GROUP_CHAT}
          component={ModalCreateGroupChat}
        />
        <Stack.Screen
          name={ScreenKey.ADD_MEMBERS_TO_GROUP_CHAT}
          component={ModalAddMemberToGroupChat}
        />
        <Stack.Screen name={ScreenKey.LIST_COMMENTS} component={ListComments} />

        <Stack.Screen name={ScreenKey.INFO_BOOKING} component={InfoBooking} />
        <Stack.Screen name={ScreenKey.INFO_MATERIAL} component={InfoMaterial} />
        <Stack.Screen
          name={ScreenKey.LIST_SERVICE_COMPARE}
          component={ListServiceCompare}
        />
        <Stack.Screen
          name={ScreenKey.MODAL_LIST_DIARY}
          component={ModalListDiary}
        />

        <Stack.Screen
          name={ScreenKey.PICK_SERVICE_TO_BOOKING}
          component={PickServiceToBooking}
        />
        <Stack.Screen
          name={ScreenKey.CREATE_NEW_FEED}
          component={CreateNewFeed}
        />
        <Stack.Screen name={ScreenKey.EDIT_NEW_FEED} component={EditNewFeed} />
        <Stack.Screen
          name={ScreenKey.MODAL_COMMENT_POST}
          component={ModalCommentPost}
        />
        <Stack.Screen
          name={ScreenKey.MODAL_SERVICE_REVIEW}
          component={ModalServiceReview}
        />
        <Stack.Screen
          name={ScreenKey.MODAL_BOOKING_REVIEW}
          component={ModalBookingReview}
        />

        <Stack.Screen name={ScreenKey.VIDEO_CALL} component={VideoCall} />
        <Stack.Screen name={ScreenKey.VOICE_CALL} component={VoiceCall} />
        <Stack.Screen name={ScreenKey.QR_CODE} component={NewQRCode} />
        <Stack.Screen
          name={ScreenKey.PICK_UTILITIES}
          component={PickUtilities}
        />

        <Stack.Screen
          name={ScreenKey.FEED_BACK_BRANCH}
          component={FeedBackBranch}
        />
        <Stack.Screen
          name={ScreenKey.FEED_BACK_DOCTOR}
          component={FeedBackDoctor}
        />
        <Stack.Screen
          name={ScreenKey.FEED_BACK_SERVICE}
          component={FeedBackService}
        />
        <Stack.Screen
          name={ScreenKey.CHARITY_ACCOUNT_MODAL_FILTER}
          component={ModalFilter}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default withHost(RootNavigator);
