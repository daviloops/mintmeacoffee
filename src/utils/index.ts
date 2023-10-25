const appendPath = (href: string, path: string | undefined) => {
  if(!href) return;
  if (!path) { 
    return href;
  }
  const url = new URL(href);
  url.pathname += `${url.pathname.endsWith('/') ? "" : "/"}${path.startsWith('/') ? path.slice(1) : path}`
  return url.href;
};

const validateAccountId = (accountId: string) => {
  const ACCOUNT_ID_REGEX = /^(([a-z\d]+[-_])*[a-z\d]+\.)*([a-z\d]+[-_])*[a-z\d]+$/;

  return (
    accountId.length >= 2 &&
    accountId.length <= 64 &&
    ACCOUNT_ID_REGEX.test(accountId)
  );
}

export {
  appendPath,
  validateAccountId,
};
