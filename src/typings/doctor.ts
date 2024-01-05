import { Branch, BranchService } from "./branch";
import { FileAvatar, FileUpload, Timestamp } from "./common";

export type Doctor = {
  treatmentQueueId: any;
  treatmentDetailId: any;
  branchCodeArr: string[];
  isSupporter: boolean;
  supportForTreatmentDoctorCode: any;
  newsIdArr: any[];
  status: "BUSY";
  reviewCount: number;
  averageRating: number;
  representationFileIdArr: any[];
  countPartner: number;
  orderNumber: number;
  isDisplayed: boolean;
  serviceDoctorCodeArr: any[];
  isActive: boolean;
  isDelete: boolean;
  _id: string;
  code: string;
  name: string;
  userId: string;
  branchCode: string;
  userCreate: string;
  __v: number;
  userUpdate: string;
  experience: string;
  position: string;
  service: string;
  specialization: string;
  trainingProcess: string;
  workPlace: string;
  description: string;
  avatar: FileAvatar;
  representationFileArr: FileAvatar[];
  treatmentDoctorFileArr: FileUpload[];
  branch: Branch;
  branchArr: Branch[];
  id: string;
  doctorServices: BranchService[];
  questionVideoDoctorArr: any[];
} & Timestamp;
