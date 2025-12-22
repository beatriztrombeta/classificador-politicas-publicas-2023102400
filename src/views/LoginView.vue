<script setup>
import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composable/useTheme";
import NavSignIn from "@/components/NavSignIn.vue";

const { t } = useI18n();
const { isDark } = useTheme();

const UnespLogo = ref("");

function updateImages() {
  UnespLogo.value = isDark.value
    ? new URL("../assets/images/UNESP-dark.png", import.meta.url).href
    : new URL("../assets/images/UNESP-light.png", import.meta.url).href;
}

onMounted(updateImages);
watch(isDark, updateImages);
</script>


<template>
  <NavSignIn/>
  <main>
    <img :src="UnespLogo" alt="UNESP logo" />
    <section>
      <form action="">
        <div>
          <label class="label-form" for="">{{ t("login.emailLabel") }}</label>
          <input class="input-form" type="email" />
        </div>
        <div>
          <button class="blue-button">{{ t("login.continue") }}</button>
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
  gap: 3rem;
  height: 100%;
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

a {
  font-size: 14px;
}
</style>
