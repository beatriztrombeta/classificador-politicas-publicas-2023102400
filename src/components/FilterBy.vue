<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const filterOptions = inject("filterOptions");
const selectedFilter = inject("selectedFilter");
</script>

<template>
    <div class="sort-filter-export">
        <svg class="sort-filter-icons" width="497" height="592" viewBox="0 0 497 592" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M24.0073 175.2V89.952C23.4733 54.0688 52.1241 24.5437 88.0073 24H408.006C443.891 24.5437 472.541 54.0688 472.006 89.952V175.2C472.032 183.899 468.669 192.266 462.63 198.528L321.382 312C315.344 318.262 311.984 326.63 312.006 335.328V502.016C312.077 514.374 305.251 525.741 294.31 531.488L230.31 564.448C220.256 569.478 208.298 568.861 198.813 562.826C189.328 556.787 183.709 546.214 184.006 534.976V335.328C184.032 326.63 180.669 318.262 174.63 312L33.3834 198.496C27.3533 192.242 23.991 183.888 24.0073 175.2Z"
                stroke="black" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

        <select class="select-sort-filter" v-model="selectedFilter">
            <option value="">{{ t('home.buttons.filter') }}</option>
            <option v-for="option in filterOptions" :key="option.id" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<style scoped>
svg {
    width: 0.9rem;
    height: auto;
}

svg>path {
    stroke-width: 4rem;
}
</style>