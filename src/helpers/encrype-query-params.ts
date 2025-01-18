// export function createQueryParams<T extends Record<string, any>>(
//   params: T
// ): string {
//   if (params === undefined) return "";

//   return Object.entries(params)
//     .filter(([_, value]) => value !== undefined && value !== "")
//     .map(([key, value]) => {
//       if (Array.isArray(value)) {
//         return value
//           .map(
//             (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
//           )
//           .join("&");
//       } else if (typeof value === "object") {
//         return `${encodeURIComponent(key)}=${encodeURIComponent(
//           JSON.stringify(value)
//         )}`;
//       } else {
//         return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
//       }
//     })
//     .join("&");
// }
