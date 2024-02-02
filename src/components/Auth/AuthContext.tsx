import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/User";
import { getUser } from "../../api/getUser";

export const AuthContext = createContext({
  authorized: false,
  login: (_email: string, _password: string) => Promise.resolve(),
  user: {} as User | null,
  logout: () => {}
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  async function login(email: string, _password: string) {
    try {
      const fetchedUsers = await getUser<User>(email);
      const currentUser = fetchedUsers[0];

      if (currentUser === undefined || currentUser.email === "") {
        throw new Error("There is no user with this login");
      }

      setUser(currentUser);
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    if (authorized) {
      setAuthorized(false);
      setUser(null);
    }
  }

  useEffect(() => {
    if (user && user.username) {
      setAuthorized(true);
    }
  }, [user]);

  useEffect(() => {
    if (authorized) {
      navigate("/");
    }
  }, [authorized]);

  return (
    <AuthContext.Provider value={{ authorized, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
