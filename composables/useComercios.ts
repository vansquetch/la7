import type { Comercio, ComercioEdit } from "~/lib/interfaces/comercio";

export function useComercios() {
  const supabase = useSupabaseClient();
  const uploadComercePhoto = async (
    imageInput: HTMLInputElement | null,
    fileName: string
  ) => {
    if (imageInput && imageInput.files && imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const { data, error: uploadError } = await supabase.storage
        .from("comercios")
        .upload(`comercios/${fileName}`, file, {
          cacheControl: "3600",
          upsert: true,
        });
      if (uploadError) {
        console.error("Error al subir la imagen:", uploadError);
        return null;
      }
      return data.path;
    }
    return null;
  };

  const saveComerce = async (comercio: ComercioEdit) => {
    const { error } = await supabase
      .from("comercios")
      .insert(comercio as never)
      .select();
    if (error) console.log(error);
  };

  const updateComerce = async (comercio: ComercioEdit, id: number) => {
    const { error } = await supabase
      .from("comercios")
      .update(comercio as never)
      .eq("id", id);
    if (error) console.log(error);
  };

  const deleteComerce = async (comercio: Comercio) => {
    const { error } = await supabase
      .from("comercios")
      .delete()
      .eq("id", comercio.id);
    if (error) console.log(error);
    deleteComercePhoto(comercio.image);
  };

  const deleteComercePhoto = async (photoPath: string) => {
    if (!photoPath) return;
    const { error } = await supabase.storage
      .from("comercios")
      .remove([photoPath]);
    if (error) {
      console.error("Error al eliminar la foto del comercio:", error);
      return false;
    }
  };

  const loadFormComerce = (formValue: ComercioEdit) => {
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
  // En tu composable useComercios, mejora estas funciones:

  const likeComerce = async (comercioId: number, user_id: string) => {
    try {
      const { error } = await supabase
        .from("comerce_likes")
        .insert({ comercio_id: comercioId, user_id: user_id } as never)
        .select();

      if (error) {
        // Si el error es por duplicado (usuario ya dio like), no es un error real
        if (error.code === "23505") {
          // Código de error para violación de unique constraint
          console.log("El usuario ya había dado like a este comercio");
          return true;
        }
        console.error("Error al dar like al comercio:", error);
        return false;
      }
      return true;
    } catch (error) {
      console.error("Error inesperado al dar like:", error);
      return false;
    }
  };

  const unlikeComerce = async (comercioId: number, user_id: string) => {
    try {
      const { error } = await supabase
        .from("comerce_likes")
        .delete()
        .eq("comercio_id", comercioId)
        .eq("user_id", user_id);

      if (error) {
        console.error("Error al quitar like al comercio:", error);
        return false;
      }
      return true; // Agregar return true para consistencia
    } catch (error) {
      console.error("Error inesperado al quitar like:", error);
      return false;
    }
  };

  const loadComercios = async (
    categorias = [],
    page = 1,
    limit = 6,
    location_key: string | null = null,
    location: { lat: number; lng: number } | null,
    filterLike: boolean = false,
    allCoincidence: boolean = false
  ) => {
    const { data, count, hasMore } = await $fetch("/api/comercios", {
      query: {
        categorias: categorias.join(","),
        page,
        limit,
        distancia: location_key ? "true" : "false",
        distancia_key: location_key,
        lat: location?.lat ?? 0,
        lng: location?.lng ?? 0,
        filterLike: filterLike ? "true" : "false",
        allCoincidence: allCoincidence ? "true" : "false",
      },
      headers: useRequestHeaders(["cookie"]),
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
    updateComerce,
    deleteComerce,
    likeComerce,
    unlikeComerce,
    loadFormComerce,
    fetchCategorias,
    loadComercios,
  };
}
