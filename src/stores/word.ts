import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';

import type { IRowLetter, Answer, Word } from '@/types';

import { binarySearch, getRandomNumber } from '@/utils';
import { words } from '../words.json';

export const useWord = defineStore('word', () => {
  const answer = ref<Answer>('');
  const history = reactive<IRowLetter[][]>([]);

  function setItemInHistory(rowLetters: IRowLetter[]) {
    history.push(rowLetters);
  }

  function getItemInHistory(index: number): IRowLetter[] {
    return history[index];
  }

  function setWold(): void {
    const randomNumber = getRandomNumber(0, words.length);
    answer.value = words[randomNumber];
  }

  function isHaveThisWord(word: Word): boolean {
    return Boolean(binarySearch(words, word, 0, words.length));
  }

  return {
    answer,
    history,

    setWold,
    isHaveThisWord,
    setItemInHistory,
    getItemInHistory,
  };
});
