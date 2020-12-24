import "./MovieItem.scss";
import React, { Component } from "react";
import { AuthContext } from 'components/Auth'

export default class MovieItem extends Component {

    static contextType = AuthContext;

    render() {

        const Available = ({movie, isAdmin}) => {
            if(isAdmin)
            return (
                <>
                    <br/><span className={movie.available ? 'movie-available' : 'movie-unavailable'}>{movie.available ? 'Available' : 'Unavailable'}</span>
                </>
            )
            return <></>;
        }

        return (
        <div
            className="movie-item card"
            onClick={() => this.props.onClick(this.movie.id)}
        >
            <div className="movie-image">
                <img src={this.movie.thumbnail} alt="" onError={this.imgOnError}/>
            </div>
            <div className="movie-info">
                <div className="movie-title">{this.movie.title}</div>
                <div className="price">
                    Rental price: {this.formatPrice(this.movie.rentalPrice)} 
                    <br/>Sale price: {this.formatPrice(this.movie.salePrice)}
                    <Available movie={this.movie} isAdmin={this.context.isAdmin} />    
                </div>
            </div>
        </div>
        );
    }

    get movie() {
        return this.props.movie;
    }

    formatPrice(price) {
        return `$${price.toFixed(2)}`
    }

    imgOnError(e) {
        e.target.src = "https://www.thermaxglobal.com/wp-content/uploads/2020/05/image-not-found.jpg"

    }
}
