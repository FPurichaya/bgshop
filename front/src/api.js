import axios from 'axios';

// axios.defaults.baseURL = `https://api.purichaya.fraczyk.eu`;

export default {
  store: {
    fetchAll: () => axios.get(`/api/authstore`).then((res) => res.data.store),
    fetchById: (id) =>
      axios.get(`/api/authstore/${id}`).then((res) => res.data.product),
    create: (product) =>
      axios.post(`/api/authstore`, { product }).then((res) => res.data.product),
    update: (product) =>
      axios
        .put(`/api/authstore/${product._id}`, { product })
        .then((res) => res.data.product),
    delete: (product) => axios.delete(`/api/authstore/${product._id}`),
  },
  users: {
    create: (user) => axios.post(`/api/users`, { user }),
    login: (credentials) =>
      axios.post(`/api/auth`, { credentials }).then((res) => res.data.token),
  },
};
