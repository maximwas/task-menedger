<template>
  <div id="game">
    <RowLetters
      v-for="(rowLetter, index) in rowLetters"
      :key="rowLetter.id"
      :disabled="rowLetter.disabled"
      :order="index"
      @incorrect="incorrect"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import RowLetters from '@/components/RowLetters.vue';

const rowLetters = reactive([
  { id: uniqueId(), disabled: false },
  { id: uniqueId(), disabled: true },
  { id: uniqueId(), disabled: true },
  { id: uniqueId(), disabled: true },
  { id: uniqueId(), disabled: true },
  { id: uniqueId(), disabled: true },
]);

function uniqueId(): string {
  return Math.random().toString(36).substring(2);
}

function incorrect(index: number) {
  const nextIndex = index + 1;

  if (nextIndex < rowLetters.length) {
    rowLetters[nextIndex].disabled = false;
  }

  rowLetters[index].disabled = true;
}
</script>

<style scoped>
</style>
