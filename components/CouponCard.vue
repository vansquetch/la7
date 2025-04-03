<script setup>
const { coupon } = defineProps({
  coupon: {
    type: Object,
    required: false,
    default: () => ({
      storeName: "Café Delicioso",
      availableCoupons: 15,
      shortPremio: "Gaseosa gratuita",
      storeImage:
        "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      description:
        "Disfruta de un 25% de descuento en todos nuestros productos de café gourmet. Válido de lunes a viernes.",
    }),
  },
});
</script>

<template>
  <div
    class="max-w-md rounded-lg border bg-card text-card-foreground shadow-sm"
  >
    <div class="relative">
      <img
        :src="coupon.storeImage"
        :alt="coupon.storeName"
        class="w-full h-48 object-cover rounded-t-lg"
      />
      <div
        class="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full"
      >
        {{ coupon.availableCoupons }} disponibles
      </div>
    </div>
    <div class="p-6">
      <div class="flex justify-between items-center">
        <h3 class="text-2xl font-semibold tracking-tight mb-2">
          {{ coupon.storeName }}
        </h3>
        <span
          class="bg-yellow-500 p-2 text-2xl rounded-xl text-white max-w-36 text-center"
          >{{ coupon.shortPremio }}</span
        >
      </div>

      <p class="text-sm text-muted-foreground">{{ coupon.description }}</p>
      <div class="mt-4 flex justify-between items-center">
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          Obtener cupón
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          Ver detalles
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
