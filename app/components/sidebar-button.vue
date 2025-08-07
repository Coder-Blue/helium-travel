<script lang="ts" setup>
const props = defineProps<{
  href: string;
  showLabel: boolean;
  label: string;
  icon: string;
  iconColor?: "text-accent" | "text-primary" | "text-secondary";
}>();

const route = useRoute();
</script>

<template>
  <div
    class="tooltip-right"
    :class="{ tooltip: !props.showLabel }"
    :data-tip="showLabel ? undefined : props.label"
  >
    <NuxtLink
      :to="props.href"
      :class="{ 'bg-base-200': route.path === props.href, 'justify-center': !showLabel, 'justify-start': showLabel }"
      class="flex flex-nowrap gap-2 p-2 hover:bg-base-300 cursor-pointer"
    >
      <Icon
        :name="props.icon"
        size="24"
        :class="iconColor"
      />
      <Transition name="grow">
        <span v-if="showLabel">{{ props.label }}</span>
      </Transition>
    </NuxtLink>
  </div>
</template>

<style>
.grow-enter-active {
  animation: grow 0.1s;
}

.grow-leave-active {
  animation: grow 0.1s reverse;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
