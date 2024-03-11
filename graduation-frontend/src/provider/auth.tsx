import { createContext, useContext } from "react";

const AuthContext = createContext({
  loginWithGithub: () => {},
  loginWithTwitter: () => {},
  loginWithGitee: () => {},
});

const AuthProvider = ({ children }) => {
  const {
    VITE_GITHUB_CLIENT_ID,
    VITE_GITHUB_REDIRECT_URI,
    VITE_GITEE_CLIENT_ID,
    VITE_GITEE_REDIRECT_URI,
  } = import.meta.env;

  const loginWithGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_GITHUB_REDIRECT_URI}&response_type=code&state=1`;
  };

  const loginWithTwitter = () => {};

  const loginWithGitee = () => {
    window.location.href = `https://gitee.com/oauth/authorize?client_id=${VITE_GITEE_CLIENT_ID}&redirect_uri=${VITE_GITEE_REDIRECT_URI}&response_type=code
    `;
  };

  return (
    <AuthContext.Provider
      value={{ loginWithGithub, loginWithTwitter, loginWithGitee }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
