<template>
  <div id="game">
    <div class="game-wrapper">
      <RowLetters
        v-for="rowLetter in rowLetters"
        :key="rowLetter.id"
        :disabled="rowLetter.disabled"
        :key-code="rowLetter.keyCode"
        @incorrect-word="incorrectWord"
        @incorrect="incorrect"
        @correct="correct"
      />

      <ModalWrapper :open="stateCorrectModal" @close="closeCorrectModal">
        Ви відгадали слово
      </ModalWrapper>

      <ModalWrapper :open="stateIncorrectWord" @close="closeIncorrectWord">
        Слово не було знайдено!
      </ModalWrapper>
    </div>

    <KeyBoard @keydown="handlerKeydown" />
  </div>
</template>

<script setup lang="ts">
import {
  onDeactivated, reactive, ref, onMounted,
} from 'vue';
import { useEventListener } from '@vueuse/core';

import RowLetters from '@/components/RowLetters.vue';
import ModalWrapper from '@/components/ModalWrapper.vue';

import { uniqueId } from '@/utils';
import { useWord } from '@/stores/word';

import { type IKeyBoard, type IRowLetters } from '@/types';
import KeyBoard from './components/KeyBoard.vue';

const currentRowLetter = ref<number>(0);
const rowLetters = reactive<IRowLetters[]>([
  { id: uniqueId(), disabled: false },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
]);
const stateCorrectModal = ref<boolean>(false);
const stateIncorrectWord = ref<boolean>(false);
const { setWold } = useWord();

const cleanup = useEventListener(document, 'keydown', handlerKeydown);

function handlerKeydown(event: KeyboardEvent | IKeyBoard) {
  const key = event.key.toLowerCase();

  if (currentRowLetter.value < rowLetters.length) {
    rowLetters[currentRowLetter.value].keyCode = `${key}_${uniqueId()}`;
  } else {
    cleanup();
  }
}

function incorrectWord() {
  stateIncorrectWord.value = true;
}

function incorrect() {
  const nextIndex = currentRowLetter.value + 1;

  if (nextIndex < rowLetters.length) {
    rowLetters[nextIndex].disabled = false;
  }

  rowLetters[currentRowLetter.value].disabled = true;
  currentRowLetter.value = nextIndex;
}

function correct() {
  stateCorrectModal.value = true;

  cleanup();
}

function closeCorrectModal() {
  stateCorrectModal.value = false;
}

function closeIncorrectWord() {
  stateIncorrectWord.value = false;
}

onMounted(setWold);
onDeactivated(cleanup);
</script>

<style scoped>
#game {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
}
</style>
