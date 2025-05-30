<!-- pages/index.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
    <!-- Header -->
    <!-- <AppHeader /> -->

    <!-- Hero Section -->
    <HeroSection />

    <!-- Services Overview -->
    <ServiceOverview />

    <!-- CTA Section -->
    <CtaSection />
  </div>
</template>

<script setup>
// Meta tags para SEO
useHead({
  title: "La7 >> Conectando Comercios, Comunidades y Creadores",
  meta: [
    {
      name: "description",
      content:
        "Plataforma integral de medios digitales: Comercios, Comunidades y Creadores.",
    },
  ],
});
</script>
