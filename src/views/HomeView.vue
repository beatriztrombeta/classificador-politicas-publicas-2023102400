<script setup>
import { provide, computed } from "vue";
import NavDefault from "@/components/NavDefault.vue";
import ExportArchieve from "@/components/ExportArchieve.vue";
import FilterBy from "@/components/FilterBy.vue";
import SearchBar from "@/components/SearchBar.vue";
import SortBy from "@/components/SortBy.vue";

import CoursesTable from "@/components/CoursesTable.vue";
import SubjectsTable from "@/components/SubjectsTable.vue";
import StudentsTable from "@/components/StudentsTable.vue";

import { useFilters } from "@/composable/useFilters";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const {
  currentTable,
  searchTerm,
  selectedSort,
  selectedFilter,
  sortOptions,
  filterOptions
} = useFilters();

provide("currentTable", currentTable);
provide("searchTerm", searchTerm);
provide("selectedSort", selectedSort);
provide("selectedFilter", selectedFilter);
provide("sortOptions", sortOptions);
provide("filterOptions", filterOptions);

const currentTitle = computed(() => {
  const map = {
    courses: t("home.title.courses"),
    subjects: t("home.title.subjects"),
    students: t("home.title.students")
  };
  return map[currentTable.value] || "Tabela";
});


</script>

<template>
  <NavDefault @change-table="currentTable = $event" />
  <hr />
  <section id="controls">
    <h1>{{ currentTitle }}</h1>
    <div id="filters">
      <nav>
        <SearchBar />
        <SortBy />
        <FilterBy />
      </nav>
      <ExportArchieve />
    </div>
  </section>
  <main>
    <CoursesTable v-if="currentTable === 'courses'" />
    <SubjectsTable v-else-if="currentTable === 'subjects'" />
    <StudentsTable v-else />
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

#filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
}
</style>
