import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { useAuthContext } from "../../../contexts/AuthContext";
import { sucessUrl as redirectUri } from "./LoginPage";

const LoginSucessPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { isAuthenticated, signIn } = useAuthContext();

  useEffect(() => {
    if (!code) return;

    signIn({ code, redirectUri });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  useEffect(() => {
    if (!isAuthenticated) return;

    navigate(0);
    navigate("/", { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return null;
};

export default LoginSucessPage;
