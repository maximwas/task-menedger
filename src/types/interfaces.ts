import type { EnumStateRowLetter } from './enums';

export interface PropsRowLetters {
  disabled?: boolean;
  keyCode?: string;
}

export interface PropsRowLetter {
  value: string;
  state: EnumStateRowLetter;
}

export interface PropsModal {
  open: boolean;
  timeout?: number;
}

export interface IKeyBoard {
  id: string;
  key: string;
  state: EnumStateRowLetter;
}

export interface IRowLetters extends PropsRowLetters {
  id: string;
}

export interface IRowLetter extends PropsRowLetter {
  id: string;
}
