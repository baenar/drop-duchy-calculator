import {Component} from '@angular/core';
import {Unit} from "./types/Unit";
import {UnitType} from "./enums/UnitType";
import {Owner} from "./enums/Owner";
import {ADVANTAGE_MAP} from "./constants/ADVANTAGE_MAP";
import {generatePermutations} from "./utils/generatePermutations";
import {isUnitTypeKeyGuard} from "./utils/isUnitTypeKeyGuard";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {EMOJI_MAP} from "./constants/EMOJI_MAP";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {EmojiMapPipe} from "./utils/emoji-map.pipe";
import {ConfirmModalComponent} from "./confirm-modal/confirm-modal.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {LoadingSpinnerComponent} from "./loading-spinner/loading-spinner.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'main-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatFormField,
    MatFormFieldModule,
    MatOption,
    MatSelect,
    MatIcon,
    MatTable,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatSort,
    MatCellDef,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatHeaderRowDef,
    MatButton,
    MatInput,
    EmojiMapPipe,
    ConfirmModalComponent,
    MatProgressSpinner,
    LoadingSpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  newUnit: Partial<Unit> = {};
  units: Unit[] = [];
  unitsLimitHit = false;
  dataSource = new MatTableDataSource<Unit>([]);
  bestPermutation: Unit[] | null = null;
  bannerStrength: number = 0;
  expectedScore: number = 0;
  showConfirmModal = false;
  showLoadingSpinner = false;

  displayedColumns = ['id', 'unitType', 'owner', 'power', 'remove'];

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.calculateBestPermutation();
  }

  addUnit = () => {
    if (this.newUnit.unitType && this.newUnit.owner && this.newUnit.power) {
      const newUnit: Unit = {
        unitType: UnitType.SWORD,
        owner: Owner.PLAYER,
        power: 5
      };

      this.dataSource.data = [...this.dataSource.data, newUnit];
      this.units = this.dataSource.data;
      this.newUnit = {};

      if (this.units.length >= 10) {
        this.showSnackBar();
        this.unitsLimitHit = true
      }
    }
  }


  removeUnit = (unit: Unit) => {
    this.dataSource.data = this.dataSource.data.filter(u => u !== unit);
    this.units = this.units.filter(u => u !== unit);
    this.unitsLimitHit = false;
  }

  calculatePower(permutation: Unit[]): number {
    let currentPower = 0;
    let currentType: UnitType | null = null;
    let currentOwner: Owner | null = null;

    for (const unit of permutation) {
      if (currentPower === 0) {
        currentPower = unit.power;
        currentType = unit.unitType;
        currentOwner = unit.owner;
      } else {
        if (currentOwner === unit.owner) {
          let bannerBonus = 0;
          if (unit.unitType === currentType && currentOwner === Owner.PLAYER) {
            bannerBonus += this.bannerStrength;
          }

          if (unit.power >= currentPower) {
            currentType = unit.unitType;
          }

          currentPower += unit.power + bannerBonus;
        } else {
          const attackerType: UnitType = currentType!;
          const defenderType: UnitType = unit.unitType;

          let attacker = currentPower;
          let defender = unit.power;

          if (ADVANTAGE_MAP[attackerType] === defenderType) {
            attacker = Math.floor(attacker * 1.5);
          } else if (isUnitTypeKeyGuard(defenderType) && ADVANTAGE_MAP[defenderType] === attackerType) {
            defender = Math.floor(defender * 1.5);
          }

          const result = attacker - defender;

          if (result > 0) {
            currentPower = result;
            if (ADVANTAGE_MAP[attackerType] === defenderType) {
              currentPower = Math.floor(currentPower / 1.5);
            }
          } else if (result < 0) {
            currentPower = -result;
            if (isUnitTypeKeyGuard(defenderType) && ADVANTAGE_MAP[defenderType] === attackerType) {
              currentPower = Math.floor(currentPower / 1.5);
            }
            currentType = defenderType;
            currentOwner = unit.owner;
          } else {
            currentPower = 0;
          }
        }
      }
    }

    return currentOwner === Owner.ENEMY ? -currentPower : currentPower;
  }

  calculateBestPermutation(): void {
    this.showLoadingSpinner = true;

    setTimeout(() => {
      const permutations = generatePermutations(this.units);
      let maxScore = -Infinity;

      for (const perm of permutations) {
        const score = this.calculatePower(perm);
        if (score > maxScore) {
          maxScore = score;
          this.bestPermutation = [...perm];
        }
      }

      this.expectedScore = maxScore;
      this.showLoadingSpinner = false;
    }, 0);
  }


  onCalculateClicked() {
    this.calculateBestPermutation();
  }

  showSnackBar() {
    this.snackBar.open('Reached maximal number of units', '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  // MODAL SCRAPPED FOR NOW
  // IF BETTER ALGORITHM FOUND, MAYBE I'LL BRING IT BACK
  onModalCancel() {
    this.showConfirmModal = false;
  }

  onModalProceed() {
    this.showConfirmModal = false;
    this.calculateBestPermutation();
  }

  protected readonly UnitType = UnitType;
  protected readonly Owner = Owner;
  protected readonly Object = Object;

  protected readonly EMOJI_MAP = EMOJI_MAP;
}
