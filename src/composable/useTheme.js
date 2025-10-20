import { ref, watch, onMounted } from "vue";
import { useDark } from "@vueuse/core";

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "dark",
  valueLight: "light",
  storageKey: "theme",
});

const selectedTheme = ref(localStorage.getItem("theme") || "auto");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(value) {
  if (value === "dark") {
    isDark.value = true;
    localStorage.setItem("theme", "dark");
  } else if (value === "light") {
    isDark.value = false;
    localStorage.setItem("theme", "light");
  } else {
    const prefersDark = systemPrefersDark.matches;
    isDark.value = prefersDark;
    localStorage.setItem("theme", "auto");
  }
}

onMounted(() => {
  applyTheme(selectedTheme.value);

  systemPrefersDark.addEventListener("change", (e) => {
    if (localStorage.getItem("theme") === "auto") {
      isDark.value = e.matches;
    }
  });
});

watch(selectedTheme, applyTheme);

export function useTheme() {
  return { isDark, selectedTheme, applyTheme };
}
