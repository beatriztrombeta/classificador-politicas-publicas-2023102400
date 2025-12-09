import { ref, computed } from "vue";

export function useFilters() {
  const currentTable = ref("courses");

  const searchTerm = ref("");
  const selectedSort = ref("");
  const selectedFilter = ref("");

  const tableConfig = {
    courses: {
      sortOptions: [
        { id: 1, text: "Curso", value: "name" },
        { id: 2, text: "Unidade", value: "university" },
        { id: 3, text: "Câmpus", value: "campus" },
        { id: 4, text: "Tipo", value: "type" },
        { id: 5, text: "Período", value: "studyPeriod" },
        { id: 6, text: "Evasão", value: "dropoutRate" },
      ],
      filterOptions: [
        { id: 1, text: "Noturno", value: "Noturno" },
        { id: 2, text: "Vespertino", value: "Vespertino" },
        { id: 3, text: "Vespertino Noturno", value: "Vespertino Noturno" },
        { id: 4, text: "Integral", value: "Integral" },
        { id: 5, text: "Bacharelado", value: "Bacharelado" },
        { id: 6, text: "Licenciatura", value: "Licenciatura" },
      ],
    }
  };

  const sortOptions = computed(() => tableConfig[currentTable.value]?.sortOptions || []);
  const filterOptions = computed(() => tableConfig[currentTable.value]?.filterOptions || []);

  return {
    currentTable,
    searchTerm,
    selectedSort,
    selectedFilter,
    sortOptions,
    filterOptions,
  };
}
