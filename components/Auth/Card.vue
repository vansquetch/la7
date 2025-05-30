<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
  <div :class="$attrs.class">
    <div
      v-if="user"
      class="flex items-center space-x-4 text-gray-800 text-sm md:text-lg md:font-semibold"
    >
      <AuthLogout />
    </div>
    <div v-else class="flex items-center space-x-4">
      <NuxtLink
        to="/login"
        class="text-lg md:text-xl text-gray-800 hover:text-orange-600 transition-colors"
        title="Iniciar sesión"
      >
        <IconsLogin />
      </NuxtLink>
    </div>
  </div>
</template>
