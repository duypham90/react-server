import React, { Component } from 'react';

class Note extends Component {
    render() {
        return (
            <div>
                <p>{this.props.name}</p>
            </div>
        );
    }
}

export default Note;