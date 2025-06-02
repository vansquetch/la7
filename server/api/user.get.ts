// server/api/profile.get.ts
import { serverSupabaseUser, serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const session = await supabase.auth.getSession();
  if (!session.data.session) {
    return { user: null };
  }
  console.log(session.data.session);
  const user = await serverSupabaseUser(event);

  if (!user) return { user: null };

  const { data: profile, error } = await supabase
    .from("perfiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    throw createError({ statusCode: 500, statusMessage: error.message });
  }
  const userWithProfile = { ...user, profile: profile || null };
  return { user: userWithProfile };
});
