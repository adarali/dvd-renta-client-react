import './MovieDetail.scss'
import React, { Component } from 'react'
import { useHistory } from "react-router-dom";
import MovieRent from "../movie-rent/MovieRent";
import MoviePurchase from "../movie-purchase/MoviePurchase";
import { toast } from 'react-toastify';
import { AuthContext } from "components/Auth";

export class MovieDetail extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            movie: {},
            currTime: new Date().getTime(),
        }
        
    }

    render() {
        const {movie} = this.state;

        const Navbar = () => {
            const history = useHistory();
            const {movie} = this.state;
            
            
            return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-brand btn btn-outline-secondary" onClick={()=>history.goBack()}><i className="fa fa-arrow-left"></i></button>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mr-auto">
                            {this.context.isLoggedIn &&
                                <>
                                    <li className="nav-item navbar-btn">
                                        <MovieRent
                                        buttonLabel="Rent" 
                                        movie={movie}
                                        handleOk={this.doRent} />

                                    </li>
                                    <li className="nav-item navbar-btn">
                                    <MoviePurchase
                                        buttonLabel="Purchase" 
                                        movie={movie} 
                                        handleOk={this.purchase} />
                                    </li>
                                </>
                            }
                            {this.isAdmin &&
                            <>
                            <li className="nave-item navbar-btn">
                                <button className={`btn ${movie.available ? 'btn-success': 'btn-outline-success'}`} onClick={() => this.toggleAvailable()}>{`${movie.available ? 'Available' : 'Unavailable'}`}</button>
                            </li>
                            <li className="nave-item navbar-btn">
                                <button className="nav-link btn btn-link" onClick={() => this.props.handleEdit(this.state.movie, history)}>Edit</button>
                            </li>
                            <li className="nave-item navbar-btn">
                                <button className="nav-link btn btn-link">Delete</button>
                            </li>
                            </>
                            }
                        </ul>
                    </div>
                </nav>

            )
        }

        return (
            <div>
                <Navbar context={this}/>
                <div>
                    <h3>{movie.title}</h3>
                    <span style={{fontWeight: 'bold'}}>Rental price:</span> {this.formatPrice(movie.rentalPrice)}<br/>
                    <span style={{fontWeight: 'bold'}}>Sale price:</span> {this.formatPrice(movie.salePrice)}
                    <p>
                        {movie.description}
                    </p>
                </div>
                <div>
                    {movie.movieImages && movie.movieImages.map((image) => {
                        return (
                            <div key={image.url} className="movie-image">
                                <img src={image.url} alt=""/>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadMovie();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    doRent = (params) =>  {
        return this.context.service.rentMovie(this.movieId, params);
    }

    purchase = (params) => {
        return this.context.service.purchaseMovie(this.movieId, params);
    }

    toggleAvailable = () => {
        return this.context.service.toggleAvailable(this.movieId)
        .then(res => {
            this.setState({movie: { ...this.state.movie, available: res.data.available }})
            toast.success(`The movie is now ${res.data.available ? 'Available' : 'Unavailable'}`);
        })
        .catch(err => err.response.data.message);
    }

    get movieId() {
        return this.props.match.params.id;
    }

    get isAdmin() {
        return this.context.isAdmin;
    }

    async loadMovie() {
        const movie = await this.context.service.fetchMovieDetail(this.movieId);
        this.setState({movie: movie.data})
        this.props.header.setTitle(movie.data.title || "Undefined")
    }

    formatPrice(price) {
        if(price) return `$${price.toFixed(2)}`
        return "$0.00";
    }
}

export default MovieDetail

