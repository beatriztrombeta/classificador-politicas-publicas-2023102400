<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <main>
    <h1>Seu cadastro foi concluído com sucesso!</h1>
    <section>
      <img src="@/assets/images/signup-5.png" alt="" />
      <p>Nós iremos revisar os documentos enviados e te enviaremos um e-mail quando terminarmos.</p>
      <button class="blue-button" @click="goToLogin">
        Voltar para a página inicial
      </button>
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

h1 {
  width: 22%;
  text-align: center;
  align-self: center;
  font-weight: 600;
}

img {
  width: 16rem;
  height: auto;
  align-self: center;
}

section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 21.7rem;
}

section p {
  width: 100%;
  text-align: center;
  align-self: center;
}
</style>
