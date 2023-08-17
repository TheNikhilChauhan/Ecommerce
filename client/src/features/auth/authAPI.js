export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(logInInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        body: JSON.stringify(logInInfo),
        headers: { "content-type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();

        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function logout(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "success" });
  });
}

export function resetPasswordRequest(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8000/auth/reset-pass-request",
        {
          method: "POST",
          body: JSON.stringify(email),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();

        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
