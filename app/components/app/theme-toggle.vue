<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(value) {
    return colorMode.preference = value ? "dark" : "light";
  },
});
</script>

<template>
  <label class="swap swap-rotate mx-4">
    <input v-model="isDark" type="checkbox">
    <Icon
      name="tabler:sun"
      size="24"
      class="swap-on"
    />
    <Icon
      name="tabler:moon"
      size="24"
      class="swap-off"
    />
  </label>
</template>
