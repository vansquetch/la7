<template>
  <section id="servicios" class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Nuestros Servicios
        </h2>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Una plataforma integral que conecta comunidades, comercios y creadores
          de contenido
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Magazine -->
        <ServiceCard
          v-for="service in services"
          :key="service.id"
          :title="service.title"
          :description="service.description"
          :icon="service.icon"
          :gradient="service.gradient"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ServiceCard from "./ServiceCard.vue";

// Props para los servicios
const { services } = useServices();
</script>
