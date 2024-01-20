
export enum ConfigDataCode {
  BankName = "BANK_NAME",
  BankNumber = "BANK_NUMBER",
  BankOwner = "BANK_OWNER",
  WheelRule = "WHEEL_RULE",
  LevelPolicy = "LEVEL_POLICY",
  FlashSaleRule = "FLASH_SALE_RULE",
  MedicalHistory = "TSBTK",
  PolicyRefund = "POLICY_REFUND"
}

export type ConfigData = {
  _id: string;
  code: string;
  value: string;
  id: string;
};
