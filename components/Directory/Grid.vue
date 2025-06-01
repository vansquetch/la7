<!-- components/CommerceGrid.vue -->
<script setup>
import { MapPin, Plus } from "lucide-vue-next";

const {
  comercios,
  loading,
  loadingMore,
  hasMore,
  totalComercios,
  user,
  categoriasFilter,
} = defineProps({
  comercios: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  loadingMore: {
    type: Boolean,
    default: false,
  },
  hasMore: {
    type: Boolean,
    default: false,
  },
  totalComercios: {
    type: Number,
    default: 0,
  },
  user: {
    type: Object,
    default: null,
  },
  categoriasFilter: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "load-more",
  "add-comercio",
  "edit-comercio",
  "delete-comercio",
]);

const loadMore = () => {
  emit("load-more");
};

const deleteComercio = () => {
  emit("delete-comercio");
};

const openForm = () => {
  emit("add-comercio");
};
</script>

<template>
  <div>
    <!-- Loading inicial -->
    <div
      v-if="loading && (comercios.length === 0 || categoriasFilter.length > 0)"
      class="text-center py-12"
    >
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="text-gray-600 mt-4">Cargando comercios...</p>
    </div>

    <!-- Grid con comercios -->
    <div v-else-if="comercios.length > 0">
      <!-- Grid de comercios -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ComerceCard
          v-for="comercio in comercios"
          :key="comercio.id"
          :comercio="comercio"
          @delete-comercio="deleteComercio"
        />
      </div>

      <!-- Sentinel para scroll infinito -->
      <div
        id="scroll-sentinel"
        class="h-20 w-full flex items-center justify-center"
        style="min-height: 80px"
      >
        <!-- Contenido visible para debug -->
        <div v-if="hasMore && !loadingMore" class="text-gray-400 text-sm">
          <!-- Scroll para cargar más -->
        </div>
      </div>

      <!-- Botón manual como fallback -->
      <div v-if="hasMore && !loadingMore" class="text-center py-6">
        <button
          class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          @click="loadMore"
        >
          Cargar más comercios
        </button>
      </div>

      <!-- Loading más comercios -->
      <div v-if="loadingMore" class="text-center py-8">
        <div class="bg-white rounded-lg shadow-md p-4 animate-pulse mb-4">
          <div class="h-48 bg-gray-200 rounded-lg mb-4"></div>
          <div class="h-4 bg-gray-200 rounded mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>

        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="text-gray-600 mt-2 text-sm">Cargando más comercios...</p>
      </div>

      <!-- Mensaje cuando no hay más -->
      <div v-else-if="!hasMore" class="text-center py-8">
        <p class="text-gray-500 text-sm">
          Has visto todos los comercios disponibles ({{ totalComercios }})
        </p>
      </div>
    </div>

    <!-- Estado vacío -->
    <div
      v-else-if="!loading && comercios.length === 0"
      class="text-center py-12"
    >
      <div class="text-gray-400 mb-4">
        <MapPin class="w-16 h-16 mx-auto" />
      </div>
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        No hay comercios registrados
      </h3>
      <p class="text-gray-600 mb-6">
        Comienza agregando el primer comercio al directorio
      </p>
      <button
        v-if="user"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="openForm"
      >
        <Plus class="w-5 h-5 mr-2" />
        Agregar Primer Comercio
      </button>
    </div>
  </div>
</template>
