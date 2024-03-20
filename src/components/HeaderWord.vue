<template>
  <header>
    <h1 class="title-header">Word</h1>
    <SwitcherDarkButton />
  </header>
</template>

<script setup lang="ts">
import SwitcherDarkButton from '@/components/SwitcherDarkButton.vue';
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  height: 50px;
  align-items: center
}

.title-header {

}
</style>
