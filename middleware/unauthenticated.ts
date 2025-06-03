export default defineNuxtRouteMiddleware(() => {
  const { user } = useAuth();
  console.log(user.value);
  if (user.value) {
    return navigateTo("/");
  }
});
