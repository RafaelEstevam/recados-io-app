let interval: ReturnType<typeof setTimeout>;

function debounce(time: number, callback: Function){
  
  return () => {
    clearInterval(interval);
    interval = setTimeout(() => {
      callback();
    }, time);
  }
}

export default debounce;