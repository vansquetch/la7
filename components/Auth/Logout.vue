<script setup lang="ts">
const { logout } = useAuth();
useLocation().activeLocation.value = false;
useLike().filterLike.value = false;
</script>

<template>
  <button
    class="flex space-x-1 hover:text-orange-600 font-bold transition hover:scale-105 cursor-pointer"
    title="Cerrar sesión"
    @click="logout"
  >
    <IconsLogout />
  </button>
</template>
