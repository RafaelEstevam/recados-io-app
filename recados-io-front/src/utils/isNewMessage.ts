import moment from 'moment';

const isNewMessage = (taskDate: string) => {
  const today = moment(new Date()).format('DD/MM/YYYY');
  const date = moment(new Date(taskDate)).format('DD/MM/YYYY');

  if(date === today){
    return true;
  }

  return false;
}

export default isNewMessage;