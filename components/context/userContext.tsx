import React, { ReactNode, useEffect, useState } from "react";

const UserContext = React.createContext({
    setUser: (arg:Object) => {},
    setDefaultUser: () => {},
    user: {
        _id: '',
        firstname: '',
        email: '',
        middleName: '',
        lastname: '',
        _vkId: '',
        _password: '',
        list: { favorites: [], commnets: [], video: [], likes: [], dislikes: [] },
        _user: ''
    }    
});

interface Props {
  children: ReactNode;
}

const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({
    _id: '',
    firstname: '',
    email: '',
    middleName: '',
    lastname: '',
    _vkId: '',
    _password: '',
    list: { favorites: [], commnets: [], video: [], likes: [], dislikes: [] },
    _user: ''
  })

  useEffect(() => {
    console.log(user)
  }, [user])
  
  const setDefaultUser = () => {
    setUser({
        _id: '',
        firstname: '',
        email: '',
        middleName: '',
        lastname: '',
        _vkId: '',
        _password: '',
        list: { favorites: [], commnets: [], video: [], likes: [], dislikes: [] },
        _user: ''
      })
  }

  return (
    <UserContext.Provider
    value={{
        setUser,
        user,
        setDefaultUser
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

export { UserContextProvider };