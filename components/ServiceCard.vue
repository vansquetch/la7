<template>
  <div
    class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-8 group"
  >
    <div class="mb-6">
      <div
        :class="`w-16 h-16 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform`"
      >
        <component :is="icon" class="w-8 h-8 text-white" />
      </div>
    </div>

    <h3 class="text-xl font-bold text-gray-900 mb-4">{{ title }}</h3>
    <p class="text-gray-600 leading-relaxed">{{ description }}</p>

    <!-- <div class="mt-6">
      <button
        class="text-orange-600 font-semibold hover:text-orange-700 transition-colors"
      >
        Saber más →
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
const { title, description, icon, gradient } = defineProps<{
  title: string;
  description: string;
  icon: string | object;
  gradient: string;
}>();
</script>
