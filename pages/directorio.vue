<script setup>
import { ref, onMounted } from "vue";
import { MapPin, Plus } from "lucide-vue-next";
import { ComerceCategoriaSelector, ComerceForm } from "#components";
import Popover from "~/components/ui/popover/Popover.vue";
import PopoverTrigger from "~/components/ui/popover/PopoverTrigger.vue";
import PopoverContent from "~/components/ui/popover/PopoverContent.vue";

// Estado reactivo
const comercios = ref([]);
const categoriasFilter = ref([]);
const loading = ref(false);
const { show: showForm } = useFormComerce();
const supabase = useSupabaseClient();
const user = useSupabaseUser();

const abrirFormulario = () => {
  showForm.value = true;
};

watch(
  categoriasFilter,
  () => {
    cargarComercios();
  },
  { deep: true }
);

const cargarComercios = async () => {
  loading.value = true;
  try {
    const query = supabase
      .from("comercios")
      .select("*")
      .order("created_at", { ascending: false });
    if (categoriasFilter.value.length > 0)
      query.overlaps("categorias", categoriasFilter.value);

    const { data: projects } = await query;
    comercios.value = projects || [];
  } catch (error) {
    console.error("Error al cargar comercios:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  cargarComercios();
});

useHead({ title: "La7 >> Directorio" });
</script>

<template>
  <ContainerApp>
    <!-- Header -->
    <div class="flex justify-end">
      <button
        v-if="user"
        class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        @click="abrirFormulario"
      >
        <Plus class="w-5 h-5 mr-2" />
        Agregar Comercio
      </button>
    </div>
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
        <div class="flex items-center gap-2">
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
              <ComerceCategoriaSelector v-model="categoriasFilter" />
              <button
                v-if="categoriasFilter.length > 0"
                class="underline text-sm text-orange-600 hover:text-orange-700"
              >
                limpiar filtro
              </button>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading && comercios.length === 0" class="text-center py-12">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
      ></div>
      <p class="text-gray-600 mt-4">Cargando comercios...</p>
    </div>

    <!-- Grid de comercios -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ComerceCard
        v-for="comercio in comercios"
        :key="comercio.id"
        :comercio="comercio"
      />
    </div>

    <!-- Estado vacío -->
    <div v-if="!loading && comercios.length === 0" class="text-center py-12">
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
        @click="abrirFormulario"
      >
        <Plus class="w-5 h-5 mr-2" />
        Agregar Primer Comercio
      </button>
    </div>

    <!-- Modal del formulario -->
    <ComerceForm v-if="user" @add-comercio="cargarComercios" />
  </ContainerApp>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
