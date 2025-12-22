<script setup>
import NavDefault from "@/components/NavDefault.vue";
import { computed } from "vue";

import { useI18n } from 'vue-i18n'

const { t } = useI18n();

const currentTitle = computed(() => {
  const map = {
    home: t("home.title.home")
  };
  return map.home;
});
</script>

<template>
  <NavDefault @change-table="currentTable = $event" />
  <hr />
  <section id="controls">
    <h1>{{ currentTitle }}</h1>
  </section>
  <main>
  </main>
</template>

<style scoped>
hr {
  width: inherit;
  margin: 0.8rem 2rem;
  opacity: 50%;
  border-color: var(--normal-blue);
}

section {
  display: flex;
  flex-direction: column;
  margin: 0.8rem 2rem;
  gap: 2rem;
}

main{
  padding: 1rem 0;
}

nav {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}
</style>
