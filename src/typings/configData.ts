
export enum ConfigDataCode {
  BankName = "BANK_NAME",
  BankNumber = "BANK_NUMBER",
  BankOwner = "BANK_OWNER",
  WheelRule = "WHEEL_RULE",
  LevelPolicy = "LEVEL_POLICY",
  FlashSaleRule = "FLASH_SALE_RULE",
  CollaborationForm = "COLLABORATION_FORM",
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
