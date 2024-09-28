export const getFirstStr = (str?: string | undefined) => {
  return str?.charAt(0).toUpperCase() || ""
}
