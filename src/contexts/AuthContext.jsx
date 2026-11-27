import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USER_STORAGE_KEY = 'digital_store_user';
const USERS_LIST_KEY = 'digital_store_users';

const loadJSON = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadJSON(USER_STORAGE_KEY, null));

  const register = ({ firstName, lastName, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadJSON(USERS_LIST_KEY, []);

    const alreadyExists = users.some((u) => u.email === normalizedEmail);
    if (alreadyExists) {
      return { success: false, message: 'Este e-mail já está cadastrado.' };
    }

    const newUser = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      name: firstName.trim(),
      email: normalizedEmail,
      password,
    };

    localStorage.setItem(USERS_LIST_KEY, JSON.stringify([...users, newUser]));

    const sessionUser = { name: newUser.name, email: newUser.email };
    setUser(sessionUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));

    return { success: true };
  };

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadJSON(USERS_LIST_KEY, []);

    const foundUser = users.find(
      (u) => u.email === normalizedEmail && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: 'E-mail ou senha inválidos.' };
    }

    const sessionUser = { name: foundUser.name, email: foundUser.email };
    setUser(sessionUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));

    return { success: true };
  };

  const socialLogin = (email, name) => {
    const sessionUser = {
      name: name || email.split('@')[0],
      email: email.trim().toLowerCase(),
    };
    setUser(sessionUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(sessionUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        register,
        login,
        socialLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);