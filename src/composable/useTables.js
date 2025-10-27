import { ref } from "vue";
import { useMockTables } from "@/composable/useMockTables";

export function useTable() {
  const { courses } = useMockTables();
  const expandedRow = ref(null);

  function toggleExpand(courseId) {
    expandedRow.value = expandedRow.value === courseId ? null : courseId;
  }

  function getRateColor(rate) {
    const value = parseFloat(rate);
    if (isNaN(value)) return "";
    if (value < 25) return "green-rate";
    if (value < 50) return "yellow-rate";
    if (value < 75) return "orange-rate";
    return "red-rate";
  }

  return {
    courses,
    expandedRow,
    toggleExpand,
    getRateColor
  };
}
