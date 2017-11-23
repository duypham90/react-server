import React, { Component } from 'react';
import insertProduct from '../api/insertProduct';

class ProductForm extends Component {
    submitForm(e) {
        e.preventDefault();
        const { onAdd } = this.props;
        insertProduct(this.refs.txtName.value).then(resJSON => onAdd(resJSON));
        this.refs.txtName.value = '';
    }
    render() {
        return (
            <div>
                <form action="" onSubmit={ this.submitForm.bind(this) }>
                    <input type="text" ref="txtName" name="name" placeholder="Tên sản phẩm"/>
                    <button>SEND</button>
                </form>
            </div>
        );
    }
}

export default ProductForm;