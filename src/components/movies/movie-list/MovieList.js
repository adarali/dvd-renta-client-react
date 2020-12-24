import "./MovieList.scss";
import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import MovieItem from "../movie-item/MovieItem";
import Paginator from "components/commons/Paginator";
import Select from "components/commons/Select";
import { AuthContext } from "components/Auth";

export default class MovieList extends Component {

  static contextType = AuthContext

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      params: {
        page: 0,
        per_page: 12,
        title: "",
        available: 1,
        sort: "title",
      },
      totalRecords: 0,
      sortIcon: "fa-sort-amount-up-alt",
    };
    this.props.header.setTitle("Movies");
  }

  handleKeyUp = (e) => {
    if (e.key === "Enter") {
      let params = {...this.state.params, title: e.target.value, page: 0}
      this.setState({params});
      this.loadMovies(params)
    }
  };

  handleSortDirClick = (e) => {
    const params = {...this.state.params};
    if (params.sort.startsWith("-")) {
      params.sort = params.sort.substr(1);
      params.page = 0;
      this.setState({ sortIcon: "fa-sort-amount-up-alt" });
    } else {
      params.sort = "-" + params.sort;
      this.setState({ sortIcon: "fa-sort-amount-down" });
    }

    this.setState({params})
    this.loadMovies(params)
  };

  render() {
    return (
      <div>
        <div className="movie-list-header">
          <div className="row mb-2">
            <div className="col-md-6">
              <div className="input-group">
                <Select value={this.sortField} options={[
                  {value: 'title', label: 'Sort by title'},
                  {value: 'likes', label: 'Sort by likes'},
                ]} onChange={() => {}}/>
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleSortDirClick} aria-label="Asc/Desc">
                    <i className={"fa " + this.state.sortIcon}></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="title-search form-control"
                  placeholder="Search by title"
                  onKeyUp={this.handleKeyUp}
                />
                <div className="input-group-append">
                  <button className="btn btn-primary" onClick={() => this.loadMovies()} aria-label="Search"><i className="fa fa-search"></i></button>
                </div>
              </div>
            </div>
          </div>
          {this.isAdmin &&
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <Select value={this.state.params.available} options={[
                  {value: '1', label: 'Available only'},
                  {value: '0', label: 'Unavailable only'},
                  {value: '2', label: 'All'},
                ]} onChange={(e) => {
                  const params = {...this.state.params};
                  params.available = e.target.value;
                  params.page = 0
                  this.setState({params});
                  this.loadMovies(params);
                }}/>
                <div className="input-group-append">
                  <AddMovie />
                </div>
              </div>
            </div>
          </div>
          }
          <div className="row justify-content-center">
            <div className="col-12 paginator-col mx-auto">
              <MoviePaginator context={this} />
            </div>
          </div>
        </div>
        <div className="row">
          <MovieItems movies={this.state.movies} />
        </div>
        <MoviePaginator context={this} />
      </div>
    );
  }

  componentDidMount() {
    this.loadMovies();
  }

  loadMovies(params = this.state.params) {
    this.context.service.fetchMovies(params).then((res) => {
      let totalCount = res.headers["x-total-count"];
      this.setState({ movies: res.data, totalRecords: totalCount });
      this.props.header.setTitle("Movies: "+totalCount);
    });
  }

  get currTime() {
    return new Date().getTime();
  }

  get isAdmin() {
    return this.context.isAdmin;
  }

  get sortField() {
    let sort = this.state.params.sort;
    if(sort.startsWith("-")) return sort.substr(1)
    return sort;
  }

  get totalPages() {
    return Math.ceil(this.state.totalRecords / this.state.params.per_page);
  }

  get currentPage() {
      return this.state.params.page
  }

  setPage = (page) => {
    if(!(page >= 0 && page < this.totalPages)) return;
    // const params = { ...this.state.params };
    // params.page = page;
    this.setState({params: {...this.state.params, page}}, this.loadMovies)
  };
}

function MovieItems(props) {
  const history = useHistory();
  return props.movies.map((movie) => {
    function handleClick(id) {
      history.push(`${process.env.PUBLIC_URL}/movies/${id}`);
    }
    return (
        <div key={movie.id} className="col-xl-4 col-md-6 col-12">
          <MovieItem key={movie.id} movie={movie} onClick={handleClick} />
        </div>
    );
  });
}

function MoviePaginator({context}) {
  return(
    <Paginator
      page={context.state.params.page}
      setPage={(page) => context.setPage(page)}
      totalPages={context.totalPages}
      first={() => context.setPage(0)}
      prev={() => context.setPage(context.currentPage - 1)}
      next={() => context.setPage(context.currentPage + 1)}
      last={() => context.setPage(context.totalPages - 1)}
    />
  )
}

function AddMovie() {
  const history = useHistory();
  return (
    <button className="btn btn-primary" onClick={() => {
      history.push(process.env.PUBLIC_URL+'/movies/add');
    }}><i className="fa fa-plus"></i>Add movie</button>
  )
}
