<script setup>
const props = defineProps({
  params: {
    type: Object,
    required: true
  }
})

function handleClick() {
  props.params.onOpen(props.params.data)
}
</script>

<template>
  <button
    type="button"
    class="documents-btn"
    @click="handleClick"
  >
    Ver documentos
  </button>
</template>
