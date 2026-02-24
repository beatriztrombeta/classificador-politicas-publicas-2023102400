<script setup>
import { useI18n } from "vue-i18n";
import { inject } from "vue";

const { t } = useI18n();

const { signup, next, sendCode, verifyCode, verification } = inject("signup");

async function handleVerify() {
  try {
    await verifyCode(verification.code);
    next();
  } catch (e) {
    verification.error = e?.message ?? "Código inválido";
  }
}

async function handleResend() {
  try {
    await sendCode();
  } catch (e) {
    verification.error = e?.message ?? "Falha ao reenviar";
  }
}
</script>

<template>
  <main>
    <img id="locker" src="@/assets/images/auth-image.png" alt="" />
    <section>
      <p>{{ t("auth.instruction") }}</p>

      <form @submit.prevent="handleVerify">
        <div>
          <label class="label-form">{{ t("auth.codeLabel") }}</label>
          <input class="input-form" type="text" v-model="verification.code" />
          <small v-if="verification.error" style="color: #c00">{{ verification.error }}</small>
        </div>

        <div id="button-wrapper">
          <button class="blue-button" :disabled="!verification.code || verification.verifying">
            {{ t("signup.continue") }}
          </button>

          <a href="#" @click.prevent="handleResend" :style="{ opacity: verification.sending ? 0.6 : 1 }">
            Reenviar código
          </a>
        </div>
      </form>
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
  margin: 0;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
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

a {
  font-size: 14px;
  text-decoration: underline;
  font-weight: normal;
  align-self: center;
}
</style>
