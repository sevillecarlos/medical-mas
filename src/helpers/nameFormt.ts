export const nameFormat = (name: string) => {
  return name?.charAt(0).toUpperCase() + name?.slice(1, name.length);
};
