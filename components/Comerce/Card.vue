<script setup lang="ts">
import { Phone, Instagram, MapPin } from "lucide-vue-next";
import type { Comercio } from "~/lib/interfaces/comercio";

const { comercio } = defineProps<{
  comercio: Comercio;
}>();

const formatearWhatsApp = (numero: string) => {
  return numero ? `https://wa.me/${numero.replace(/[^0-9]/g, "")}` : "";
};

const formatearInstagram = (usuario: string) => {
  return usuario ? `https://instagram.com/${usuario.replace("@", "")}` : "";
};
</script>
<template>
  <div
    class="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
  >
    <!-- Imagen -->
    <div class="relative bg-gray-200">
      <img
        :src="comercio.image"
        :alt="comercio.name"
        class="w-full h-full object-cover"
      />
      <div class="absolute top-2 right-2 flex gap-2">
        <!-- <button
                class="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                @click="editarComercio(comercio)"
              >
                <Edit class="w-4 h-4 text-gray-600" />
              </button>
              <button
                class="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                @click="eliminarComercio(comercio.id)"
              >
                <Trash2 class="w-4 h-4 text-red-600" />
              </button>-->
      </div>
    </div>

    <!-- Contenido -->
    <div class="p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-2">
        {{ comercio.name }}
      </h3>

      <div class="flex items-start text-gray-600 mb-3">
        <MapPin class="w-4 h-4 mt-1 mr-2 flex-shrink-0" />
        <span class="text-sm">{{ comercio.ubicacion }}</span>
      </div>

      <p
        v-if="comercio.description"
        class="text-gray-700 text-sm mb-4 line-clamp-3"
      >
        {{ comercio.description }}
      </p>

      <!-- Enlaces sociales -->
      <div class="flex gap-3">
        <a
          v-if="comercio.whatsapp"
          :href="formatearWhatsApp(comercio.whatsapp)"
          target="_blank"
          class="inline-flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
        >
          <Phone class="w-4 h-4 mr-1" />
          WhatsApp
        </a>
        <a
          v-if="comercio.instagram"
          :href="formatearInstagram(comercio.instagram)"
          target="_blank"
          class="inline-flex items-center px-3 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm"
        >
          <Instagram class="w-4 h-4 mr-1" />
          Instagram
        </a>
      </div>
    </div>
  </div>
</template>
