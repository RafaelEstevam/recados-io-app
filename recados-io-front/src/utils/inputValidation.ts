const hasSpaces = (text: string) => {
  const regex = /\s+/;
  return regex.test(text);
};

export default {
  hasSpaces
}