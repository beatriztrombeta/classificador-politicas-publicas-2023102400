<script setup>
defineProps({
  text: {
    type: String,
    required: true
  }
});
</script>

<template>
  <span class="tooltip-wrapper">
    <slot></slot>
    <span class="tooltip-text">{{ text }}</span>
  </span>
</template>


<style scoped>
.tooltip-wrapper {
  position: relative;
  cursor: help;
  display: inline-block;
}

.tooltip-text {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--color-tooltip-bg);
  color: var(--font-inverted-rate);
  text-align: center;
  border-radius: 6px;
  padding: 0.4rem 0.6rem;
  z-index: 10;
  font-size: 0.75rem;
  white-space: nowrap;
  transition: opacity 0.3s;
}

.tooltip-text::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: var(--color-tooltip-bg) transparent transparent transparent;
}

.tooltip-wrapper:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}
</style>
