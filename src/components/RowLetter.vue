<template>
  <div
    class="row-letter"
    :class="`state-${props.state}`"
  >
    <Transition name="show">
      <span v-if="props.value">{{ props.value }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { type PropsRowLetter } from '@/types';

const props = defineProps<PropsRowLetter>();
</script>

<style scoped>
.row-letter {
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-left: 7px;
  color: var(--color-text-main);
  background: var(--background-secondary);
  border: 2px solid var(--border-letter);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  text-transform: uppercase;
  font-size: 20px;
  transition: 0.3s linear;
}

.row-letter:first-child {
  margin-left: 0;
}

.show-enter-active,
.show-leave-active {
  opacity: 1;
  transform: scale(1);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
  transform: scale(0.2);
}
</style>
