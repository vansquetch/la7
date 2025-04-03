<script setup lang="ts">
interface couponType {
  storeName: string;
  availableCoupons: number;
  shortPremio: string;
  storeImage: string;
  description: string;
}
const { coupon } = defineProps<{
  coupon: couponType;
}>();
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
