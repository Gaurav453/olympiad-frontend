

export default function authHeader() {
  let token  = localStorage.getItem("token");
  if(token){
    token = JSON.parse(token);
  }

  if (token) {
    return { "key": token };
  } else {
    return {};
  }
}
