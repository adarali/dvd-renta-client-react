import axios from 'axios'

export class MovieService {
    constructor(jwt) {
        this.ax = axios.create({
            timeout: 2000,
            baseURL: process.env.REACT_APP_BASE_URL+"/api/v1",
            headers: {'Authorization': 'Bearer ' + jwt}
        });
    }

    fetchMovies = (params = {}) => {
        return this.ax.get('/movies', {params});
    }

    fetchMovieDetail = (id) => {
        return this.ax.get(`/movies/${id}`);
    }

    rentMovie = (id, body) => {
        return this.ax.post(`/movies/${id}/rents`, body);
    }

    purchaseMovie = (id, body) => {
        return this.ax.post(`/movies/${id}/purchases`, body);
    }

    toggleAvailable(id) {
        console.log("available", id)
        return this.ax.patch(`/movies/${id}/available`)
    }

    saveMovie(movie) {
        return movie.id? this.update(movie) : this.create(movie);
    }

    create = (movie) => {return this.ax.post('/movies', movie)}
    update = (movie) => {return this.ax.put(`/movies/${movie.id}`, movie)}

    
}
