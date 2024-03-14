<template>
  <div id="game">
    <RowLetters
      v-for="rowLetter in rowLetters"
      :key="rowLetter.id"
      :disabled="rowLetter.disabled"
      :key-code="rowLetter.keyCode"
      @incorrect="incorrect"
      @correct="correct"
    />
  </div>
</template>

<script setup lang="ts">
import { onDeactivated, reactive, ref } from 'vue';
import { useEventListener } from '@vueuse/core';

import { uniqueId } from '@/utils';

import RowLetters from '@/components/RowLetters.vue';
import type { IRowLetters } from './types';

const currentRowLetter = ref<number>(0);
const rowLetters = reactive<IRowLetters[]>([
  { id: uniqueId(), disabled: false },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
  { id: uniqueId() },
]);

const cleanup = useEventListener(document, 'keydown', handlerKeydown);

function handlerKeydown(event: KeyboardEvent) {
  const key = event.key.toLowerCase();

  if (currentRowLetter.value < rowLetters.length) {
    rowLetters[currentRowLetter.value].keyCode = `${key}_${uniqueId()}`;
  } else {
    cleanup();
  }
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
  cleanup();
}

onDeactivated(cleanup);
</script>

<style scoped>
</style>
