<template>
  <Teleport to="body">
    <Transition name="show">
      <div v-if="props.open" id="modal">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { PropsModal } from '@/types';
import { watch } from 'vue';

const emit = defineEmits(['close']);
const props = withDefaults(defineProps<PropsModal>(), {
  open: false,
  timeout: 1000,
});

watch(() => props.open, (open) => {
  if (open) {
    setTimeout(() => emit('close'), props.timeout);
  }
});
</script>

<style scoped>
#modal {
  width: 400px;
  height: 300px;
  background-color: var(--background-modal);
  border-radius: 15px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
