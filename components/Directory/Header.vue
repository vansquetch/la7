<script setup>
import { Plus } from "lucide-vue-next";
import { ComerceCategoriaSelector } from "#components";
import Popover from "~/components/ui/popover/Popover.vue";
import PopoverTrigger from "~/components/ui/popover/PopoverTrigger.vue";
import PopoverContent from "~/components/ui/popover/PopoverContent.vue";

const { user, categoriasFilter } = defineProps({
  user: {
    type: Object,
    default: null,
  },
  categoriasFilter: {
    type: Array,
    required: true,
  },
});

const { show: showForm, resetForm } = useFormComerce();

const emit = defineEmits(["add-comercio", "update:categoriasFilter"]);

const updateFilter = (value) => {
  emit("update:categoriasFilter", value);
};

const clearFilter = () => {
  emit("update:categoriasFilter", []);
};

const createComerce = () => {
  showForm.value = true;
};
</script>

<template>
  <div>
    <!-- Botón agregar comercio -->
    <div class="flex justify-end">
      <button
        v-if="user"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="createComerce"
      >
        <Plus class="w-5 h-5 mr-2" />
        Agregar Comercio
      </button>
    </div>

    <!-- Header con título y filtros -->
    <div class="p-4 mb-2">
      <div class="flex flex-row justify-between items-center gap-4">
        <div>
          <h1 class="text-xl md:text-4xl font-bold text-gray-900 mb-1">
            Directorio
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600"
            >
              Comercial
            </span>
          </h1>
          <p class="text-gray-600 mt-1">
            Descubre los comercios de la comunidad
          </p>
        </div>

        <!-- Filtros -->
        <div class="flex items-center gap-2">
          <client-only>
            <Popover>
              <PopoverTrigger>
                <button
                  class="relative inline-flex items-center justify-center cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300 transition-colors w-10 h-10"
                >
                  <div
                    v-if="categoriasFilter.length > 0"
                    class="rounded-full bg-gray-800 text-white text-sm flex items-center justify-center w-4 h-4 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
                  >
                    {{ categoriasFilter.length }}
                  </div>
                  <IconsFilter />
                </button>
              </PopoverTrigger>
              <PopoverContent>
                <h3 class="font-bold text-lg">Filtro</h3>
                <p class="text-gray-800 pb-2 text-sm">
                  Filtra por tipo de comercio
                </p>
                <ComerceCategoriaSelector
                  :model-value="categoriasFilter"
                  @update:model-value="updateFilter"
                />
                <button
                  v-if="categoriasFilter.length > 0"
                  class="underline text-sm text-orange-600 hover:text-orange-700"
                  @click="clearFilter"
                >
                  limpiar filtro
                </button>
              </PopoverContent>
            </Popover>
            <template #fallback>
              <div
                class="bg-gray-200 rounded-full hover:bg-gray-300 w-10 h-10 animate-pulse"
              ></div>
            </template>
          </client-only>
        </div>
      </div>
    </div>
  </div>
</template>
