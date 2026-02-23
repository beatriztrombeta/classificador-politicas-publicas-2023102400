import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseMultiSelect from '@/components/BaseMultiSelect.vue'
import BaseFileInput from '@/components/BaseFileInput.vue'

export function resolveComponent(component) {
  const map = {
    input: BaseInput,
    select: BaseSelect,
    multiselect: BaseMultiSelect,
    file: BaseFileInput
  }

  return map[component]
}