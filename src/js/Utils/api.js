const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

const request = async (url, option = {}) => {
  const response = await fetch(baseUrl + url, option);
  // 에러 처리 못했음.
  return await response.json();
};

const api = {
  getUserList: () => {
    return request("/api/users");
  },
  addUser: (userName) => {
    return request("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userName,
      }),
    });
  },
  getUser: (userId) => {
    return request(`/api/users/${userId}`);
  },
  deleteUser: (userId) => {
    return request(`/api/users/${userId}`, {
      method: "DELETE",
    });
  },
  completeToggle: (userId, dataId) => {
    return request(`/api/users/${userId}/items/${dataId}/toggle`, {
      method: "PUT", // 이게 될까?
    });
  },
  editItem: (userId, dataId, contents) => {
    return request(`/api/users/${userId}/items/${dataId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }, // ❓ default가 text/plain이므로 지정해줘야.
      body: JSON.stringify({
        contents, // contents: contents
      }),
    });
  },
  deleteItem: (userId, dataId) => {
    return request(`/api/users/${userId}/items/${dataId}`, {
      method: "DELETE",
    });
  },
  addItem: (userId, contents) => {
    return request(`/api/users/${userId}/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents,
      }),
    });
  },
  deleteItemAll: (userId) => {
    return request(`/api/users/${userId}/items/`, {
      method: "DELETE",
    });
  },
};

export default api;
