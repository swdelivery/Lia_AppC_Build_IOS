export enum ConfigDataCode {
  BankName = "BANK_NAME",
  BankNumber = "BANK_NUMBER",
  BankOwner = "BANK_OWNER",
  WheelRule = "WHEEL_RULE",
  LevelPolicy = "LEVEL_POLICY",
  FlashSaleRule = "FLASH_SALE_RULE",
  MedicalHistory = "TSBTK",
  PolicyRefund = "POLICY_REFUND",
  CollaborationForm = "COLLABORATION_FORM",
  PolicyMissionNewUser = "POLICY_MISSION_NEW_USER"
}

export type ConfigDataValue =
  | string
  | {
    item: string;
  };

export type ConfigData = {
  _id: string;
  code: string;
  value: any;
  id: string;
  name: string;
  description: string;
};
