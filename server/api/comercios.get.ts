// server/api/comercios.get.js
import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 12;
  const offset = (page - 1) * limit;
  const categorias = query.categorias
    ? (query.categorias as string).split(",")
    : [];

  try {
    let queryBuilder = supabase
      .from("comercios")
      .select("*", { count: "exact" });
    if (categorias.length > 0) {
      queryBuilder = queryBuilder.overlaps("categorias", categorias);
    }

    const { data, error, count } = await queryBuilder
      .range(offset, offset + limit - 1)
      .order("created_at", { ascending: false });

    if (error) throw error;

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
    });
  }
});
