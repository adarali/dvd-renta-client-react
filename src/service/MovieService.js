import axios from 'axios'

export default class MovieService {
    getMovies() {
        return axios.get('http://localhost:8080/api/v1/movies')
    }
}