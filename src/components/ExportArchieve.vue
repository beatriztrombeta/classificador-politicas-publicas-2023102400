<script setup>
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <button class="sort-filter-export">
        <p>{{ t('home.buttons.exportPDF') }}</p>
        <svg class="sort-filter-icons" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.401574 6.64002C0.206311 6.83528 0.206311 7.15186 0.401574 7.34712C0.596836 7.54238 0.913418 7.54238 1.10868 7.34712L0.755127 6.99357L0.401574 6.64002ZM7.24875 0.999949C7.24875 0.723807 7.02489 0.499949 6.74875 0.499949L2.24875 0.499949C1.9726 0.499949 1.74875 0.723807 1.74875 0.999949C1.74875 1.27609 1.9726 1.49995 2.24875 1.49995H6.24875L6.24875 5.49995C6.24875 5.77609 6.4726 5.99995 6.74875 5.99995C7.02489 5.99995 7.24875 5.77609 7.24875 5.49995L7.24875 0.999949ZM0.755127 6.99357L1.10868 7.34712L7.1023 1.3535L6.74875 0.999949L6.39519 0.646396L0.401574 6.64002L0.755127 6.99357Z"
                fill="#222222" />
        </svg>
    </button>
</template>

<style scoped>
button{
    cursor: pointer;
    gap: 0;
    padding: 0.53rem 1rem;
}

button>p {
    margin: 0;
    font-weight: 500;
    padding: 0.09rem;
}

</style>