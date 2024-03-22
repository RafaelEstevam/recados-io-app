const translateType = (type: string) => {
  switch(type){
    case 'urgent':
      return 'Urgente'
    case 'important':
      return 'Importante'
    default:
      return 'Normal'
  }
};

export default translateType;