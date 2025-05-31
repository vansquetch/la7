import type { Comercio } from "~/lib/interfaces/comercio";

export function useComercios() {
  const supabase = useSupabaseClient();
  const uploadComercePhoto = async (
    imageInput: HTMLInputElement | null,
    fileName: string
  ) => {
    if (imageInput && imageInput.files && imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const { data, error: uploadError } = await supabase.storage
        .from("comercios")
        .upload(`comercios/${fileName + "" + fileExtension}`, file, {
          cacheControl: "3600",
        });
      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        return null;
      }
      return data.path;
    }
    return null;
  };

  const saveComerce = async (comercio: Omit<Comercio, "id">) => {
    const { error } = await supabase
      .from("comercios")
      .insert(comercio as never)
      .select();
    if (error) console.log(error);
  };

  const loadFormComerce = (formValue: Omit<Comercio, "id">) => {
    const nuevoComercio = {
      ...formValue,
      slug: "",
    };
    nuevoComercio.slug = nuevoComercio.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return nuevoComercio;
  };

  const cachedCategorias = useState<{ label: string; value: string }[]>(
    "categorias-cache",
    () => []
  );

  const fetchCategorias = async () => {
    // Si ya existe el caché, lo retornamos
    if (cachedCategorias.value.length > 0) {
      return cachedCategorias.value;
    }

    try {
      const { data, error } = await supabase
        .from("categorias")
        .select("nombre, label")
        .overrideTypes<{ nombre: string; label: string }[]>();
      console.log("Cargando categorias...");
      if (error) {
        console.error("Error al cargar categorías:", error);
        return [];
      }

      const dataMap = data?.map((c) => ({
        label: c.nombre,
        value: c.label,
      }));

      // Guardar en caché
      cachedCategorias.value = dataMap ?? [];
      return cachedCategorias.value;
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      return [];
    }
  };

  const loadComercios = async (categorias = [], page = 1, limit = 6) => {
    const { data, count, hasMore } = await $fetch("/api/comercios", {
      query: {
        categorias: categorias.join(","),
        page,
        limit,
      },
    });

    return {
      comercios: data || [],
      total: count || 0,
      hasMore,
    };
  };

  return {
    uploadComercePhoto,
    saveComerce,
    loadFormComerce,
    fetchCategorias,
    loadComercios,
  };
}
