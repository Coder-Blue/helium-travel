<script lang="ts" setup>
const authStore = useAuthStore();
</script>

<template>
  <div class="hero bg-base-300 container mx-auto mt-4">
    <div class="hero-content text-center min-h-96">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold">
          Helium Travel
        </h1>
        <p class="py-6">
          Theo dõi hành trình và cuộc phiêu lưu của bạn với ứng dụng nhật ký du lịch đơn giản này. Thêm địa điểm, ảnh và ghi chú để tạo nhật ký kỹ thuật số về hành trình của bạn.
        </p>
        <AuthButton v-if="!authStore.user" />
        <NuxtLink
          v-else
          to="/dashboard"
          class="btn btn-primary"
        >
          Bắt Đầu Du Lịch
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
