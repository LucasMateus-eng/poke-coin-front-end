import axios from "axios";

const mainAxios = axios.create({
  baseURL: "https://poke-coin-api.herokuapp.com/api"
})

export default mainAxios;