import axios from "axios";
import config from "../config.json";

const core = axios.create({baseURL: `${config.apiURL}`})

export default core;

