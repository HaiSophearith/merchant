import { add, getTime } from "date-fns";
import { Cookies, useCookies as useReactCookies } from "react-cookie";
import { CookieSetOptions } from "universal-cookie";

const PREFIX = "kbpmbo_";

const cookies = new Cookies(null, { path: "/" });
const defaultOptions: CookieSetOptions = {
  path: "/",
  sameSite: "lax",
  // This is legal maximum limit. Do not violate unless you have a good reason.
  maxAge: getTime(add(new Date(), { days: 90 })),
};

/**
 * Get the value of a cookie by name.
 * @param name - The name of the cookie to retrieve.
 * @returns The value of the cookie, or undefined if the cookie does not exist.
 */
export function getCookie(name: string) {
  return cookies.get(PREFIX + name);
}

/**
 * Sets a cookie with the given name and value.
 * @param name - The name of the cookie.
 * @param value - The value of the cookie.
 * @param options - Optional settings for the cookie.
 * @returns The result of setting the cookie.
 */
export function setCookie(name: string, value: string, options?: CookieSetOptions) {
  return cookies.set(PREFIX + name, value, {
    ...defaultOptions,
    ...options,
  });
}

export function useCookies(dependencies?: string[]) {
  const [cookies, setCookies, removeCookies] = useReactCookies(dependencies);

  const getCookie = (name: string) => cookies[PREFIX + name];

  const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
    setCookies(PREFIX + name, value, {
      ...defaultOptions,
      ...options,
    });
  };

  const removeCookie = (name: string) => removeCookies(PREFIX + name);

  return { getCookie, setCookie, removeCookie };
}
