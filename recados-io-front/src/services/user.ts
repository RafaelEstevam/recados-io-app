
const getUserData = () => {
  if(sessionStorage.getItem('user')){
      return JSON.parse(sessionStorage.getItem('user') || '');
  }
  return false;
};

export {
  getUserData,
}