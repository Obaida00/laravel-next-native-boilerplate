import { createContext, useEffect, useState } from "react";
import * as Keychain from "react-native-keychain";


interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userName: string, email: string, password: string, passwordConfirmation: string) => Promise<void>
}
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (
    email: string,
    password: string) => {
    try {
      setLoading(true);
      const response = await fetch(process.env.BASE_URL!, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        await Keychain.setGenericPassword("token", JSON.stringify(data.token));
        setUser(data.user);
      }
    } catch (error) {
      console.error("Login error: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const token = await Keychain.getGenericPassword()
      console.log(token);
      if (token) {
        const respose = await fetch(process.env.BASE_URL!, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        await Keychain.resetGenericPassword();
        setUser(null);
      } else {
        throw new Error("Un Authorized")
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const loadUserInfo = async () => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const token = JSON.parse(credentials.password);
        const response = await fetch(process.env.BASE_URL!, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    userName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => {
    try {
      setLoading(true);
      const response = await fetch(process.env.BASE_URL!, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
          email: email,
          password: password,
          passwordConfirmation: passwordConfirmation,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        await Keychain.setGenericPassword("token", JSON.stringify(token));
        setUser(data);
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserInfo();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>{children}</AuthContext.Provider>
  )
};
