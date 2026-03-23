<script setup>
import { ref, computed, onMounted } from "vue";
import NavSignIn from "@/components/NavSignIn.vue";
import ErrorPopup from "@/components/ErrorPopup.vue";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const apiBase = import.meta.env.VITE_API_URL || "http://localhost:8000";

const email = computed(() => String(route.query.email || "").trim().toLowerCase());
const code = ref("");
const loading = ref(false);
const errorMsg = ref("");
const infoMsg = ref("");

onMounted(() => {
  if (!email.value) router.replace("/login");
});

function showError(msg) {
  errorMsg.value = msg;
}

async function verifyCode() {
  infoMsg.value = "";
  const c = code.value.trim();
  if (!c) return showError("Informe o código.");

  loading.value = true;
  try {
    const res = await fetch(`${apiBase}/auth/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value, code: c }),
      credentials: "include",
    });

    const body = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(body?.detail || "Código inválido ou expirado.");
    }

    localStorage.setItem("auth_user", JSON.stringify({
      id_usuario: body?.id_usuario,
      id_categoria_usuario: body?.id_categoria_usuario,
      email: body?.email,
      nome: body?.nome
    }));

    window.dispatchEvent(new CustomEvent("auth-user-updated", {
      detail: {
        id_usuario: body?.id_usuario,
        id_categoria_usuario: body?.id_categoria_usuario,
        email: body?.email,
        nome: body?.nome
      }
    }));

    const categoryId = Number(body?.id_categoria_usuario);
    const userId = Number(body?.id_usuario);

    if (categoryId === 7 && userId) {
      router.push(`/students/${userId}`);
    } else if ([2, 3].includes(categoryId)) {
      router.push("/units");
    } else if ([4, 5].includes(categoryId)) {
      router.push("/courses");
    } else if (categoryId === 6) {
      router.push("/subjects");
    } else {
      router.push("/home");
    }
  } catch (err) {
    showError(err?.message || "Erro inesperado.");
  } finally {
    loading.value = false;
  }
}

async function resendCode() {
  infoMsg.value = "";
  if (!email.value) return;

  loading.value = true;
  try {
    const res = await fetch(`${apiBase}/auth/send-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.value }),
      credentials: "include",
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.detail || "Falha ao reenviar código.");
    }

    infoMsg.value = "Código reenviado.";
  } catch (err) {
    showError(err?.message || "Erro inesperado.");
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <NavSignIn />
  <main>
    <img id="locker" src="../assets/images/auth-image.png" alt="" />
    <section>
      <p>{{ t("auth.instruction") }}</p>

      <form @submit.prevent="verifyCode">
        <div>
          <label class="label-form">{{ t("auth.codeLabel") }}</label>
          <input class="input-form" type="text" v-model="code" inputmode="numeric" autocomplete="one-time-code" />
        </div>

        <div id="button-wrapper">
          <button class="blue-button" type="submit" :disabled="loading">
            {{ loading ? "Validando..." : t("auth.continue") }}
          </button>
          <button type="button" class="link" @click="resendCode" :disabled="loading">
            Reenviar código
          </button>
        </div>
      </form>

      <p v-if="infoMsg" class="info">{{ infoMsg }}</p>
    </section>
  </main>

  <ErrorPopup v-model="errorMsg" title="Erro" :autoCloseMs="4000" />
</template>

<style scoped>
main {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

img {
  width: 14rem;
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

.link {
  font-size: 14px;
  text-decoration: underline;
  font-weight: normal;
  align-self: center;
  border: none;
  background: none;
  cursor: pointer;
}
</style>
