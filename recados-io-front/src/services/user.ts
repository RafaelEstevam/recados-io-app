import { UserInterface } from "@/interfaces/user.interface";

const getUserData = () => {
  if(sessionStorage.getItem('user')){
      return JSON.parse(sessionStorage.getItem('user') || '');
  }
  return false;
};

const setUserData = (user: UserInterface) => {
  sessionStorage.setItem('user', JSON.stringify(user));
};

const removeUserData = () => {
  sessionStorage.removeItem('user');
};

export {
  getUserData,
  setUserData,
  removeUserData
}