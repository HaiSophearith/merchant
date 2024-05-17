import LAYOUT_CONST from "../src/constant";
import { ConfigProps } from "../src/types/config";

export const BASE_PATH = "";
export const DASHBOARD_PATH = "/dasboard";
export const HORIZONTAL_MAX_ITEM = 7;

export const REACT_APP_SSO_LOGIN_URL = process.env.REACT_APP_SSO_LOGIN_URL;
export const REACT_APP_SSO_LOGIN_SCOPE = process.env.REACT_APP_SSO_LOGIN_SCOPE;
export const REACT_APP_SSO_LOGIN_RESPONSE_TYPE = process.env.REACT_APP_SSO_LOGIN_RESPONSE_TYPE;
export const REACT_APP_SSO_CLIENT_ID = process.env.REACT_APP_SSO_CLIENT_ID;

const config: ConfigProps = {
  layout: LAYOUT_CONST.VERTICAL_LAYOUT,
  drawerType: LAYOUT_CONST.DEFAULT_DRAWER,
  fontFamily: `'KBPRASACBeta-Regular','Roboto', sans-serif`,
  borderRadius: 8,
  outlinedFilled: true,
  navType: "light",
  presetColor: "default",
  locale: "en",
  rtlLayout: false,
  container: false,
};

export default config;

// Network
export const OAUTH2_API_URL = process.env.REACT_APP_OAUTH2_API_URL;
export const OAUTH2_CLIENT_ID = process.env.REACT_APP_OAUTH2_CLIENT_ID;
export const OAUTH2_CLIENT_SECRET = process.env.REACT_APP_OAUTH2_CLIENT_SECRET;

export const PUBLIC_API_URL = process.env.REACT_APP_PUBLIC_API_URL;

export const PRIVATE_API_URL = process.env.REACT_APP_PRIVATE_API_URL;

export const PREFIX_IMAGE_URL = `${PRIVATE_API_URL}/admin/files/`;
