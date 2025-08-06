<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { InsertLocation } from "~/lib/db/schema";

const { $csrfFetch } = useNuxtApp();

const router = useRouter();

const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");

const { handleSubmit, errors, meta, setErrors } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || "Lỗi bất ngờ đã xảy ra.";
    loading.value = false;
  }
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Bạn có chắc chắn bạn muốn rời đi? Tất cả các thay đổi chưa lưu sẽ bị mất!");

    if (!confirm)
      return false;

    return true;
  }
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Thêm Địa Điểm
      </h1>
      <p class="text-sm">
        Địa điểm là nơi bạn đã hoặc sẽ đến. Đó có thể là một thành phố, quốc gia, tiểu bang hoặc điểm tham quan. Bạn có thể thêm thời gian cụ thể đã đến địa điểm này sau khi thêm địa điểm.
      </p>
    </div>
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Tên"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Mô tả"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />
      <AppFormField
        name="lat"
        label="Vĩ độ"
        :error="errors.lat"
        :disabled="loading"
      />
      <AppFormField
        name="long"
        label="Kinh độ"
        :error="errors.long"
        :disabled="loading"
      />
      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          class="btn btn-outline"
          @click="router.back()"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Hủy
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="btn btn-primary"
        >
          Thêm
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
