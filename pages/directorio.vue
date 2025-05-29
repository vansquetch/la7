<script setup>
import { ref, onMounted } from "vue";
import { MapPin, Plus, X, Save } from "lucide-vue-next";

// Estado reactivo
const comercios = ref([]);
const editingComercio = ref(null);
const loading = ref(false);
const supabase = useSupabaseClient();

// Formulario

// Funciones
const cargarComercios = async () => {
  loading.value = true;
  try {
    const { data: projects } = await supabase
      .from("comercios")
      .select("*")
      .order("created_at", { ascending: false });
    comercios.value = projects || [];
  } catch (error) {
    console.error("Error al cargar comercios:", error);
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  form.value = {
    name: "",
    image: "",
    ubicacion: "",
    description: "",
    whatsapp: "",
    instagram: "",
  };
  editingComercio.value = null;
};

const guardarComercio = async () => {
  loading.value = true;
  try {
    // Simula llamada a Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (editingComercio.value) {
      // Actualizar comercio existente
      const index = comercios.value.findIndex(
        (c) => c.id === editingComercio.value
      );
      if (index !== -1) {
        comercios.value[index] = { ...form.value, id: editingComercio.value };
      }
    } else {
      // Crear nuevo comercio
      const nuevoComercio = {
        ...form.value,
        id: Date.now(),
        created_at: new Date().toISOString(),
      };
      comercios.value.unshift(nuevoComercio);
    }

    showForm.value = false;
    resetForm();
  } catch (error) {
    console.error("Error al guardar comercio:", error);
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
  <div class="min-h-screen bg-orange-50 p-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 class="text-3xl font-bold text-gray-900">
              Directorio Comercial
            </h1>
            <p class="text-gray-600 mt-1">
              Descubre los mejores comercios de la ciudad
            </p>
          </div>
          <!-- <button
            class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            @click="abrirFormulario"
          >
            <Plus class="w-5 h-5 mr-2" />
            Agregar Comercio
          </button> -->
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
          class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          @click="abrirFormulario"
        >
          <Plus class="w-5 h-5 mr-2" />
          Agregar Primer Comercio
        </button>
      </div>
    </div>

    <!-- Modal del formulario -->
    <ComerceForm />
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
