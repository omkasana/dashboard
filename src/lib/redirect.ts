export const getParentRoute = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  const last = segments[segments.length - 1];

  if (["add", "create", "new"].includes(last)) {
    segments.pop();
  }

  return "/" + segments.join("/");
};
