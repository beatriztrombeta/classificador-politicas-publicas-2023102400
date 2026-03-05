<script setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composable/useTheme";
import NavSignIn from "@/components/NavSignIn.vue";
import { useRouter } from "vue-router";
import ErrorPopup from "@/components/ErrorPopup.vue";

const { t } = useI18n();
const { isDark } = useTheme();
const router = useRouter();

const UnespLogo = ref("");

function updateImages() {
  UnespLogo.value = isDark.value
    ? new URL("../assets/images/UNESP-dark.png", import.meta.url).href
    : new URL("../assets/images/UNESP-light.png", import.meta.url).href;
}

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";
const email = ref("");
const loading = ref(false);
const errorMsg = ref("");

async function onSendCode() {
  errorMsg.value = "";

  const e = email.value.trim().toLowerCase();
  if (!e) {
    showError("Informe um e-mail válido.");
    return;
  }

  loading.value = true;
  try {
    const res = await fetch(`${apiBase}/auth/send-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: e }),
      credentials: "include",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.detail || "Falha ao enviar código.");
    }

    router.push({ path: "/auth", query: { email: e } });
  } catch (err) {
    showError(err?.message || "Erro inesperado.");
  } finally {
    loading.value = false;
  }
}

function showError(msg) {
  errorMsg.value = msg;
}

onMounted(updateImages);
watch(isDark, updateImages);
</script>

<template>
  <NavSignIn />
  <main>
    <img :src="UnespLogo" alt="UNESP logo" />
    <section>
      <form @submit.prevent="onSendCode">
        <div>
          <label class="label-form">{{ t("login.emailLabel") }}</label>
          <input class="input-form" type="email" v-model="email" autocomplete="email" />
        </div>
        <div id="button-wrapper">
          <button class="blue-button" type="submit" :disabled="loading">
            {{ loading ? "Enviando..." : t("login.continue") }}
          </button>
          <router-link to="/signup" class="signup-link">
            Não possuí uma conta? Cadastre-se aqui
          </router-link>
        </div>
      </form>
    </section>
  </main>
  <ErrorPopup v-model="errorMsg" title="Erro" :autoCloseMs="4000" />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  min-height: 100vh;
  padding-bottom: 3rem;
}

img {
  width: 14rem;
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
