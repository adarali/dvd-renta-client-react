import React, { Component } from 'react'

export class Select extends Component {
    render() {
        return (
            <>
                <select value={this.props.value} onChange={this.props.onChange} className="form-control custom-select">
                    {
                        this.props.options.map(opt => {
                            return (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            )
                        })
                    }
                </select>
            </>
        )
    }
}

export default Select
