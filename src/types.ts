export interface PropsRowLetters {
  disabled?: boolean;
  keyCode?: string;
  order: number;
}

export enum StateRowLetter {
  ABSENT = 'absent',
  DEFAULT = 'default',
  CORRECT = 'correct',
  ELSEWHERE = 'elsewhere',
}

export interface PropsRowLetter {
  id: string;
  value: string;
  state: StateRowLetter;
}

export type IRowLetter = PropsRowLetter;
