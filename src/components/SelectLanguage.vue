<script setup>
import { useI18n } from 'vue-i18n'

const { locale, availableLocales } = useI18n()
</script>

<template>
  <select v-model="locale">
    <option v-for="loc in availableLocales" :key="loc" :value="loc">
      {{ { 'pt-BR': 'Português', 'en-UK': 'Inglês', 'es-ES': 'Espanhol' }[loc] }}
    </option>
  </select>
</template>

<style scoped>
select {
  cursor: pointer;
  background: none;
  border: none;
  font-family: var(--font-sans-serif);
  font-size: 14px;
  color: var(--theme-text);
  font-weight: 500;
}

select:focus {
  outline: none;
}
</style>
