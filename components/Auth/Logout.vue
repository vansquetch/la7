<script setup lang="ts">
const { logout } = useAuth();
useLocation().activeLocation.value = false;
useLike().filterLike.value = false;
</script>

<template>
  <button
    class="flex items-center flex-col gap-1 space-x-1 hover:scale-105 cursor-pointer"
    title="Cerrar sesión"
    @click="logout"
  >
    <IconsLogout class="m-0" />
    <span class="text-sm">Salir</span>
  </button>
</template>
