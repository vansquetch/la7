export const useLike = () => {
  const filterLike = useState("filterLike", () => false);
  const toggleFilterLike = () => {
    filterLike.value = !filterLike.value;
  };
  return {
    filterLike,
    toggleFilterLike,
  };
};
