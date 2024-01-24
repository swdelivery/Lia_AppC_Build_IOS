export const handleApi = async (func) => {
  if (typeof func !== "function") return { error: true };
  return func()
    .then((data) => {
      return { error: false, ...data };
    })
    .catch((error: any) => {
      return { error };
    });
};

export const encodeParams = (params) => {
  var esc = encodeURIComponent;
  var query = Object.keys(params)
    .map((k) => esc(k) + "=" + esc(JSON.stringify(params[k])))
    .join("&");
  return query;
};
