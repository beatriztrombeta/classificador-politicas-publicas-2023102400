<script setup>
import { watch, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" }, // mensagem
  title: { type: String, default: "Erro" },
  autoCloseMs: { type: Number, default: 0 }, // 0 = não fecha sozinho
});

const emit = defineEmits(["update:modelValue", "close"]);

let timerId = null;

function close() {
  emit("update:modelValue", "");
  emit("close");
}

watch(
  () => props.modelValue,
  (val) => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    if (val && props.autoCloseMs > 0) {
      timerId = setTimeout(() => close(), props.autoCloseMs);
    }
  }
);

onBeforeUnmount(() => {
  if (timerId) clearTimeout(timerId);
});
</script>

<template>
  <div v-if="modelValue" class="popup-backdrop" @click.self="close">
    <div class="popup" role="dialog" aria-modal="true" :aria-label="title">
      <div class="popup-header">
        <strong>{{ title }}</strong>
        <button class="popup-close" type="button" @click="close">✕</button>
      </div>

      <p class="popup-message">{{ modelValue }}</p>

      <div class="popup-actions">
        <button class="ok-button" type="button" @click="close">OK</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 9999;
}

.popup {
  width: 100%;
  max-width: 15em;
  background: var(--theme-bg);
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.popup-close {
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}

.popup-message {
  margin: 0.75rem 0 1rem 0;
  font-size: 14px;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
}

.ok-button {
  background: var(--color-primary);
  color: var(--white);
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  font-family: var(--font-sans-serif);
  font-size: small;
}
</style>