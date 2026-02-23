<script setup>
import { provide } from 'vue'
import { useSignup } from '@/composable/useSignup'
import NavSignIn from "@/components/NavSignIn.vue"

import StepEmail from './steps/StepEmail.vue'
import StepCode from './steps/StepCode.vue'
import StepCategory from './steps/StepCategory.vue'
import StepForm from './steps/StepForm.vue'
import FinalStep from './steps/FinalStep.vue'
import BaseBackButton from '@/components/BaseBackButton.vue'

const signupState = useSignup()
const { signup } = signupState

provide('signup', signupState)

const steps = [
  StepEmail,
  StepCode,
  StepCategory,
  StepForm,
  FinalStep
]
</script>

<template>
  <NavSignIn />
  <BaseBackButton v-if="signup.step > 1 && signup.step < steps.length" />
  <component :is="steps[signup.step - 1]" :key="signup.step" />
</template>
