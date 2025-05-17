import {UnitType} from "../enums/UnitType";
import {Owner} from "../enums/Owner";

export type Unit = {
  unitType: UnitType;
  power: number;
  owner: Owner;
}
