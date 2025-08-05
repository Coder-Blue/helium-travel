<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <button
    class="btn btn-accent"
    :disabled="authStore.loading"
    @click="authStore.signIn"
  >
    Đăng Nhập Với Google
    <span v-if="authStore.loading" class="loading loading-spinner loading-md" />
    <Icon
      v-else
      name="tabler:brand-google-filled"
      size="24"
    />
  </button>
</template>
