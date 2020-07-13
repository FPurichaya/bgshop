import axios from 'axios';

//axios.defaults.baseURL = `https://api.purichaya.fraczyk.eu`

export default {
  stores: {
    fetchAll: () => axios.get(`/api/authstores`).then((res) => res.data.stores),
    fetchById: (id) =>
      axios.get(`/api/authstores/${id}`).then((res) => res.data.store),
    create: (store) =>
      axios.post(`/api/authstores`, { store }).then((res) => res.data.store),
    update: (store) =>
      axios
        .put(`/api/authstores/${store._id}`, { store })
        .then((res) => res.data.store),
    delete: (store) => axios.delete(`/api/authstores/${store._id}`),
  },
  users: {
    create: (user) => axios.post(`/api/users`, { user }),
    login: (credentials) =>
      axios.post(`/api/auth`, { credentials }).then((res) => res.data.token),
  },
};
