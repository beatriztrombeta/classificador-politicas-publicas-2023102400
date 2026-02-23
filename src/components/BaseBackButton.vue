<script setup>
import { inject } from 'vue';

const { back } = inject('signup');
</script>

<template>
  <div class="wrapper" @click="back">
    <span class="triangle-left"></span>
    <button class="back-button" type="button">
      Voltar
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: inline-flex;
  align-items: center;
  padding-left: 1rem;
  cursor: pointer;
  width: fit-content;
}

.back-button {
  background-color: var(--color-primary);
  color: var(--white);
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: medium;
  font-weight: 600;
  border-radius: 0 0.6rem 0.6rem 0;
  pointer-events: none;
}

.triangle-left {
  width: 0;
  height: 0;
  border-top: 1.2rem solid transparent;
  border-bottom: 1.2rem solid transparent;
  border-right: 1rem solid var(--color-primary);
}

.wrapper:hover .back-button {
  background-color: var(--color-secondary);
}

.wrapper:hover .triangle-left {
  border-right-color: var(--color-secondary);
}

</style>
