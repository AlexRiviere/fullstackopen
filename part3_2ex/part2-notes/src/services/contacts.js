import axios from 'axios'

let baseURL = '/api/persons';

const getAll = () => {
  return axios
          .get(baseURL)
          .then(response => {
            return response.data
          })
}

const create = (newObj) => {
  return axios
          .post(baseURL, newObj)
          .then(response => response.data)
}

const update = (id, infoObj) => {
  return axios
           .put(`${baseURL}/${id}`, infoObj)
           .then(resp => resp.data);
}

const deletePerson = (id) => {
  return axios
           .delete(`${baseURL}/${id}`)
           .then(resp => resp)
}

export default { getAll, create, deletePerson }