<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavDefault from '@/components/NavDefault.vue';

const route = useRoute()
const { t } = useI18n()

const pageTitle = computed(() =>
  route.meta.titleKey ? t(route.meta.titleKey) : ''
)
</script>

<template>
  <div class="layout">
    <NavDefault />
    <hr />
    <section id="controls">
      <h1>{{ pageTitle }}</h1>
    </section>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 1rem 2rem;
  gap: 1rem;
}

.content {
  flex: 1;
}

hr {
  width: -webkit-fill-available;
  opacity: 50%;
  border-color: var(--normal-blue);
}

section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
