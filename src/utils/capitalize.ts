export const capitalize = (data: string): string => {
  return data && data.length
    ? `${data[0].toUpperCase()}${data.slice(1).toLocaleLowerCase()}`
    : "";
};
