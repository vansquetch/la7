export const useCategoria = () => {
  const categoriasFilter = useState("categoriasFilter", () => []);
  const allCoincidence = useState("allCoincidence", () => false);

  return {
    categoriasFilter,
    allCoincidence,
  };
};
