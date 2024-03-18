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
import {
  reactive, watch, ref, computed, toValue,
} from 'vue';
import { storeToRefs } from 'pinia';

import {
  StateRowLetter, type PropsRowLetters, type IRowLetter, type Word,
} from '@/types';

import { useWord } from '@/stores/word';
import { uniqueId } from '@/utils';

import RowLetter from '@/components/RowLetter.vue';

const props = withDefaults(defineProps<PropsRowLetters>(), {
  disabled: true,
  keyCode: '',
});
const emit = defineEmits(['correct', 'incorrect', 'incorrect-word']);

const store = useWord();
const { setItemInHistory, isHaveThisWord } = store;
const { answer } = storeToRefs(store);

const currentRowLetterIndex = ref<number>(0);
const rowLetters = reactive<IRowLetter[]>(getFillRowLetters());
const word = computed<Word>(() => rowLetters.map((rowLetter) => rowLetter.value).join(''));

watch(() => props.keyCode, (keyCode) => {
  const key = getKeyWithoutId(keyCode);
  const isEnter = key === 'enter';
  const isUaAlphabetic = /[а-яА-ЯЄєІіЇїҐґ]/.test(key);
  const isBackspaceOrDelete = key === 'backspace' || key === 'delete';

  if (isEnter) {
    checkAccuracyWord();
  } else if (isBackspaceOrDelete) {
    deleteLetter();
  } else if (isUaAlphabetic) {
    addLetter(key);
  }
});

function getFillRowLetters() {
  return [...new Array(5)].map(() => ({
    id: uniqueId(),
    value: '',
    state: StateRowLetter.DEFAULT,
  }));
}

function addLetter(key: string) {
  if (currentRowLetterIndex.value !== 5) {
    rowLetters[currentRowLetterIndex.value].value = key;
    currentRowLetterIndex.value += 1;
  }
  return null;
}

function deleteLetter() {
  if (currentRowLetterIndex.value !== 0) {
    rowLetters[currentRowLetterIndex.value - 1].value = '';
    currentRowLetterIndex.value -= 1;
  }

  return null;
}

function checkAccuracyWord() {
  const isHaveWord = isHaveThisWord(toValue(word));

  if (currentRowLetterIndex.value === 5) {
    if (!isHaveWord) {
      return emit('incorrect-word');
    }

    currentRowLetterIndex.value = 0;

    checkValidAnswer();
    checkRowLettersCorrect();
    setItemInHistory(rowLetters);
  }

  return null;
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
  margin: 7px 0;
}
</style>
