import axios from "axios";
import * as tokenStorage from "../storage/tokenStorage";

// url da api - backend publicado no Render
const BASE_URL = "https://apirest-node-chllng.onrender.com";

// instancia do axios com url base - todos os services usam essa,
// nenhum monta a URL nem o header de autorizacoo na mao
const api = axios.create({ baseURL: BASE_URL });

// injeta o token em toda requisicoo automaticamente
api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.buscarToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export default api;