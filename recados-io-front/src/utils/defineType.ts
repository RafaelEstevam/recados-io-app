const defineType = (type: string) => {
  switch(type){
    case 'not-important':
      return 'secondary';
    case 'urgent':
      return 'danger';
    default:
      return 'primary';
  }
};

export default defineType;