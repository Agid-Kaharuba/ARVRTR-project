import React from 'react';

export default class SomeComponent extends React.Component  {
    handleChange = (e) => {
        this.setState({ input: e.target.value });
    }
    
    handleClick = () => {
        window.open(`uri-unity:${this.state.input}`);
    }
    
    render() {
        return (
            <div>
                <p>Enter argument</p>
                <input type="text" onChange={ this.handleChange } />
                <input
                    type="button"
                    value="Launch Unity"
                    onClick={ this.handleClick }
                />
            </div>
        );
    }

}