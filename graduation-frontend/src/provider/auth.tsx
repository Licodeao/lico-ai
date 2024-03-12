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
    VITE_TWITTER_CLIENT_ID,
    VITE_TWITTER_REDIRECT_URI,
  } = import.meta.env;

  const loginWithGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${VITE_GITHUB_CLIENT_ID}&redirect_uri=${VITE_GITHUB_REDIRECT_URI}&response_type=code&state=1`;
  };

  const loginWithTwitter = () => {
    const options = {
      redirect_uri: VITE_TWITTER_REDIRECT_URI,
      client_id: VITE_TWITTER_CLIENT_ID,
      state: "state",
      response_type: "code",
      code_challenge: "y_SfRG4BmOES02uqWeIkIgLQAlTBggyf_G7uKT51ku8",
      code_challenge_method: "S256",
      scope: ["users.read", "tweet.read", "follows.read", "follows.write"].join(
        " "
      ),
    };
    const qs = new URLSearchParams(options).toString();
    window.location.href = `https://twitter.com/i/oauth2/authorize?${qs}`;
  };

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
