export const useFormComerce = () => {
  const show = useState("showFormComerce", () => false);
  const toggle = () => {
    show.value = !show.value;
  };
  return { show, toggle };
};
