<script setup>
import { useI18n } from "vue-i18n";
import { inject, watch } from 'vue';

const { t } = useI18n();
const { signup, next, sources } = inject('signup');

watch(
  () => signup.categoria,
  () => {
    signup.form = {};
  }
);
</script>

<template>
  <main>
    <img src="@/assets/images/signup-3.png" alt="" />
    <section>
      <p>Você se enquadra em qual categoria UNESP?</p>
      <select v-model="signup.categoria">
        <option disabled value="">Selecione</option>
        <option v-for="c in sources.categorias" :key="c.value" :value="c.value">
          {{ c.label }}
        </option>
      </select>
      <button class="blue-button" :disabled="!signup.categoria" @click="next">
        {{ t("signup.continue") }}
      </button>
    </section>
  </main>
</template>

<style scoped>
main {
  height: 100vw;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

img {
  width: 16rem;
  height: auto;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 19.7rem;
}

section p {
  width: 100%;
  text-align: center;
  align-self: center;
  font-weight: 600;
}

a {
  font-size: 14px;
}

select {
  border: var(--color-primary) solid 1px;
  border-radius: 0.7rem;
  padding: 0.8rem;
  margin-bottom: 1.2rem;
  background-color: transparent;
}
</style>