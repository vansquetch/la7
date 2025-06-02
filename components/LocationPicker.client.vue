<!-- components/LocationPicker.vue -->
<script setup lang="ts">
import { ref, watch, onUnmounted, nextTick } from "vue";

const props = defineProps<{
  modelValue: {
    lat: number;
    lng: number;
    address?: string;
  };
  required?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

// Estados
const mapContainer = ref(null);
const mapInstance = ref(null);
const showMap = ref(false);
const searchQuery = ref("");
const isLoading = ref(false);
const searchResults = ref([]);
const currentMarker = ref(null);

// Posición por defecto (Medellín, Colombia)
const defaultCenter = ref([6.275207, -75.594549]);
const selectedLocation = ref({
  lat: props.modelValue?.lat || null,
  lng: props.modelValue?.lng || null,
  address: "",
});

// Actualizar valor cuando cambie la prop
watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue) {
      selectedLocation.value = { ...newValue };
      updateMapMarker();
    }
  },
  { deep: true }
);

// Emitir cambios
const updateLocation = () => {
  emit("update:modelValue", { ...selectedLocation.value });
};

// Inicializar mapa
const initMap = async () => {
  if (!mapContainer.value || mapInstance.value) return;

  try {
    // Cargar Leaflet desde CDN
    if (!window.L) {
      await loadLeaflet();
    }

    const L = window.L;

    const center =
      selectedLocation.value.lat && selectedLocation.value.lng
        ? [selectedLocation.value.lat, selectedLocation.value.lng]
        : defaultCenter.value;

    mapInstance.value = L.map(mapContainer.value).setView(center, 18);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapInstance.value);

    // Agregar evento de click
    mapInstance.value.on("click", handleMapClick);

    // Agregar marcador si hay ubicación seleccionada
    updateMapMarker();
  } catch (error) {
    console.error("Error inicializando mapa:", error);
  }
};

// Cargar Leaflet desde CDN
const loadLeaflet = () => {
  return new Promise((resolve, reject) => {
    if (window.L) {
      resolve(window.L);
      return;
    }

    // Cargar CSS
    const cssLink = document.createElement("link");
    cssLink.rel = "stylesheet";
    cssLink.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(cssLink);

    // Cargar JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.onload = () => resolve(window.L);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Actualizar marcador en el mapa
const updateMapMarker = async () => {
  if (!mapInstance.value || !window.L) return;

  const L = window.L;

  // Remover marcador anterior
  if (currentMarker.value) {
    mapInstance.value.removeLayer(currentMarker.value);
    currentMarker.value = null;
  }

  // Agregar nuevo marcador si hay ubicación
  if (selectedLocation.value.lat && selectedLocation.value.lng) {
    try {
      currentMarker.value = L.marker([
        selectedLocation.value.lat,
        selectedLocation.value.lng,
      ]).addTo(mapInstance.value).bindPopup(`
          <div style="font-size: 12px;">
            <strong>Ubicación seleccionada</strong><br/>
            ${selectedLocation.value.address}
          </div>
        `);

      mapInstance.value.setView(
        [selectedLocation.value.lat, selectedLocation.value.lng],
        20
      );
    } catch (error) {
      console.error("Error creando marcador:", error);
    }
  }
};

// Destruir mapa
const destroyMap = () => {
  if (mapInstance.value) {
    mapInstance.value.remove();
    mapInstance.value = null;
    currentMarker.value = null;
  }
};

// Obtener ubicación actual del usuario
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    isLoading.value = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        selectedLocation.value = {
          lat,
          lng,
          address: "Ubicación actual",
        };

        updateLocation();
        updateMapMarker();
        isLoading.value = false;
      },
      (error) => {
        console.error("Error obteniendo ubicación:", error);
        isLoading.value = false;
      }
    );
  }
};

// Manejar click en el mapa
const handleMapClick = async (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  // Obtener dirección usando reverse geocoding
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
    );
    const result = await response.json();

    selectedLocation.value = {
      lat,
      lng,
      address: result.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    };
  } catch (error) {
    selectedLocation.value = {
      lat,
      lng,
      address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    };
    console.error("Error obteniendo dirección:", error);
  }

  updateLocation();
  updateMapMarker();
};

// Abrir/cerrar mapa
const toggleMap = async () => {
  showMap.value = !showMap.value;

  if (showMap.value) {
    await nextTick();
    initMap();
  } else {
    destroyMap();
  }
};

// Limpiar ubicación
const clearLocation = () => {
  selectedLocation.value = { lat: null, lng: null, address: "" };
  updateLocation();
  searchResults.value = [];
  searchQuery.value = "";

  if (currentMarker.value && mapInstance.value) {
    mapInstance.value.removeLayer(currentMarker.value);
    currentMarker.value = null;
  }
};

// Lifecycle hooks
onUnmounted(() => {
  destroyMap();
});
</script>

<template>
  <div class="space-y-4">
    <!-- Input de ubicación -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Ubicación del comercio
        <span v-if="required" class="text-red-500">*</span>
      </label>

      <!-- Ubicación seleccionada -->
      <div
        v-if="selectedLocation.lat && selectedLocation.lng"
        class="bg-green-50 border border-green-200 rounded-lg p-3 mb-3"
      >
        <div class="flex items-start justify-between">
          <div class="flex items-start space-x-2">
            <IconsMapPin class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p class="text-sm font-medium text-green-800">
                Ubicación seleccionada
              </p>
              <p class="text-xs text-green-600 mt-1">
                {{ selectedLocation.address }}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {{ selectedLocation.lat.toFixed(6) }},
                {{ selectedLocation.lng.toFixed(6) }}
              </p>
            </div>
          </div>
          <button
            type="button"
            class="text-green-600 hover:text-green-800"
            @click="clearLocation"
          >
            <IconsX class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Botones de acción -->
      <div class="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          :disabled="isLoading"
          @click="getCurrentLocation"
        >
          <IconsMapPin class="w-4 h-4 mr-2" />
          Mi ubicación
        </button>

        <button
          type="button"
          class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          @click="toggleMap"
        >
          {{ showMap ? "Ocultar mapa" : "Abrir mapa" }}
        </button>
      </div>
    </div>

    <!-- Mapa -->
    <div v-if="showMap" class="border rounded-lg overflow-hidden">
      <div
        ref="mapContainer"
        class="w-full h-96"
        style="min-height: 400px"
      ></div>
    </div>
  </div>
</template>

<style scoped>
/* Asegurar que el contenedor del mapa tenga dimensiones */
.map-container {
  height: 400px;
  width: 100%;
}
</style>
