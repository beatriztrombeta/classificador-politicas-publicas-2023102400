<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const sortOptions = inject("sortOptions");
const selectedSort = inject("selectedSort");
</script>

<template>
    <div class="sort-filter-export">
        <svg class="sort-filter-icons" width="319" height="518" viewBox="0 0 319 518" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M33.8329 165.194L129.367 38.8605C135.257 30.5825 144.79 25.6665 154.95 25.6665C165.11 25.6665 174.643 30.5825 180.533 38.8605L284.967 165.194C293.517 175.881 295.517 190.399 290.17 203C284.823 215.6 272.993 224.25 259.367 225.526H59.3662C45.7502 224.23 33.9419 215.57 28.6112 202.973C23.2802 190.377 25.2852 175.872 33.8329 165.194Z"
                stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M284.967 352.527L189.367 478.86C183.477 487.153 173.937 492.077 163.767 492.077C153.597 492.077 144.057 487.153 138.167 478.86L33.8329 352.527C25.2852 341.85 23.2802 327.343 28.6112 314.747C33.9419 302.15 45.7502 293.493 59.3662 292.193H259.367C272.993 293.47 284.823 302.12 290.17 314.72C295.517 327.323 293.517 341.84 284.967 352.527Z"
                stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <select class="select-sort-filter" v-model="selectedSort">
            <option value="">{{ t('home.buttons.sort') }}</option>
            <option v-for="option in sortOptions" :key="option.id" :value="option.value">{{ option.text }}</option>
        </select>
    </div>
</template>

<style scoped>
svg {
    width: 0.7rem;
    height: auto;
}
</style>