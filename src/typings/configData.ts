
export enum ConfigDataCode {
  BankName = "BANK_NAME",
  BankNumber = "BANK_NUMBER",
  BankOwner = "BANK_OWNER",
  WheelRule = "WHEEL_RULE",
}

export type ConfigData = {
  _id: string;
  code: string;
  value: string;
  id: string;
};
