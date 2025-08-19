<script lang="ts" setup>
import { CENTER_DALAT } from "~/lib/constants";
import { InsertLocationLog } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocationLog;
  onSubmit: (location: InsertLocationLog) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
}>();

const initialValues = {
  name: "",
  description: "",
  startedAt: Date.now() - (24 * 60 * 60 * 1000),
  endedAt: Date.now(),
  long: (CENTER_DALAT as [number, number])[0],
  lat: (CENTER_DALAT as [number, number])[1],
};
</script>

<template>
  <LocationBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertLocationLog"
    :initial-values="props.initialValues || initialValues"
    :zoom="11"
    :on-submit
    :on-submit-complete
    :submit-label
    :submit-icon
  >
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
    <AppDateFormField
      name="startedAt"
      label="Bắt đầu lúc"
      :value="initialValues.startedAt"
      :error="errors.startedAt"
      :disabled="loading"
    />
    <AppDateFormField
      name="endedAt"
      label="Kết thúc lúc"
      :value="initialValues.endedAt"
      :error="errors.endedAt"
      :disabled="loading"
    />
  </LocationBaseForm>
</template>
