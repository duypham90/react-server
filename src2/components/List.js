import React, { Component } from 'react';
import Note from './Note';
import getAll  from '../api/getAll';
import ProductForm  from './ProductForm';

const arr = ['lam bai tap ve nha', 'nop do an cuoi khoa'];
class List extends Component {
    constructor(props){
        super(props);
        this.state = { mang: [] };
    }
    componentDidMount() {
        getAll()
        .then(arrNote => this.setState({ mang: arrNote }));
    }
    addItem (item){
        this.setState({ mang: this.state.mang.concat(item)});
    }
    
    render() {
        return (
            <div>
                <ProductForm onAdd = {this.addItem.bind(this)}/>
                { this.state.mang.map((e, i) => <Note name = {e.name} key = {i}/>)}
            </div>
        );
    }
}

export default List;