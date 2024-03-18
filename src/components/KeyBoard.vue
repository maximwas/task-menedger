<template>
  <div id="keyBoard">
    <div
      v-for="(keyBoard, index) in keyBoards"
      :key="index"
      class="key-board-row"
    >
      <div
        v-for="key in keyBoard"
        :key="key.id"
        :class="`state-${key.state}`"
        class="key-board-button"
        :data-key="key.key"
        @click="handlerClick(key)"
        @keyup="handlerClick(key)"
      >
        {{ key.key }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { uniqueId } from '@/utils';
import { useWord } from '@/stores/word';

import { StateRowLetter, type IKeyBoard } from '@/types';

const emit = defineEmits(['keydown']);
const keyBoards = reactive<IKeyBoard[][]>(fillKeyBoard());
const store = useWord();
const { history } = storeToRefs(store);

watch(history, (newValueHistory) => {
  keyBoards.forEach((keyBoard) => {
    keyBoard.forEach((key) => {
      newValueHistory.forEach((rowLetters) => {
        rowLetters.forEach((rowLetter) => {
          if (rowLetter.value === key.key) {
            key.state = rowLetter.state;
          }
        });
      });
    });
  });
}, {
  deep: true,
});

function fillKeyBoard(): IKeyBoard[][] {
  const ukrLetters = [
    ['й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ї'],
    ['ф', 'і', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'є', 'ґ'],
    ['backspace', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', 'enter'],
  ];

  return ukrLetters.map((letters) => letters.map((letter) => ({
    id: uniqueId(),
    key: letter,
    state: StateRowLetter.DEFAULT,
  })));
}

function handlerClick(key: IKeyBoard) {
  emit('keydown', key);
}
</script>

<style scoped>
#keyBoard {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
}

.key-board-row {
  display: flex;
}

.key-board-button {
  align-items: center;
  background-color: var(--background-keyboard);
  color: var(--color-text-main) !important;
  border: 2px solid transparent;
  border-radius: 4px;
  color: inherit;
  cursor: pointer;
  user-select: none;
  display: flex;
  flex: 1 1;
  font-size: 17px;
  font-weight: 700;
  justify-content: center;
  margin: 3px;
  min-height: 46px;
  padding: 3px;
  text-decoration: inherit;
  text-transform: capitalize;
  transition: .2s;
}

.key-board-button:hover {
  background: var(--background-hover);
}
</style>
