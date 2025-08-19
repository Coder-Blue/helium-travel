<script lang="ts" setup>
import { CENTER_DALAT } from "~/lib/constants";
import { InsertLocation } from "~/lib/db/schema";

const props = defineProps<{
  initialValues?: InsertLocation;
  onSubmit: (location: InsertLocation) => Promise<any>;
  onSubmitComplete: () => void;
  submitLabel: string;
  submitIcon: string;
  zoom?: number;
}>();
</script>

<template>
  <LocationBaseForm
    v-slot="{ errors, loading }"
    :schema="InsertLocation"
    :initial-values="props.initialValues || {
      name: '',
      description: '',
      long: (CENTER_DALAT as [number, number])[0],
      lat: (CENTER_DALAT as [number, number])[1],
    }"
    :zoom="props.zoom || 6"
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
  </LocationBaseForm>
</template>
