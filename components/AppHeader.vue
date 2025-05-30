<template>
  <header class="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-2">
          <La7Logo class="h-10 w-auto" />
        </div>

        <div class="hidden md:flex items-center space-x-8">
          <a
            href="#servicios"
            class="text-gray-700 hover:text-orange-600 transition-colors"
            >Servicios</a
          >
          <a
            href="#plataforma"
            class="text-gray-700 hover:text-orange-600 transition-colors"
            >Plataforma</a
          >
          <a
            href="#comercio"
            class="text-gray-700 hover:text-orange-600 transition-colors"
            >Comercio</a
          >
          <a
            href="#contacto"
            class="text-gray-700 hover:text-orange-600 transition-colors"
            >Contacto</a
          >
        </div>

        <button class="md:hidden">
          <MenuIcon class="h-6 w-6" />
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import La7Logo from "./icons/La7Logo.vue";
import MenuIcon from "./icons/MenuIcon.vue";

// Importar componentes de iconos
</script>
