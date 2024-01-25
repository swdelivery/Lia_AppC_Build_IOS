import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import userReducer from "./index";
import infoUserReducer, { State as UserState } from "./InfoUserReducer";
import membersReducer from "./MembersReducer";
import messageReducer from "./MessageReducer";
import networkReducer from "./NetworkReducer";
import notificationReducer from "./NotificationReducer";
import postReducer from "./PostsReducer";
import revenueAndCostReducer from "./RevenueAndCostReducer";
import taskReducer from "./TaskReducer";
import serviceReducer from "./ServiceReducer";
import bookingReducer from "./BookingReducer";
import infoReducer from "./InfoReducer";
import ortherReducer from "./OrtherReducer";
import branchReducer from "./BranchReducer";
import doctorReducer from "./DoctorReducer";
import productReducer from "./ProductReducer";
import productGroupReducer from "./ProductGroupReducer";
import diaryReducer from "./DiaryReducer";
import loseWeightReducer from "./LoseWeightReducer";
import newsReducer from "./NewsReducer";
import partnerDiaryReducer from "./PartnerDiaryReducer";
import walletReducer from "./WalletReducer";
import affiliateReducer from "./AffiliateReducer";
import branch from "../branch/reducers";
import service from "../service/reducers";
import doctor from "../doctor/reducers";
import practitioner from "../practitioner/reducers";
import booking from "../booking/reducers";
import user from "../user/reducers";
import voucher from "../voucher/reducers";
import insurance from "../insurance/reducers";
import chat from "../chat/reducers";
import flashSale from "../flashSale/reducers";
import { resetable } from "@Redux/resettableReducer";
import modal from "../modal/reducers";
import resultcanningeyes from "../resultcanningeyes/reducers";
import relatives from "../relatives/reducers";
import aichat from "../aichat/reducers";
import material from "../material/reducers";
import newfeeds from "../newfeeds/reducers";
import wallet from "../wallet/reducers";
import takecare from "../takecare/reducers";
import category from "../category/reducers";
import charity from "../charity/reducers";
import qrCheckin from "../qrCheckin/reducers";
import wheelSpin from "../wheelSpin/reducers";
import affiliate from "../affiliate/reducers";
import product from "../product/reducers";
import otp from "../otp/reducers";
import news from "../news/reducers";
import imageVoucher from "../imageVoucher/reducers";
import aboutLiA from "../aboutLiA/reducers";
import examinationResults from "../examinationResults/reducers";
import memberFirstMission from "../memberFirstMission/reducers";
import { PersistConfig, persistReducer } from "redux-persist";
import { reduxStorage } from "@Redux/reduxStorage";

const userConfig: PersistConfig<UserState> = {
  key: "infoUser",
  storage: reduxStorage,
};
const newsConfig: PersistConfig<any> = {
  key: "listNews",
  storage: reduxStorage,
};
const imageVoucherConfig: PersistConfig<any> = {
  key: "imageVoucher",
  storage: reduxStorage,
};

const rootReducer = combineReducers({
  infoUserReducer: resetable(persistReducer(userConfig, infoUserReducer)),
  user: resetable(user),
  newsReducer,
  productGroupReducer,
  productReducer,
  doctorReducer,
  branchReducer,
  userReducer,
  taskReducer,
  authReducer,
  membersReducer,
  networkReducer,
  messageReducer,
  notificationReducer,
  postReducer,
  revenueAndCostReducer,
  serviceReducer,
  bookingReducer,
  infoReducer,
  ortherReducer,
  diaryReducer,
  loseWeightReducer,
  partnerDiaryReducer,
  walletReducer,
  affiliateReducer,

  branch,
  service,
  doctor,
  practitioner,
  material,
  booking,
  voucher,
  insurance,
  chat: resetable(chat),
  flashSale,
  modal,
  resultcanningeyes,
  relatives,
  aichat,
  newfeeds,
  wallet,
  takecare,
  category,
  charity,
  qrCheckin,
  wheelSpin,
  affiliate,
  product,
  otp,
  news: persistReducer(newsConfig, news),
  imageVoucher: persistReducer(imageVoucherConfig, imageVoucher),
  aboutLiA,
  examinationResults,
  memberFirstMission
});

// const rootReducer = (state, action) => {
//     if (action.type === 'USER_LOGOUT') {
//         state = undefined
//     }

//     return appReducer(state, action)
// }

// export default rootReducer;
export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
