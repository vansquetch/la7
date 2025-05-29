<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};
</script>

<template>
  <button
    v-if="user"
    class="flex space-x-1 hover:text-orange-600 font-bold transition hover:scale-105 cursor-pointer"
    title="Cerrar sesión"
    @click="logout"
  >
    <IconsLogout />
  </button>
</template>
