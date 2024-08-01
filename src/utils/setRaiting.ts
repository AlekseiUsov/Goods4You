export const setRaiting = (raiting: number) => {
  const result = [];
  for (let i = 0; i < 5; i++) {
    const cur = i < raiting ? "highlighted" : "";
    result.push(cur);
  }
  return result;
};
