<script setup lang="ts">
import { ComerceCategoriaSelector } from "#components";
import Popover from "~/components/ui/popover/Popover.vue";
import PopoverTrigger from "~/components/ui/popover/PopoverTrigger.vue";
import PopoverContent from "~/components/ui/popover/PopoverContent.vue";
const { categoriasFilter, allCoincidence } = useCategoria();

const clearFilter = () => {
  categoriasFilter.value = [];
};
</script>
<template>
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
        <p class="text-gray-800 pb-2 text-sm">Filtra por tipo de comercio</p>
        <ComerceCategoriaSelector
          :model-value="categoriasFilter"
          @update:model-value="(value:never)=>categoriasFilter=value"
        />
        <div class="flex items-center space-x-2 mt-2">
          <input
            id="all-considence-checkbox"
            v-model="allCoincidence"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-400 transition"
          />
          <label for="all-considence-checkbox" class="text-xs text-gray-700">
            Coincidir todas las categorías
          </label>
        </div>
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
</template>
