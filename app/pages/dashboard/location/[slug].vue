<script lang="ts" setup>
import type { FetchError } from "ofetch";

const route = useRoute();
const locationStore = useLocationStore();

const {
  currentLocation: location,
  currentLocationError: error,
  currentLocationStatus: status,
} = storeToRefs(locationStore);

const isOpen = ref<boolean>(false);
const deleteError = ref("");
const isDeleting = ref(false);

const loading = computed(() => status.value === "pending" || isDeleting.value);
const errorMessage = computed(() => error.value?.statusMessage || deleteError.value);

function openDialog() {
  isOpen.value = true;
  (document.activeElement as HTMLAnchorElement).blur();
}

async function confirmDelete() {
  try {
    isOpen.value = false;
    deleteError.value = "";
    isDeleting.value = true;

    await $fetch(`/api/locations/${route.params.slug}`, {
      method: "DELETE",
    });

    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    deleteError.value = getFetchErrorMessage(error);
  }

  isDeleting.value = false;
}

onMounted(() => {
  locationStore.refreshCurrentLocation();
});

onBeforeRouteUpdate((to) => {
  if (to.name === "dashboard-location-slug") {
    locationStore.refreshCurrentLocation();
  }
});
</script>

<template>
  <div class="p-4 min-h-64">
    <div v-if="loading">
      <div class="loading" />
    </div>
    <div v-if="errorMessage && !loading" class="alert alert-error">
      <h2 class="text-lg">
        {{ errorMessage }}
      </h2>
    </div>
    <div v-if="route.name === 'dashboard-location-slug' && location && !loading">
      <h2 class="text-xl">
        {{ location.name }}
        <div class="dropdown dropdown-bottom">
          <div
            tabindex="0"
            role="button"
            class="btn m-1 btn-sm p-0"
          >
            <Icon name="tabler:dots-vertical" size="20" />
          </div>
          <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm">
            <li>
              <NuxtLink @click="openDialog">
                <Icon name="tabler:trash-x-filled" size="20" />
                Xóa
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                :to="{
                  name: 'dashboard-location-slug-edit',
                  params: { slug: route.params.slug },
                }"
              >
                <Icon name="tabler:map-pin-cog" size="20" />
                Chỉnh sửa
              </NuxtLink>
            </li>
          </ul>
        </div>
      </h2>
      <p class="text-sm">
        {{ location.description }}
      </p>
      <div v-if="!location.locationLogs.length" class="mt-4">
        <p class="text-sm italic">
          Thêm 1 ghi chú cho địa điểm để bắt đầu.
        </p>
        <NuxtLink
          class="btn btn-primary mt-2"
          :to="{
            name: 'dashboard-location-slug-add',
            params: { slug: route.params.slug },
          }"
        >
          Thêm ghi chú địa điểm
          <Icon name="tabler:map-pin-plus" size="24" />
        </NuxtLink>
      </div>
    </div>
    <div v-if="route.name !== 'dashboard-location-slug'">
      <NuxtPage />
    </div>
    <AppDialog
      title="Bạn chắc chứ?"
      description="Xóa địa điểm này cũng sẽ xóa toàn bộ các ghi chú liên quan. Hành động này không thể hoàn tác. Bạn có chắc bạn muốn xóa?"
      confirm-label="Có! Xóa địa điểm này."
      confirm-class="btn-error"
      :is-open="isOpen"
      @on-closed="isOpen = false"
      @on-confirmed="confirmDelete"
    />
  </div>
</template>
