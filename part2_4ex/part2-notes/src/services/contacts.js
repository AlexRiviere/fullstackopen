import axios from 'axios'

const getAll = () => {
  return axios
          .get('http://localhost:8081')
          .then(response => response.data)
}

const create = (newObj) => {
  return axios
          .post('http://localhost:8081', newObj)
          .then(response => response.data)
}

const update = (id, infoObj) => {
  return axios
           .put(`http://localhost:8081/${id}`, infoObj)
           .then(resp => resp.data);
}

const deletePerson = (id) => {
  return axios
           .delete(`http://localhost:8081/${id}`)
           .then(resp => resp)
}

export default { getAll, create, deletePerson }