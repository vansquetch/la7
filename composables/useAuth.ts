export const useAuth = () => {
  const supabase = useSupabaseClient();
  const userS = useSupabaseUser();
  const { data, refresh, error, status } = useAsyncData(
    "authuser", // clave única para el caché
    async () => {
      if (!userS.value) return { user: null };
      const { data: profile, error } = await supabase
        .from("perfiles")
        .select("*")
        .eq("user_id", userS.value!.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        throw createError({ statusCode: 500, statusMessage: error.message });
      }
      const userWithProfile = { ...userS.value, profile: profile || null };
      return { user: userWithProfile };
    },
    {
      // La data se cachea por defecto en el lado del servidor durante la SSR
      // y se reusa en el cliente tras la hidratación.
      default: () => ({ user: null }),
    }
  );

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else {
      // Limpiar el caché de datos del usuario
      data.value = { user: null };
    }
  };

  const isAdmin = () => {
    return user.value?.profile?.type === "admin";
  };

  const user = computed(() => {
    return data.value?.user || null;
  });

  return { user, status, refresh, error, isAdmin, logout };
};
