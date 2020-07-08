import axios from 'axios';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '.env')
});

axios.defaults.baseURL = `${process.env.API_HOST}`

export default {
  games: {
    fetchAll: () => axios.get(`/api/unsafegames`).then((res) => res.data.games),
    fetchById: (id) =>
      axios.get(`/api/unsafegames/${id}`).then((res) => res.data.game),
    create: (game) =>
      axios.post(`/api/unsafegames`, { game }).then((res) => res.data.game),
    update: (game) =>
      axios
        .put(`/api/unsafegames/${game._id}`, { game })
        .then((res) => res.data.game),
    delete: (game) => axios.delete(`/api/unsafegames/${game._id}`),
  },
  users: {
    create: (user) => axios.post(`/api/users`, { user }),
  },
};
