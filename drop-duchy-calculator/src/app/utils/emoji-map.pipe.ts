import { Pipe, PipeTransform } from '@angular/core';
import {UnitType} from "../enums/UnitType";
import {EMOJI_MAP} from "../constants/EMOJI_MAP";

@Pipe({standalone: true, name: 'emojiMap'})
export class EmojiMapPipe implements PipeTransform {
  transform(value: UnitType): string {
    return EMOJI_MAP[value as UnitType] || '';
  }
}
