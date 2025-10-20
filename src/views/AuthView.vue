<script setup>
import NavOptions from "@/components/NavOptions.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
  <NavOptions />
  <main>
    <div id="circle">
      <img id="locker" src="../assets/images/locker.svg" alt="locker svg" />
    </div>
    <section>
      <p>{{ t("auth.instruction") }}</p>
      <form action="">
        <div>
          <label class="label-form" for="">{{ t("auth.codeLabel") }}</label>
          <input class="input-form" type="text" />
        </div>
        <div>
          <button class="blue-button">{{ t("auth.continue") }}</button>
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

#circle {
  border-radius: 100%;
  border: 0.3rem solid var(--color-primary);
}

#locker {
  width: 8rem;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 19.7rem;
}

section p {
  width: 70%;
  text-align: center;
  align-self: center;
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

a {
  font-size: 14px;
}
</style>
