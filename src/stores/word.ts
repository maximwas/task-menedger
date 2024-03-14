import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import type { IRowLetter } from '@/types';

export const useWord = defineStore('word', () => {
  const answer = ref<string>('койот');
  const history = reactive<IRowLetter[][]>([]);

  function setItemInHistory(rowLetters: IRowLetter[]) {
    history.push(rowLetters);
  }

  function getItemInHistory(index: number): IRowLetter[] {
    return history[index];
  }

  return {
    answer,
    history,

    setItemInHistory,
    getItemInHistory,
  };
});
