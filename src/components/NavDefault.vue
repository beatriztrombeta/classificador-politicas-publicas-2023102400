<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composable/useTheme'
import { navigationItems } from '@/schemas/navigation'

import ProfileMenu from './ProfileMenu.vue'
import SettingsModal from './SettingsModal.vue'

const { t } = useI18n()
const { isDark } = useTheme()
const route = useRoute()

const UnespLogo = ref('')
const showSettings = ref(false)
const showMenu = ref(false)

function updateImages() {
  UnespLogo.value = isDark.value
    ? new URL('../assets/images/UNESP-dark.png', import.meta.url).href
    : new URL('../assets/images/UNESP-light.png', import.meta.url).href
}

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function openSettings() {
  showSettings.value = true
}

onMounted(updateImages)
watch(isDark, updateImages)

const isActive = (name) => route.name === name
</script>

<template>
  <header>
    <nav>
      <img :src="UnespLogo" alt="UNESP logo" />

      <div id="tabela-nav">
        <router-link v-for="item in navigationItems" :key="item.name" :to="item.path" custom v-slot="{ navigate }">
          <button :class="{ active: isActive(item.name) }" @click="navigate">
            {{ t(item.titleKey) }}
          </button>
        </router-link>
      </div>
    </nav>
    <div>
      <button class="invisible-button" @click="toggleMenu">
        <svg id="profile" width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle class="profile-bg" cx="19.5" cy="19.5" r="19.5" fill="#39BFF2" />
          <mask id="mask0_80_448" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="39"
            height="39">
            <circle class="profile-user" cx="19.5" cy="19.5" r="19.5" fill="#4A4A4A" />
          </mask>
          <g mask="url(#mask0_80_448)">
            <circle class="profile-user" cx="19.8422" cy="35.579" r="13" fill="#AEE6FB" />
            <circle class="profile-user" cx="19.5" cy="14.0264" r="5.81579" fill="#AEE6FB" />
          </g>
        </svg>
      </button>
      <ProfileMenu :show="showMenu" @close="showMenu = false" @open-settings="openSettings" />
    </div>
  </header>

  <SettingsModal v-if="showSettings" @close="showSettings = false" />
</template>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

nav {
  display: flex;
  align-items: center;
  gap: 2rem;
}

#tabela-nav {
  display: flex;
  flex-direction: row;
  gap: 3rem;
}

#tabela-nav button {
  border: none;
  font-size: 16px;
  background: none;
  cursor: pointer;
  border-bottom: 0.1rem solid transparent;
  font-weight: 600;
  padding: 0;
}

#tabela-nav button.active {
  border-color: var(--theme-text);
  color: var(--theme-text);
}

header>div:last-child {
  position: relative;
}

img {
  width: 10rem;
}

#profile {
  width: 2.2rem;
  height: fit-content;
  border-radius: 100%;
  box-shadow: var(--shadow-sm);
}

.profile-bg {
  fill: var(--color-profile-bg);
}

.profile-user {
  fill: var(--color-profile-user);
}

.invisible-button {
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
}
</style>
