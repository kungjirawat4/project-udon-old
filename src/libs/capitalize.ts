export const Capitalize = (str: string) => {
  str = str?.replace(/([A-Z])/g, ' $1');

  return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
};
// export const myTrim = (x: string) => {
//   return x.replace(/^\s+|\s+$/gm, '');
// };
