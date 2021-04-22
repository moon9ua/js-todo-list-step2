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
  addUser: () => {
    return request("/api/users", {
      method: "POST",
    });
  },
};

export default api;
