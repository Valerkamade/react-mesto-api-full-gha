export const BASE_URL = 'http://localhost:3001';

function isOk(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then(res => { throw res });
}

export async function register({ password, email }) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password, email })
  });
  const res_1 = await isOk(res);
  return res_1;
};

export const authorize = async ({ email, password }) => {
  const res = await fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  const data = await isOk(res);
  localStorage.setItem('jwt', data.token);
  return data;
};

export const checkToken = async (token) => {
  const res = await fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${token}`,
    }
  });
  const data = await isOk(res);
  return data;
}