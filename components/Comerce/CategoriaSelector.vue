<script setup lang="ts">
import { useFilter } from "reka-ui";
import { computed, ref, watch, onMounted } from "vue";
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from "@/components/ui/tags-input";

const categorias = ref<{ label: string; value: string }[]>([]);
// ✅ Solución: Especificar valor por defecto como función para evitar referencias compartidas
const modelValue = defineModel<string[]>({ default: () => [] });
const open = ref(false);
const searchTerm = ref("");

const emit = defineEmits(["update:modelValue"]);

const { contains } = useFilter({ sensitivity: "base" });
const { fetchCategorias, createCategoria } = useCategoria();

const filteredCategorias = computed(() => {
  const options = categorias.value.filter(
    (i) => !modelValue.value?.includes(i.value)
  );
  return searchTerm.value
    ? options.filter((option) => contains(option.label, searchTerm.value))
    : options;
});

const manageSelect = (ev: CustomEvent) => {
  console.log("manage select fired");
  if (typeof ev.detail.value === "string") {
    searchTerm.value = "";
    // ✅ Crear nuevo array en lugar de mutar el existente
    modelValue.value = [...(modelValue.value || []), ev.detail.value];
  }

  if (filteredCategorias.value.length === 0) {
    open.value = false;
  }
};

const manageSearchInput = (ev: KeyboardEvent) => {
  if (filteredCategorias.value.length === 0) {
    if (ev.key == "Enter") {
      createCategoria(searchTerm.value);
      // ✅ Crear nuevo array en lugar de mutar el existente
      modelValue.value = [...(modelValue.value || []), searchTerm.value];
      searchTerm.value = "";
    }
  }
};

// 🚀 Emite cambios hacia el padre cada vez que modelValue cambie
watch(
  modelValue,
  (newVal) => {
    emit("update:modelValue", newVal);
  },
  { deep: true }
); // ✅ Agregar deep: true para detectar cambios en arrays

onMounted(async () => {
  categorias.value = await fetchCategorias();
});
</script>

<template>
  <Combobox
    v-model="modelValue"
    v-model:open="open"
    class="w-full"
    :ignore-filter="true"
  >
    <ComboboxAnchor as-child>
      <TagsInput v-model="modelValue" class="px-2 gap-2 w-full">
        <div class="flex gap-2 flex-wrap items-center">
          <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
            <TagsInputItemText />
            <TagsInputItemDelete />
          </TagsInputItem>
        </div>

        <ComboboxInput v-model="searchTerm" as-child>
          <TagsInputInput
            placeholder="Categorías..."
            class="w-full p-0 border-none focus-visible:ring-0 h-auto"
            @keydown.enter.prevent="manageSearchInput"
            @click="open = true"
          />
        </ComboboxInput>
      </TagsInput>

      <ComboboxList class="w-[--reka-popper-anchor-width]">
        <ComboboxEmpty />
        <ComboboxGroup class="max-h-52 overflow-y-auto">
          <ComboboxItem
            v-for="categoria in filteredCategorias"
            :key="categoria.value"
            :value="categoria.value"
            @select.prevent="manageSelect"
          >
            {{ categoria.label }}
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </ComboboxAnchor>
  </Combobox>
</template>
