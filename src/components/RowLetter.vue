<template>
  <div
    class="row-letter"
    :class="stateClass"
  >
    <Transition name="show">
      <span v-if="props.value">{{ props.value }}</span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { PropsRowLetter } from '@/types';

const props = defineProps<PropsRowLetter>();
const stateClass = computed<string>(() => `row-letter-${props.state}`);
</script>

<style scoped>
.row-letter {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}

.row-letter-default {
  background-color: #ffffff;
  color: #000000;
}

.row-letter-absent {
  background-color: #a4aec4;
  color: #ffffff;
}

.row-letter-correct {
  background-color: #79b851;
  color: #ffffff;
}

.row-letter-elsewhere {
  background-color: #f3c237;
  color: #ffffff;
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
