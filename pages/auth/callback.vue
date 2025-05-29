<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
      <div v-if="loading" class="space-y-4">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <p class="text-gray-600">Completando el inicio de sesión...</p>
      </div>

      <div v-else-if="error" class="space-y-4">
        <div class="text-red-500">
          <svg
            class="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">
          Error de autenticación
        </h2>
        <p class="text-gray-600">{{ error }}</p>
        <button
          @click="goToLogin"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Volver al login
        </button>
      </div>

      <div v-else class="space-y-4">
        <div class="text-green-500">
          <svg
            class="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h2 class="text-xl font-semibold text-gray-800">
          ¡Inicio de sesión exitoso!
        </h2>
        <p class="text-gray-600">Redirigiendo...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const supabase = useSupabaseClient();

const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    console.log("Procesando callback de OAuth...");

    // Obtener los parámetros de la URL
    const { data, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error en callback:", sessionError);
      error.value = sessionError.message;
      loading.value = false;
      return;
    }

    if (data.session) {
      console.log("Sesión establecida exitosamente:", data.session.user);

      // Esperar un momento para mostrar el mensaje de éxito
      setTimeout(async () => {
        await router.push("/dashboard");
      }, 1500);
    } else {
      // Si no hay sesión, podría ser que aún se esté procesando
      // Configurar un listener para capturar el cambio de estado
      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state en callback:", event, session);

          if (event === "SIGNED_IN" && session) {
            console.log("Usuario autenticado en callback:", session.user);

            setTimeout(async () => {
              await router.push("/dashboard");
            }, 1500);
          } else if (event === "SIGNED_OUT" || !session) {
            error.value = "No se pudo completar la autenticación";
            loading.value = false;
          }
        }
      );

      // Si después de 5 segundos no hay cambios, mostrar error
      setTimeout(() => {
        if (loading.value) {
          error.value = "Tiempo de espera agotado. Intenta nuevamente.";
          loading.value = false;
        }
      }, 5000);
    }
  } catch (err) {
    console.error("Error procesando callback:", err);
    error.value = err.message || "Error desconocido";
    loading.value = false;
  }
});

const goToLogin = () => {
  router.push("/login");
};
</script>
