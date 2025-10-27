<script setup>
import SelectTheme from "./SelectTheme.vue";
import SelectLanguage from "./SelectLanguage.vue";
import { useI18n } from "vue-i18n";
import { useTheme } from "@/composable/useTheme";

const { t } = useI18n();

const emit = defineEmits(["close"]);

const { isDark } = useTheme();

</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <main :class="['modal-content', { dark: isDark }]">
      <section id="settings">
        <button class="close-btn" @click="emit('close')">
          <svg class="icons" width="368" height="368" viewBox="0 0 368 368" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path class="fill-me"
              d="M7.02936 327.03C-2.34312 336.403 -2.34312 351.597 7.02936 360.97C16.4018 370.342 31.598 370.342 40.9705 360.97L7.02936 327.03ZM200.97 200.97C210.342 191.597 210.342 176.403 200.97 167.03C191.597 157.658 176.403 157.658 167.03 167.03L200.97 200.97ZM167.03 167.03C157.658 176.403 157.658 191.597 167.03 200.97C176.403 210.342 191.597 210.342 200.97 200.97L167.03 167.03ZM360.97 40.9706C370.342 31.5981 370.342 16.4019 360.97 7.02942C351.597 -2.34306 336.403 -2.34306 327.03 7.02942L360.97 40.9706ZM200.97 167.03C191.597 157.658 176.403 157.658 167.03 167.03C157.658 176.403 157.658 191.597 167.03 200.97L200.97 167.03ZM327.03 360.97C336.403 370.342 351.597 370.342 360.97 360.97C370.342 351.597 370.342 336.403 360.97 327.03L327.03 360.97ZM167.03 200.97C176.403 210.342 191.597 210.342 200.97 200.97C210.342 191.597 210.342 176.403 200.97 167.03L167.03 200.97ZM40.9705 7.02942C31.598 -2.34306 16.4018 -2.34306 7.02936 7.02942C-2.34312 16.4019 -2.34312 31.5981 7.02936 40.9706L40.9705 7.02942ZM40.9705 360.97L200.97 200.97L167.03 167.03L7.02936 327.03L40.9705 360.97ZM200.97 200.97L360.97 40.9706L327.03 7.02942L167.03 167.03L200.97 200.97ZM167.03 200.97L327.03 360.97L360.97 327.03L200.97 167.03L167.03 200.97ZM200.97 167.03L40.9705 7.02942L7.02936 40.9706L167.03 200.97L200.97 167.03Z"
              fill="black" />
          </svg>
        </button>
        <ul>
          <li>
            <svg class="icons" width="506" height="518" viewBox="0 0 506 518" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path class="fill-not" fill-rule="evenodd" clip-rule="evenodd"
                d="M230.25 492.333C218.337 492.333 208.173 483.49 206.233 471.433C204.447 461.68 197.6 453.71 188.39 450.667C180.886 448.023 173.548 444.907 166.42 441.333C157.938 436.883 147.763 437.55 139.9 443.067C130.385 450.083 117.314 448.997 109.025 440.5L76.7853 407.433C68.1086 398.533 66.9813 384.503 74.1203 374.267C79.626 366.017 80.419 355.38 76.2003 346.367C73.4206 340.107 70.9686 333.697 68.8553 327.167C65.8283 316.877 57.4733 309.17 47.1776 307.167C34.7623 305.133 25.5966 294.197 25.5003 281.3V239.933C25.4343 225.07 35.9016 212.357 50.2003 209.933C61.0476 207.817 70.1053 200.197 74.2503 189.7C75.4853 186.744 76.7853 183.811 78.1503 180.9C83.663 170.015 82.9016 156.904 76.1676 146.767C67.7466 134.763 69.0396 118.27 79.2226 107.8L102.915 83.5C114.601 71.5107 133.03 69.959 146.465 79.8333L147.213 80.3667C157.245 87.292 170.011 88.5463 181.143 83.7C193.052 79.3037 201.83 68.808 204.25 56.0667L204.577 54.9333C207.25 38.0657 221.453 25.6737 238.117 25.6667H266.717C283.827 25.6587 298.43 38.3523 301.23 55.6667L301.75 58C304.047 70.2057 312.37 80.3073 323.72 84.6667C334.66 89.4823 347.24 88.2247 357.067 81.3333L358.69 80.1333C372.473 69.9447 391.427 71.5117 403.443 83.8333L425.25 106.233C436.18 117.505 437.553 135.231 428.5 148.133C421.407 158.917 420.503 172.775 426.127 184.433L427.527 187.767C432.08 199.15 441.937 207.4 453.72 209.7C469.123 212.277 480.45 225.897 480.5 241.9V279C480.497 293.113 470.543 305.153 456.97 307.467C445.807 309.663 436.713 317.953 433.277 329.067C431.76 333.51 430.07 337.957 428.207 342.4C423.87 352.167 424.833 363.547 430.743 372.4C438.54 383.527 437.33 398.81 427.883 408.5L397.627 439.567C388.973 448.44 375.327 449.583 365.387 442.267C357.087 436.45 346.337 435.81 337.437 440.6C331.093 443.823 324.583 446.683 317.937 449.167C308.64 452.457 301.787 460.617 299.997 470.533C298.1 483.01 287.67 492.24 275.36 492.333H230.25Z"
                stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" />
              <path class="fill-not" fill-rule="evenodd" clip-rule="evenodd"
                d="M328.823 259C328.823 301.95 294.877 336.767 253 336.767C211.123 336.767 177.178 301.95 177.178 259C177.178 216.05 211.123 181.233 253 181.233C294.877 181.233 328.823 216.05 328.823 259Z"
                stroke="black" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            {{ t("settings.general") }}
          </li>
        </ul>
      </section>
      <section id="options">
        <h3>{{ t("settings.general") }}</h3>
        <div class="settings-section">
          <label>{{ t("settings.theme") }}:</label>
          <SelectTheme />
        </div>
        <div class="settings-section">
          <label>{{ t("settings.language") }}:</label>
          <SelectLanguage />
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  animation: fadeIn 0.2s ease-in-out;
}

.modal-content {
  background: var(--color-modal-bg);
  border-radius: var(--radius-lg);
  width: 35rem;
  height: 20rem;
  box-shadow: var(--shadow-md);
  position: relative;
  animation: slideUp 0.25s ease;
  display: flex;
  flex-direction: row;
}

#settings {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 30%;
  gap: 0.6rem;
  padding: 1.5rem;
  background-color: var(--color-settings-bg);
  border-radius: var(--radius-lg) 0 0 var(--radius-lg);
}

button img {
  width: 2rem;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
  width: 100%;
}

li {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  color: var(--theme-text);
  background-color: var(--color-settings-hover);
  border-radius: var(--radius-sm);
  transition: background 0.2s;
  font-size: 14px;
}

li img {
  width: 1.5rem;
}

#options {
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 1.5rem;
  gap: 1rem;
}

.close-btn {
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
}

.settings-section {
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: 500;
  font-size: 14px;
  color: var(--theme-text);
}
</style>
