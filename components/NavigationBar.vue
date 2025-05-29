<script setup lang="ts"></script>

<template>
  <nav class="flex justify-between p-4 shadow-lg items-center relative z-10">
    <div>
      <img src="../assets/img/logo.png" class="h-10" />
    </div>
    <div class="flex gap-8 items-center">
      <!-- <NavigationBarLink to="radio">Programación </NavigationBarLink>
      <NavigationBarLink to="coupons">Cupones </NavigationBarLink>
      <NavigationBarLink to="sales">Clasificados</NavigationBarLink> -->
      <NavigationBarLink to="/">
        <IconsHome />
        <span>Inicio</span>
      </NavigationBarLink>
      <NavigationBarLink to="directorio">
        <IconsBlocks />
        <span>Directorio</span>
      </NavigationBarLink>
      <AuthLogout />
    </div>
  </nav>
</template>

<style scoped></style>
