/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useEffect, useState } from 'react';
import { User } from '../../types/User';
import { getUser } from '../../api/getUser';

export const AuthContext = createContext({
  authorized: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (email: string, password: string) => Promise.resolve(),
  user: {} as User,
});

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const initialState = {
    id: 0,
    name: '',
    username: '',
    email: ''
  };

  const [authorized, setAuthorized] = useState(false);
  const [user, setUser] = useState<User>(initialState);

  async function login(email: string, password: string) {
    try {
      const fetchedUsers = await getUser<User>('Sincere@april.biz');
      const currentUser = fetchedUsers[0];
      console.log(`fetched fethced ${currentUser}`);  
      
      if (currentUser.username === undefined || currentUser.email === '') {
        throw new Error('There is no user with this login');
      }

      setUser(currentUser);
      // console.log('checked');
      // setAuthorized(true);
      // console.log(authorized);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user.username !== undefined && user.email !== '') {
      setAuthorized(true);
      console.log(authorized);
    }
  }, [user]);

  // async function login(email: string, password: string) {
  //   getUser<User>('Sincere@april.biz')
  //     .then((fetchedUsers) => {
  //       setUser(fetchedUsers[0])
  //       console.log(`fetched fethced ${fetchedUsers[0]}`)
  //       console.log(`in contex user::::::  ${user}`)

  //     })
  //     .catch(err => console.log(err))


  //   if (user.username === undefined || user.email === '') {
  //     setUser(initialState);

  //     throw new Error('There is no user with this login');
  //   }

  //   console.log('checked')
  //   setAuthorized(true);

  //   console.log(authorized)
  // }

  return (
    <AuthContext.Provider value={{ authorized, login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
