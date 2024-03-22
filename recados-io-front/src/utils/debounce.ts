function debounce(time: number, callback: any){
  let interval: number;
  interval = setTimeout(() => {
    callback();
  }, time);
}

export default debounce;