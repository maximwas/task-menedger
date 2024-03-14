export interface PropsRowLetters {
  disabled?: boolean;
  keyCode?: string;
}

export interface PropsRowLetter {
  value: string;
  state: StateRowLetter;
}

export interface IRowLetters extends PropsRowLetters {
  id: string;
}

export interface IRowLetter extends PropsRowLetter {
  id: string;
}

export enum StateRowLetter {
  ABSENT = 'absent',
  DEFAULT = 'default',
  CORRECT = 'correct',
  ELSEWHERE = 'elsewhere',
}
