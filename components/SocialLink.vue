<template>
  <a
    :href="href"
    class="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
  >
    <component :is="icon" class="w-5 h-5" />
  </a>
</template>

<script setup lang="ts">
const { icon, href } = defineProps<{
  href: string;
  icon: object | string;
}>();
</script>
