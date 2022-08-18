import axios from 'axios';

const clienteAxios = axios.create({
  // baseURL: 'https://paymenth-method.herokuapp.com'
  baseURL: 'http://localhost:7001'
});

export default clienteAxios;
