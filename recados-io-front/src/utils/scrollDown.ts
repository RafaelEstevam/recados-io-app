function scrollDown(){
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight + 500);
  }, 100)
};

export default scrollDown;