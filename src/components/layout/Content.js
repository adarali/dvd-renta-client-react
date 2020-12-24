import React, { Component } from 'react'

export class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'No title'
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">                                    
                                    <div className="card-body">
                                        {
                                            this.props.content
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Content
