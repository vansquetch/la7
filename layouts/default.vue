<template>
  <div>
    <nav
      class="flex justify-between p-4 bg-gray-100 border shadow-md mb-4 items-center"
    >
      <div>
        <img src="../assets/img/logo.png" class="h-10" />
      </div>
      <div class="flex gap-2 items-center">
        <div class="border-b-4 p-4 hover:bg-amber-200">
          <NuxtLink to="radio">Radio</NuxtLink>
        </div>
        <div class="border-b-4 p-4 hover:bg-amber-200">
          <NuxtLink to="coupons">Cupones</NuxtLink>
        </div>
        <div class="border-b-4 p-4 hover:bg-amber-200">
          <NuxtLink to="sales">Clasificados</NuxtLink>
        </div>
      </div>
    </nav>

    <div class="p-4">
      <slot />
    </div>
  </div>
</template>
