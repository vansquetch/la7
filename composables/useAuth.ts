export const useAuth = () => {
  const supabase = useSupabaseClient();
  const userS = useSupabaseUser();
  const loginParams = ref({
    email: "",
    password: "",
  });
  const errorMessage = ref("");
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

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword(loginParams.value);
    if (error) {
      switch (error.message) {
        case "Invalid login credentials":
          errorMessage.value =
            "Credenciales incorrectas. Verifica tu email y contraseña.";
          break;
        case "Email not confirmed":
          errorMessage.value =
            "Debes confirmar tu email antes de iniciar sesión.";
          break;
        case "Too many requests":
          errorMessage.value =
            "Demasiados intentos. Intenta nuevamente en unos minutos.";
          break;
        default:
          errorMessage.value = "Error al iniciar sesión. Intenta nuevamente.";
      }
    } else {
      await refresh();
    }
    return { error, message: errorMessage.value };
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    else {
      // Limpiar el caché de datos del usuario
      data.value = { user: null };
      useRouter().push("/"); // Recargar la ruta para reflejar el cambio
    }
  };

  const isAdmin = () => {
    return user.value?.profile?.type === "admin";
  };

  const user = computed(() => {
    return data.value?.user || null;
  });

  return {
    user,
    status,
    refresh,
    error,
    isAdmin,
    logout,
    login,
    loginParams,
    errorMessage,
  };
};
