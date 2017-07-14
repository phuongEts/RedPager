//validateEmail
const validateEmail = textEmail => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (textEmail !== '') {
    if (re.test(textEmail)) {
      return true;
    }
  } else {
    return false;
  }
};

export default validateEmail;