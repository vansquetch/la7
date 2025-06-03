import type { ComercioEdit } from "~/lib/interfaces/comercio";

export const useFormComerce = () => {
  const show = useState("showFormComerce", () => false);
  const categorias = ref<string[]>([]);
  const editingComercio = useState<null | number>(
    "formComercioEditing",
    () => null
  );
  const defaultForm: ComercioEdit = {
    name: "",
    image: "",
    ubicacion: "",
    description: "",
    whatsapp: "",
    instagram: "",
    categorias: [],
    location: {
      lat: 0,
      lng: 0,
      address: "",
    },
  };
  const form = useState("formComercio", () => defaultForm);
  const loadFormComerce = (comercio: ComercioEdit, id: number) => {
    editingComercio.value = id;
    form.value = { ...comercio };
    categorias.value = form.value.categorias ?? [];
  };

  const resetForm = () => {
    form.value = { ...defaultForm };
    editingComercio.value = null;
  };

  const toggle = () => {
    show.value = !show.value;
  };
  return {
    show,
    toggle,
    editingComercio,
    form,
    resetForm,
    loadFormComerce,
    categorias,
  };
};
