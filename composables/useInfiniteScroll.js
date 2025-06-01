// composables/useInfiniteScroll.js
import { ref, onUnmounted, nextTick } from "vue";
import { useDebounceFn } from "@vueuse/core";

export function useInfiniteScroll(loadFunction, options = {}) {
  const {
    pageSize = 10,
    debounceTime = 1200,
    rootMargin = "100px",
    threshold = 0.1,
    sentinelId = "scroll-sentinel",
  } = options;

  // Estados reactivos
  const items = ref([]);
  const loading = ref(true);
  const loadingMore = ref(false);
  const currentPage = ref(1);
  const hasMore = ref(true);
  const totalItems = ref(0);
  const observer = ref(null);

  // Función para cargar items
  const loadItems = async (reset = false, ...extraParams) => {
    if (reset) {
      loading.value = true;
      currentPage.value = 1;
      items.value = [];
    } else {
      loadingMore.value = true;
    }

    try {
      const result = await loadFunction(
        currentPage.value,
        pageSize,
        ...extraParams
      );

      if (reset) {
        items.value = result.items || result.data || [];
      } else {
        items.value = [...items.value, ...(result.items || result.data || [])];
      }

      hasMore.value = result.hasMore ?? false;
      totalItems.value = result.total ?? items.value.length;

      // Configurar observer después de cargar items
      if (items.value.length > 0) {
        await nextTick();
        setupInfiniteScroll();
      }
    } catch (error) {
      console.error("Error loading items:", error);
      throw error;
    } finally {
      loading.value = false;
      loadingMore.value = false;
    }
  };

  // Función para cargar más items
  const loadMore = async (...extraParams) => {
    if (loadingMore.value || !hasMore.value) return;

    currentPage.value++;
    await loadItems(false, ...extraParams);
  };

  // Configurar intersection observer
  const setupInfiniteScroll = () => {
    // Desconectar observer anterior si existe
    if (observer.value) {
      observer.value.disconnect();
    }

    observer.value = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore.value && !loadingMore.value) {
          console.log("🔄 Loading more items...");
          loadMore();
        }
      },
      {
        rootMargin,
        threshold,
      }
    );

    const sentinel = document.getElementById(sentinelId);
    if (sentinel) {
      observer.value.observe(sentinel);
      console.log("👀 Observer configured on sentinel");
    } else {
      console.warn("❌ Sentinel not found");
    }
  };

  // Función debounced para reset
  const debouncedReset = useDebounceFn(
    (...params) => loadItems(true, ...params),
    debounceTime
  );

  // Cleanup
  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  // Reset function
  const reset = (...params) => {
    loading.value = true;
    hasMore.value = true;
    debouncedReset(...params);
  };

  return {
    // Estados
    items,
    loading,
    loadingMore,
    hasMore,
    totalItems,
    currentPage,

    // Funciones
    loadItems,
    loadMore,
    reset,
    setupInfiniteScroll,
  };
}
