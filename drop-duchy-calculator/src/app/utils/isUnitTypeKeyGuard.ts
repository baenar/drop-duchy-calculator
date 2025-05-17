import {UnitType} from "../enums/UnitType";

export const isUnitTypeKeyGuard = (key: any): key is UnitType =>
  Object.values(UnitType).includes(key);
