<template>
  <select v-model="setModelValue" @change="changeOption">
    <option disabled value="">Выберите из списка</option>
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts" setup name="my-select">
import { useMainStore } from "@/store/store";
const props = defineProps({
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
});
let setModelValue = modelValue;
  const emit = defineEmits(['update:modelValue']);
  const changeOption = (event) => {
      emit('update:modelValue', event.target.value);
    }
  

</script>

<style scoped>

</style>
