import './MovieForm.scss';
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "components/Auth";
import { toast } from 'react-toastify'

export class MovieForm extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        const movie = {...this.props.movie()}
        if(!movie.movieImages) movie.movieImages = []
        this.state = {
            movie,
            message: {},
            imageUrl: ''
        };
        this.props.header.setTitle(`${this.state.movie.id ? "Edit movie" : "Add movie"}`);
    }

    render() {

        const SaveButton = (props) => {
            let history = useHistory();
            return (
                <button className="btn btn-primary mr-2" onClick={() => this.saveMovie(history)}>Save</button>
            )
        }

        const CancelButton = (props) => {
            let history = useHistory();
            return(
                <button className="btn btn-secondary" onClick={() => history.goBack()}>Cancel</button>
            )
        }

        const Navbar = () => {
            return (
                <nav className="navbar navbar-expand navbar-light bg-light navbar-buttons">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <SaveButton />
                        </li>
                        <li className="nav-item">
                            <CancelButton />
                        </li>
                    </ul>
                </nav>
            );
        };

        const movie = { ...this.state.movie };
        const InvalidFeedback = ({ field }) => {

            return (
                <div className={`invalid-feedback ${this.state.message[field] ? 'd-block' : ''}`}>
                    {this.state.message[field]}
                </div>
            )
        }
        return (
            <>
                <Navbar self={this} />
                <div className="form-group">
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                defaultValue={movie.title}
                                className="form-control"
                                onChange={(e) =>
                                    this.setState({ movie: { ...movie, title: e.target.value } })
                                }
                            />
                            <InvalidFeedback field="title" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                cols="30"
                                className="form-control"
                                defaultValue={movie.description}
                                onChange={(e) =>
                                    this.setState({
                                        movie: { ...movie, description: e.target.value },
                                    })
                                }
                            ></textarea>
                            <InvalidFeedback field="description" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <label htmlFor="stock">Stock</label>
                            <input
                                type="number"
                                name="stock"
                                id="stock"
                                className="form-control"
                                min={0}
                                value={movie.stock}
                                onChange={(e) =>
                                    this.setState({ movie: { ...movie, stock: e.target.value } })
                                }
                            />
                            <InvalidFeedback field="stock" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="stock">Rental price</label>
                            <input
                                type="number"
                                name="rentalPrice"
                                id="rentalPrice"
                                className="form-control"
                                min={0.0}
                                defaultValue={movie.rentalPrice}
                                onChange={(e) =>
                                    this.setState({
                                        movie: { ...movie, rentalPrice: e.target.value },
                                    })
                                }
                            />
                            <InvalidFeedback field="rentalPrice" />
                        </div>
                        <div className="col-lg-4">
                            <label htmlFor="salePrice">Sale price</label>
                            <input
                                type="number"
                                name="salePrice"
                                id="rentalPrice"
                                className="form-control"
                                min={0.0}
                                defaultValue={movie.salePrice}
                                onChange={(e) =>
                                    this.setState({ movie: { ...movie, salePrice: e.target.value } })
                                }
                            />
                            <InvalidFeedback field="salePrice" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="imageUrl">Image URL</label>
                            <div className="input-group">
                                <input type="text" 
                                className="form-control" 
                                onChange={(e) =>
                                    this.setState({imageUrl: e.target.value})
                                }
                                />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" onClick={() => this.addImage()}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <InvalidFeedback field="movieImages" />
                        </div>
                    </div>
                </div>
                <div className="images">
                    {
                        this.state.movie.movieImages.map(image => {
                            return(
                                <div className="image-div">
                                    <img src={image.url} className="movie-image" />
                                    <button className="btn btn-outline-secondary btn-remove-image" onClick={() => this.removeImage(image.url)}><i className="fa fa-times"></i></button>
                                </div>
                            )
                        })
                    }
                </div>
            </>
        );
    }

    addImage() {
        let url = this.state.imageUrl;
        if(url) {
            const movie = {...this.state.movie};
            movie.movieImages.push({url})
            this.setState({movie})
        }
    }

    removeImage(url) {
        let movie = {...this.state.movie}
        movie.movieImages = movie.movieImages.filter(image => image.url !== url)
        this.setState({...this.state, movie})
    }

    saveMovie(history) {
        let service = this.context.service;
        return service.saveMovie(this.state.movie).then(res => {
            if(this.state.movie.id) {
                history.goBack();
            }
            else history.push(process.env.PUBLIC_URL+'/movies/'+res.data.id)
        })
            .catch(err => {
                let message = {}
                err.response.data.forEach(d => {
                    message[d.field] = d.error.message;
                });
                this.setState({ ...this.state, message })
            });
    }
}

export default MovieForm;
