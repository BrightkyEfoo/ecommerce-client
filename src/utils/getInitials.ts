const getInitials = (str?: string, n: number | undefined = 2) => {
  if (!str) return "";
  const tab = str.split(" ");
  let res = "";
  for (let i = 0; i < n; i++) {
    res += tab[i].charAt(0).toUpperCase();
  }
  return res;
};

export { getInitials };
