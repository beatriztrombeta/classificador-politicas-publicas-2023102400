<script setup>
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composable/useTheme";

const { t } = useI18n();
const { selectedTheme } = useTheme();
</script>

<template>
  <select v-model="selectedTheme">
    <option value="light">{{ t("settings.light") }}</option>
    <option value="dark">{{ t("settings.dark") }}</option>
    <option value="auto">{{ t("settings.auto") }}</option>
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
