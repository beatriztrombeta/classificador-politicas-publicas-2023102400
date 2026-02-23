<script setup>
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composable/useTheme";
import { inject } from 'vue';

const { t } = useI18n();
useTheme();

const { signup, next } = inject('signup');
</script>

<template>
  <main>
    <h1>Cadastre-se aqui!</h1>
    <img src="@/assets/images/signup-1.png" alt="" />
    <section>
      <form @submit.prevent="next">
        <div>
          <label class="label-form">
            {{ t("signup.emailLabel") }}
          </label>
          <input class="input-form" type="email" v-model="signup.email" required />
        </div>
        <div id="button-wrapper">
          <button class="blue-button" :disabled="!signup.email">
            {{ t("signup.continue") }}
          </button>
          <router-link to="/login" class="signup-link">
            Já possuí uma conta? Faça login
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>


<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vw;
  padding-bottom: 3rem;
}

img {
  width: 16rem;
  height: auto;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  min-width: 19.7rem;
}

form div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

#button-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.signup-link {
  font-size: 14px;
  text-decoration: underline;
  font-weight: normal;
  align-self: center;
  cursor: pointer;
}
</style>
