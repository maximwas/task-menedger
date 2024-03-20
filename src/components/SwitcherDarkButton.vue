<template>
  <div class="switch-dark" :class="{ active: isDark }">
    <label class="label-check">
      <input
        class="switch-checked"
        type="checkbox"
        @change="toggleDark()"
      />
      <div class="switch-button" />
    </label>

    <div class="overflow">
      <div class="icons">
        <SunIcon class="moon" />
        <MoonIcon class="sun" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core';

import MoonIcon from '@/components/icon/MoonIcon.vue';
import SunIcon from '@/components/icon/SunIcon.vue';

const isDark = useDark({
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
  initialValue: 'light',
  disableTransition: false,
});
const toggleDark = useToggle(isDark);
</script>

<style scoped>
.switch-dark {
  display: flex;
}

.switch-checked {
  display: none;
}

.switch-checked + .switch-button {
  position: relative;
  display: block;
  width: 48px;
  height: 26px;
  cursor: pointer;
  border-radius: 100px;
  transition: 0.2s linear;
  background-color: var(--switch-button-color);
  transition: 0.3s linear;
}

.switch-checked + .switch-button::after {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  content: "";
  transition: 0.3s linear;
  border-radius: 50%;
  background-color: var(--switch-button-cycle-color);
}

.icons {
  display: flex;
  flex-direction: column;
  height: 52px;
  width: 26px;
  transition: transform 0.3s;
  margin-left: 3px;
}

.overflow {
  overflow: hidden;
  height: 26px;
}

.active  .switch-checked + .switch-button {
  background-color: var(--switch-button-active-color);
}

.active  .switch-checked + .switch-button::after {
  left: 25px;
}

.active .icons {
  transform: translateY(-26px);
}
</style>
