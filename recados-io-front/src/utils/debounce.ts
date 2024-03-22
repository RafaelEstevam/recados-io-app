function debounce(time: number, callback: any){
  let interval: ReturnType<typeof setTimeout>;
  return () => {
    clearInterval(interval);
    interval = setTimeout(() => {
      callback();
    }, time);
  }
}

export default debounce;