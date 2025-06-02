import { serverSupabaseClient } from "#supabase/server";
import type { Comercio } from "~/lib/interfaces/comercio";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const queryLimit = parseInt(query.limit as string);
  const limit = (queryLimit || 12) > 12 ? 12 : queryLimit; // Limit to a maximum of 12
  const offset = (page - 1) * limit;
  const distancia = query.distancia === "true";
  const distancia_key = query.distancia_key as string;

  console.log(distancia, distancia_key);

  const categorias = query.categorias
    ? (query.categorias as string).split(",")
    : [];

  try {
    let queryBuilder = supabase
      .from(distancia ? "comercios_con_distancia" : "comercios")
      .select("*", { count: "exact" });
    if (categorias.length > 0) {
      queryBuilder = queryBuilder.overlaps("categorias", categorias);
    }
    if (distancia) {
      queryBuilder
        .order("distance", { ascending: true })
        .eq("user_id", distancia_key);
    } else {
      queryBuilder.order("created_at", { ascending: false });
    }

    const { data, error, count } = await queryBuilder
      .range(offset, offset + limit - 1)
      .overrideTypes<Comercio[]>();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    data.map((comercio) => {
      if (comercio.location == null) {
        comercio.location = {
          lat: 0,
          lng: 0,
          address: "",
        };
      }
    });

    return {
      data,
      count,
      page,
      limit,
      hasMore: page * limit < (count ?? 0),
    };
  } catch (error) {
    console.error("Error loading comercios:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Error loading comercios",
      data: error,
    });
  }
});
