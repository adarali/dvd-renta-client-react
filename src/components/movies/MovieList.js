import React, { Component } from 'react'
import MovieService from 'service/MovieService';

export default class MovieList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            movieService: new MovieService(),
        }
    }



    render() {
        const items = this.state.movies.map((movie) => {
        return <li key={movie.id}>{movie.title}</li>
        })
        return (
            <div>
                <ul>
                    <MovieItems movies={this.state.movies}/>
                </ul>
            </div>
        )
    }

    componentDidMount() {
        this.state.movieService.getMovies().then(res => {
            this.setState({movies: res.data})
        })        
    }

    
}

function MovieItems(props) {
    return props.movies.map((movie) => {
        return <li key={movie.id}>{movie.title}</li>
        })
}