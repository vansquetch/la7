import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";
import type { Comercio } from "~/lib/interfaces/comercio";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const activeSesion = query.activeSesion === "true";
  const page = parseInt(query.page as string) || 1;
  const queryLimit = parseInt(query.limit as string);
  const limit = (queryLimit || 12) > 12 ? 12 : queryLimit; // Mantienes el límite máximo de 12
  const offset = (page - 1) * limit;
  const distancia = query.distancia === "true";
  const allCoincidence = query.allCoincidence === "true";
  const user = activeSesion ? await serverSupabaseUser(event) : null;
  const filterLike = query.filterLike === "true" && !!user; // filterLike solo aplica si hay usuario
  const distancia_key = query.distancia_key as string;

  const categorias = query.categorias
    ? (query.categorias as string).split(",")
    : [];

  try {
    let fromTable: string;
    if (distancia) {
      fromTable = filterLike
        ? "v_comercios_con_distancia_with_user_like"
        : "comercios_con_distancia";
    } else {
      fromTable = filterLike ? "v_comercios_with_user_like" : "comercios";
    }

    let queryBuilder = supabase.from(fromTable).select("*", { count: "exact" });

    if (categorias.length > 0) {
      queryBuilder = !allCoincidence
        ? queryBuilder.overlaps("categorias", categorias)
        : queryBuilder.contains("categorias", categorias);
    }

    // Aplicar ordenamiento
    if (filterLike) {
      // Implica que user existe
      queryBuilder = queryBuilder.order("is_liked_by_user", {
        ascending: false,
      });
      // Luego, aplicar el ordenamiento secundario
      if (distancia) {
        queryBuilder = queryBuilder.order("distance", { ascending: true });
      } else {
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
      }
    } else {
      // Ordenamiento original si filterLike es false o no hay usuario
      if (distancia) {
        queryBuilder = queryBuilder.order("distance", { ascending: true });
      } else {
        queryBuilder = queryBuilder.order("created_at", { ascending: false });
      }
    }

    // El filtro .eq("user_id", ...) para 'comercios_con_distancia' debe aplicarse si es necesario
    // Este filtro es para la lógica de 'comercios_con_distancia' en sí, no para los likes.
    // Asumo que 'comercios_con_distancia' y 'v_comercios_con_distancia_with_user_like'
    // ya manejan o exponen la columna 'user_id' a la que te refieres.
    if (distancia) {
      // Si 'comercios_con_distancia' (y su vista wrapper) necesitan este filtro por user_id:
      queryBuilder = queryBuilder.eq("user_id", user ? user.id : distancia_key);
    }

    const { data, error, count } = await queryBuilder
      .range(offset, offset + limit - 1)
      .overrideTypes<Comercio[]>(); // Tipado para incluir 'is_liked_by_user'

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    // Procesar los datos: el campo 'liked' ahora puede usar 'is_liked_by_user'
    // La obtención manual de 'likedComerciosIds' ya no es necesaria si 'is_liked_by_user' está presente y es confiable.
    let likedComerciosIds: number[] = []; // Mantener por si 'is_liked_by_user' no viene (ej. no hay user)

    if (user && data && data.length > 0 && !filterLike) {
      // Solo obtener likes manualmente si no usamos la vista con 'is_liked_by_user'
      const comerciosIds = data.map((c) => c.id);
      const { data: likesData, error: likesError } = await supabase
        .from("comerce_likes")
        .select("comercio_id")
        .eq("user_id", user.id)
        .in("comercio_id", comerciosIds);

      if (!likesError && likesData) {
        likedComerciosIds = likesData.map((like) => like.comercio_id);
      }
    }

    const processedData =
      data?.map((comercio: Comercio) => {
        const cLocation = comercio.location || { lat: 0, lng: 0, address: "" };

        // Si 'is_liked_by_user' viene de la vista, úsalo. Sino, usa el método anterior.
        const isLiked =
          typeof comercio.is_liked_by_user === "boolean"
            ? comercio.is_liked_by_user
            : likedComerciosIds.includes(comercio.id);

        return {
          ...comercio,
          location: cLocation,
          liked: isLiked, // 'liked' es el campo que tu frontend espera
        };
      }) || [];

    return {
      data: processedData,
      count,
      page,
      limit,
      hasMore: page * limit < (count ?? 0),
    };
  } catch (error) {
    console.error("Error loading comercios:", error);
    // Asegúrate que el error se propaga o se maneja adecuadamente
    const typedError = error as Error & {
      code?: string;
      details?: string;
      hint?: string;
      message: string;
    };
    throw createError({
      statusCode: 500, // O un código más específico si está disponible
      statusMessage:
        "Error loading comercios" +
        (typedError.message ? `: ${typedError.message}` : ""),
      data: {
        code: typedError.code,
        details: typedError.details,
        hint: typedError.hint,
        message: typedError.message,
      },
    });
  }
});
