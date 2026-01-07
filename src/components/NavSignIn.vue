<script setup>
import SelectLanguage from './SelectLanguage.vue';
import SelectTheme from './SelectTheme.vue';
</script>

<template>
  <nav>
    <div class="nav-options">
      <svg class="icons" width="734" height="701" viewBox="0 0 734 701" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="fill-not"
          d="M133.667 233.667L300.333 400.333M100.333 433.667L300.333 233.667L367 133.667M33.6666 133.667H433.667M200.333 33.6667H233.667M397.433 533.667H636.567M397.433 533.667L333.667 667M397.433 533.667L492.943 333.967C500.64 317.877 504.487 309.83 509.753 307.287C514.33 305.077 519.67 305.077 524.247 307.287C529.513 309.83 533.36 317.877 541.057 333.967L636.567 533.667M636.567 533.667L700.333 667"
          stroke="black" stroke-width="66.6667" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <SelectLanguage />
    </div>
    |
    <div class="nav-options">
      <svg class="icons" width="722" height="723" viewBox="0 0 722 723" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" class="fill-me"
          d="M67.2343 355.717C67.2343 521.4 201.549 655.717 367.233 655.717C476.86 655.717 572.853 596.88 625.193 509C511.617 545.63 377.073 526.493 286.761 436.183C195.734 345.153 178.201 210.805 216.234 97.7643C127.566 150.642 67.2343 247.644 67.2343 355.717ZM660.233 420.837C687.75 404.737 729.167 422.96 720.667 453.687C677.813 608.623 535.81 722.383 367.233 722.383C164.73 722.383 0.567627 558.22 0.567627 355.717C0.567627 187.625 118.511 43.2817 274.509 1.33287C305.31 -6.94993 322.817 34.4593 306.137 61.645C244.009 162.885 248.398 303.537 333.9 389.04C418.397 473.54 558.55 480.34 660.233 420.837Z"
          fill="#0F0F0F" />
      </svg>
      <SelectTheme />
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  justify-content: end;
  padding: 1rem;
}

.nav-options {
  display: flex;
  gap: 0.2rem;
}
</style>