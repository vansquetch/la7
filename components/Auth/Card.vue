<script setup lang="ts">
const { user } = useAuth();
</script>
<template>
  <div :class="$attrs.class">
    <div
      v-if="user"
      class="hover:text-orange-600 font-bold transition-colors text-gray-800 text-sm md:text-lg md:font-semibold"
    >
      <AuthLogout><span class="text-sm">Salir</span></AuthLogout>
    </div>
    <div
      v-else
      class="flex items-center space-x-4 text-gray-800 hover:text-orange-600 transition-colors"
    >
      <NuxtLink
        to="/login"
        class="flex items-center flex-col gap-1 text-lg md:text-xl"
        title="Iniciar sesión"
      >
        <IconsLogin />
        <span class="text-sm font-bold">Ingresar</span>
      </NuxtLink>
    </div>
  </div>
</template>
