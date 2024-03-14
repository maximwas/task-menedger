<template>
  <div class="row">
    <RowLetter
      v-for="index in 5"
      v-bind="getLetter(index)"
      :key="rowLetters[index - 1]?.id || uniqueId()"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useEventListener } from '@vueuse/core';

import RowLetter from '@/components/RowLetter.vue';

import { StateRowLetter } from '@/types';
import type { PropsRowLetters, IRowLetter } from '@/types';

import { useWord } from '@/stores/word';

const props = withDefaults(defineProps<PropsRowLetters>(), {
  disabled: true,
});
const emit = defineEmits(['correct', 'incorrect']);

const store = useWord();
const { setItemInHistory } = store;
const { answer } = storeToRefs(store);
const rowLetters = reactive<IRowLetter[]>([]);

const cleanupForAddLetter = useEventListener(document, 'keydown', handlerKeydown(addLetter));
const cleanupForDeleteLetter = useEventListener(document, 'keydown', handlerKeydown(deleteLetter));
const cleanupForCheckAccuracyWord = useEventListener(document, 'keydown', handlerKeydown(checkAccuracyWord));

function uniqueId(): string {
  return Math.random().toString(36).substring(2);
}

function getLetter(index: number) {
  const defaultLetter = {
    id: uniqueId(),
    value: '',
    state: StateRowLetter.DEFAULT,
  };

  return rowLetters[index - 1] || defaultLetter;
}

function handlerKeydown(callback: (key: string) => void) {
  return (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();

    if (!props.disabled) {
      callback(key);
    }
  };
}

function addLetter(key: string) {
  const isUaAlphabetic = key >= 'а' && key <= 'я';

  if (isUaAlphabetic && rowLetters.length < 5) {
    rowLetters.push({
      id: uniqueId(),
      value: key,
      state: StateRowLetter.DEFAULT,
    });
  }
}

function deleteLetter(key: string) {
  const isBackspaceOrDelete = key === 'backspace' || key === 'delete';

  if (isBackspaceOrDelete) {
    rowLetters.pop();
  }
}

function checkAccuracyWord(key: string) {
  const isEnter = key === 'enter';

  if (isEnter && rowLetters.length === 5) {
    cleanupForAddLetter();
    cleanupForDeleteLetter();
    cleanupForCheckAccuracyWord();
    checkValidAnswer();
    checkRowLettersCorrect();
    setItemInHistory(rowLetters);
  }
}

function checkValidAnswer() {
  const answerLetter = answer.value.split('');

  rowLetters.forEach((letter, index) => {
    if (!answerLetter.includes(letter.value)) {
      letter.state = StateRowLetter.ABSENT;

      return;
    }

    if (letter.value === answerLetter[index]) {
      letter.state = StateRowLetter.CORRECT;

      return;
    }

    letter.state = StateRowLetter.ELSEWHERE;
  });
}

function checkRowLettersCorrect() {
  const isCorrect = rowLetters.every((letter) => letter.state === StateRowLetter.CORRECT);

  if (isCorrect) {
    return emit('correct', props.order);
  }

  return emit('incorrect', props.order);
}

</script>

<style scoped>
.row {
  display: flex;
  margin: 5px 0;
}
</style>
