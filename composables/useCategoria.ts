export const useCategoria = () => {
  const categoriasFilter = useState("categoriasFilter", () => []);
  const allCoincidence = useState("allCoincidence", () => true);
  const supabase = useSupabaseClient();
  const auth = useAuth();

  const cachedCategorias = useState<{ label: string; value: string }[]>(
    "categorias-cache",
    () => []
  );

  const createCategoria = async (name: string) => {
    if (!auth.isAdmin()) return;
    if (name.trim() == "") return;
    try {
      const { error } = await supabase
        .from("categorias")
        .insert({ nombre: name, label: name.toLowerCase() } as never);
      if (error) {
        console.error("error al insertar:", error);
      }
    } catch (e) {
      console.error("error inesperado: " + e);
    }
  };

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
      if (error) {
        console.error("Error al cargar categorías:", error);
        return [];
      }

      const dataMap = data?.map((c) => ({
        label: c.nombre,
        value: c.label,
      }));
      const cachedCategorias = useState<{ label: string; value: string }[]>(
        "categorias-cache",
        () => []
      );
      // Guardar en caché
      cachedCategorias.value = dataMap ?? [];
      return cachedCategorias.value;
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      return [];
    }
  };
  return {
    categoriasFilter,
    allCoincidence,
    fetchCategorias,
    createCategoria,
  };
};
