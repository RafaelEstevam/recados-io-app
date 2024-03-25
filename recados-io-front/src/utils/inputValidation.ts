const hasSpaces = (text: string) => {
  const regex = /\s+/;
  return regex.test(text);
};

const minLenght = (text: string, length: number) => {
  if(text.length < length){
    return true
  };
  return false;
}

export default {
  hasSpaces,
  minLenght
}