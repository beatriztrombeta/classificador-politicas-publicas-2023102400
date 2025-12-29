<script setup>
import NavSignIn from "@/components/NavSignIn.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <NavSignIn />
  <main>
    <img id="locker" src="../assets/images/auth-image.png" alt="" />
    <section>
      <p>{{ t("auth.instruction") }}</p>
      <form action="">
        <div>
          <label class="label-form" for="">{{ t("auth.codeLabel") }}</label>
          <input class="input-form" type="text" />
        </div>
        <div id="button-wrapper">
          <button class="blue-button">{{ t("auth.continue") }}</button>
          <a href="#">Reenviar código</a>
        </div>
      </form>
    </section>
  </main>
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

a {
  font-size: 14px;
  text-decoration: underline;
  font-weight: normal;
  align-self: center;
}
</style>
