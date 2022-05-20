const authenticate = async (username, password) => {
  return new Promise((resolve, reject) => {
    fetch(`http://192.168.0.157:2509/login/${username}/${password}`)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      if (responseData) {
        resolve(responseData);
      }
      reject("An unknown error occured pls try again later");
    })
    .catch((error) => {
      reject(error);
    })
  });
};

export default authenticate;