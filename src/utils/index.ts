const appendPath = (href: string, path: string | undefined) => {
  if(!href) return;
  if (!path) { 
    return href;
  }
  const url = new URL(href);
  url.pathname += `${url.pathname.endsWith('/') ? "" : "/"}${path.startsWith('/') ? path.slice(1) : path}`
  return url.href;
};

export {
  appendPath,
};
