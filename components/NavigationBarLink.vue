<script setup lang="ts">
const { to } = defineProps<{
  to: string;
}>();
</script>

<template>
  <div
    class="text-sm md:text-lg text-gray-600 md:text-black md:font-bold hover:text-orange-600 transition hover:scale-105"
  >
    <NuxtLink :to="to" class="flex flex-col md:flex-row items-center gap-1">
      <slot />
    </NuxtLink>
  </div>
</template>
