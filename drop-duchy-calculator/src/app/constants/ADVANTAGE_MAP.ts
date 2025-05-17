import {UnitType} from "../enums/UnitType";

export const ADVANTAGE_MAP: Record<UnitType, UnitType | null> = {
  [UnitType.SWORD]: UnitType.ARROWS,
  [UnitType.ARROWS]: UnitType.AXE,
  [UnitType.AXE]: UnitType.SWORD,
  [UnitType.BOSS]: null
};

