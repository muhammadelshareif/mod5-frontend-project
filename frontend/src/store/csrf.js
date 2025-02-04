import Cookies from "js-cookie";

export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";
  options.headers = options.headers || {};

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] =
      options.headers["Content-Type"] || "application/json";
    options.headers["XSRF-TOKEN"] = Cookies.get("XSRF-TOKEN");
    options.credentials = "include"; // Add this line
  }

  const res = await fetch(url, options);

  if (res.status >= 400) throw res;

  return res;
}

export const restoreCSRF = () => {
  return csrfFetch("/api/csrf/restore");
};
