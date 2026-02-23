<script setup>
import { ref, onMounted } from 'vue'
import BaseTable from '@/components/BaseTable.vue'
import { mocks } from '@/mocks'

const studentRow = ref([])
const subjectsRow = ref([])

onMounted(() => {
  studentRow.value = mocks.students()
  subjectsRow.value = mocks.subjects()
})
</script>

<template>
  <section>
    <div class="warning-wrapper">
      <p>⚠️</p>
      <p>Sua frequência do curso está um pouco abaixo da média, com 69%</p>
    </div>
    <div class="resume-wrapper">
      <h3>Desempenho</h3>
      <p>Seu desempenho acadêmico apresenta sinais de alerta. A ocorrência de reprovações, aliada a notas e frequências
        mais baixas, indica dificuldades na assimilação dos conteúdos e na regularidade de estudos. É importante rever sua
        organização acadêmica, buscar apoio pedagógico quando necessário e acompanhar mais de perto seu rendimento nas
        disciplinas, para evitar que essas dificuldades se acumulem ao longo do curso.</p>
    </div>
    <h3>Geral</h3>
    <BaseTable entity="students" :rowData="studentRow" />
    <h3>Disciplinas</h3>
    <BaseTable entity="subjects" :rowData="subjectsRow" />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 1rem 0rem 3rem 0rem;
}

.warning-wrapper{
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: solid 1px var(--red-rate);
  border-radius: 0.7rem;
  padding: 0.5rem 1rem;
  font-weight: 600;
  align-items: center;
}

.resume-wrapper{
  font-weight: 400;
}

</style>
