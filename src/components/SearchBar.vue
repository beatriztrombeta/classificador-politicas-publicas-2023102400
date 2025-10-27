<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const searchTerm = inject("searchTerm");
</script>

<template>
    <div class="sort-filter-export">
        <svg class="sort-filter-icons" width="496" height="497" viewBox="0 0 496 497" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M24 220.656C23.9859 126.86 90.232 46.1145 182.224 27.8025C274.218 9.49086 366.336 58.7126 402.24 145.365C438.147 232.019 407.84 331.968 329.856 384.09C251.872 436.208 147.932 425.984 81.6 359.664C44.7242 322.803 24.0045 272.8 24 220.656Z"
                stroke="black" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M359.648 359.696L472 472.048" stroke="black" stroke-width="48"
                stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <input type="text" v-model="searchTerm" :placeholder="t('home.buttons.search')" />
    </div>

</template>

<style scoped>
div {
    background: none;
}

svg {
    width: 1rem;
    height: auto;
}

input {
    border: none;
    font-size: 14px;
    font-weight: 500;
    background: none;
}
</style>