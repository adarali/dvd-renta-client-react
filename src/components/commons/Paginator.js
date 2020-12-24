import './Paginator.scss'
import React, { Component } from 'react'

export default class Paginator extends Component {

    constructor(props) {
        super(props)
        const maxPages = this.props.maxPages || 10;
        this.state = {
            maxPages: calcMaxPages(maxPages)
        }

        window.addEventListener("resize", () => {
            if(this._isMounted) {
                this.setState({maxPages: calcMaxPages(maxPages)})
            }
            
        })
    }

    render() {
        const arr = [];
        const { page, totalPages, setPage } = this.props;
        const max = this.state.maxPages
        let start = page - Math.floor(max / 2)
        if((totalPages - start) < max) {
            start = totalPages - max
        }
        if(start < 0) start = 0
        for (let i = start; i < totalPages && arr.length < max; i++) {
            arr.push(<li className={`page-item page-item-number ${page === i ? "active" : ""}`} key={i}><button className="page-link" onClick={() => setPage(i)}>{i + 1}</button></li>)
            
        }
        return (
            <div className="d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><button className="page-link" href="#" onClick={this.props.first} disabled={page === 0}>«</button></li>
                        <li className="page-item"><button className="page-link" href="#" onClick={this.props.prev} disabled={page === 0}>‹</button></li>
                        {arr}
                        <li className="page-item"><button className="page-link" onClick={this.props.next} disabled={this.isLastPage}>›</button></li>
                        <li className="page-item"><button className="page-link" onClick={this.props.last} disabled={this.isLastPage }>»</button></li>
                    </ul>
                </nav>
            </div>
        )
    }

    componentDidMount() {
        this._isMounted = true;
    }

    get isLastPage() {
        return this.props.page + 1 >= this.props.totalPages
    }
}

function getViewport () {
    const width = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    )
    if (width <= 576) return 'xs'
    if (width <= 768) return 'sm'
    if (width <= 992) return 'md'
    if (width <= 1200) return 'lg'
    return 'xl'
  }
  
  function calcMaxPages(maxPages) {
      let vp = getViewport();
      let result = maxPages;
      if(vp === 'xs') result = 3;
      else if(vp === 'sm') result = 10;
      else if(vp === 'md') result = 15;
      else if(vp === 'lg') result = 15;
      return maxPages < result ? maxPages : result;
  }