<template>
  <Teleport to="body">
    <div v-if="props.open" id="overlay" />
  </Teleport>
  <Teleport to="body">
    <Transition name="pop">
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
  timeout: 3000,
});

watch(() => props.open, (open) => {
  if (open) {
    setTimeout(() => emit('close'), props.timeout);
  }
});
</script>

<style scoped>
#overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: transparent;
  z-index: 30;
}

#modal {
  width: 260px;
  min-height: 90px;
  background-color: var(--background-modal);
  border-radius: 15px;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0,0,0,.3);
  padding: 30px 20px;
  z-index: 9999;
}

#modal.pop-enter-active,
#modal.pop-leave-active {
  transition: transform .4s cubic-bezier(0.5, 0, 0.5, 1), opacity .4s linear;
  transform-origin: -25% 0%;
}

#modal.pop-enter-from,
#modal.pop-leave-to {
  opacity: 0;
  transform: scale(0.3) translateY(-50%);
}
</style>
