<script setup lang="ts">
const { to } = defineProps<{
  to: string;
}>();
</script>

<template>
  <div
    class="text-lg font-bold hover:text-orange-600 transition hover:scale-105"
  >
    <NuxtLink :to="to" class="flex items-center gap-1">
      <slot />
    </NuxtLink>
  </div>
</template>
