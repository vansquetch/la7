<script setup lang="ts">
import FacebookIcon from "./icons/FacebookIcon.vue";
import InstagramIcon from "./icons/InstagramIcon.vue";
import SocialLink from "./SocialLink.vue";
</script>

<template>
  <footer class="bg-gray-900 text-white py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="col-span-1 md:col-span-2">
          <div
            class="h-12 w-12 rounded-full bg-white shadow-inner flex items-center justify-center mb-4"
          >
            <img src="../assets/img/logo.png" class="h-7" />
          </div>
          <p class="text-gray-400 mb-6 max-w-md">
            Conectando comunidades y comercios a través de un ecosistema digital
            integral.
          </p>
          <div class="flex space-x-4">
            <SocialLink href="#" :icon="FacebookIcon" />
            <SocialLink href="#" :icon="InstagramIcon" />
          </div>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Servicios</h3>
          <ul class="space-y-2 text-gray-400">
            <li>
              <a href="#" class="hover:text-white transition-colors"
                >Magazine</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors">Radio</a>
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors"
                >Comercio</a
              >
            </li>
            <li>
              <a href="#" class="hover:text-white transition-colors"
                >Social Media</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-4">Contacto</h3>
          <ul class="space-y-2 text-gray-400">
            <li>Medellín, Colombia</li>
            <li>la7magazine@gmail.com</li>
            <li>+57 (4) 123-4567</li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
      >
        <p>&copy; 2025 La7 MEDIA. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>
