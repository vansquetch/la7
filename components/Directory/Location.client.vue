<script setup lang="ts">
import { getCurrentLocation } from "~/lib/utils";
const { setCurrentLocation, activeLocation } = useLocation();
const handleLocation = async () => {
  const geoPermission = await navigator.permissions.query({
    name: "geolocation",
  });
  if (activeLocation.value) {
    if (geoPermission.state === "granted") {
      if (
        !confirm(
          "¿Actualizar la ubicación actual? Si cancela, se desactivará la ubicación."
        )
      ) {
        activeLocation.value = false;
        return;
      }
    }
  }

  if (geoPermission.state === "denied") {
    alert(
      "La ubicación está desactivada. Por favor, activa la ubicación en la configuración del navegador."
    );
    return;
  }
  if (geoPermission.state === "prompt") {
    if (
      !confirm(
        "¿Deseas activar la ubicación actual? Esto permitirá mostrar los comercios cercanos."
      )
    )
      return;
  }

  try {
    const position = await getCurrentLocation();
    setCurrentLocation({
      lat: position?.coords.latitude ?? 0,
      lng: position?.coords.longitude ?? 0,
    });
    activeLocation.value = true;
  } catch (error) {
    console.error("Error al obtener la ubicación:", error);
    activeLocation.value = false;
  }
};
</script>
<template>
  <button
    :class="{
      'bg-gray-200 text-gray-800 hover:bg-blue-300': !activeLocation,
      'bg-blue-700 text-white hover:bg-blue-500': activeLocation,
    }"
    class="inline-flex items-center justify-center rounded-full transition-colors w-10 h-10"
    @click="handleLocation"
  >
    <IconsMapPin />
  </button>
</template>
