<template>
  <div class="row">
    <RowLetter
      v-for="rowLetter in rowLetters"
      :key="rowLetter.id"
      :value="rowLetter.value"
      :state="rowLetter.state"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue';
import { storeToRefs } from 'pinia';

import { StateRowLetter } from '@/types';
import type { PropsRowLetters, IRowLetter } from '@/types';

import { useWord } from '@/stores/word';
import { uniqueId } from '@/utils';

import RowLetter from '@/components/RowLetter.vue';

const props = withDefaults(defineProps<PropsRowLetters>(), {
  disabled: true,
});
const emit = defineEmits(['correct', 'incorrect']);

const store = useWord();
const { setItemInHistory } = store;
const { answer } = storeToRefs(store);

const currentRowLetterIndex = ref<number>(0);
const rowLetters = reactive<IRowLetter[]>(getFillRowLetters());

watch(() => props.keyCode, (keyCode) => {
  if (keyCode) {
    addLetter(keyCode);
    deleteLetter(keyCode);
    checkAccuracyWord(keyCode);
  }
});

function getFillRowLetters() {
  return [...new Array(5)].map(() => ({
    id: uniqueId(),
    value: '',
    state: StateRowLetter.DEFAULT,
  }));
}

function addLetter(keyCode: string) {
  const key = getKeyWithoutId(keyCode);
  const isUaAlphabetic = key >= 'а' && key <= 'я';

  if (isUaAlphabetic && currentRowLetterIndex.value !== 5) {
    rowLetters[currentRowLetterIndex.value].value = key;
    currentRowLetterIndex.value += 1;
  }
}

function deleteLetter(keyCode: string) {
  const key = getKeyWithoutId(keyCode);
  const isBackspaceOrDelete = key === 'backspace' || key === 'delete';

  if (isBackspaceOrDelete && currentRowLetterIndex.value !== 0) {
    rowLetters[currentRowLetterIndex.value - 1].value = '';
    currentRowLetterIndex.value -= 1;
  }
}

function checkAccuracyWord(keyCode: string) {
  const key = getKeyWithoutId(keyCode);
  const isEnter = key === 'enter';

  if (isEnter && currentRowLetterIndex.value === 5) {
    currentRowLetterIndex.value = 0;

    checkValidAnswer();
    checkRowLettersCorrect();
    setItemInHistory(rowLetters);
  }
}

function getKeyWithoutId(keyCode: string) {
  return keyCode.split('_')[0];
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
    return emit('correct');
  }

  return emit('incorrect');
}

</script>

<style scoped>
.row {
  display: flex;
  margin: 5px 0;
}
</style>
