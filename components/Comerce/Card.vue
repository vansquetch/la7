<script setup lang="ts">
import { Phone, Instagram, MapPin } from "lucide-vue-next";
import type { Comercio } from "~/lib/interfaces/comercio";

const supabase = useSupabaseClient();
const { comercio } = defineProps<{
  comercio: Comercio;
}>();

const {
  data: { publicUrl: image },
} = supabase.storage.from("comercios").getPublicUrl(comercio.image);
const formatearWhatsApp = (numero: string) => {
  return numero ? `https://wa.me/${numero.replace(/[^0-9]/g, "")}` : "";
};

const formatearInstagram = (usuario: string) => {
  return usuario ? `https://instagram.com/${usuario.replace("@", "")}` : "";
};
</script>
<template>
  <div class="rounded-lg overflow-hidden">
    <!-- Imagen -->
    <div class="w-full flex justify-center">
      <div class="rounded-t-2xl overflow-hidden inline-block m-auto">
        <img :src="image" :alt="comercio.name" class="h-80 object-cover" />
      </div>
    </div>

    <!-- Contenido -->
    <div
      class="p-6 bg-white hover:shadow-xl transition-shadow shadow-md h-full rounded-b"
    >
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
