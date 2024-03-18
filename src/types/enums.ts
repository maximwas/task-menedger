export const StateRowLetter = {
  ABSENT: 'absent',
  DEFAULT: 'default',
  CORRECT: 'correct',
  ELSEWHERE: 'elsewhere',
} as const;

export type ValueOf<T> = T[keyof T];
export type EnumStateRowLetter = ValueOf<typeof StateRowLetter>;
