import React from 'react';
// import config from '../config'
// import {connect} from "react-redux";
// import customerActions from '../actions/customer';

class Product extends React.Component {

	buy = () => {
		this.props.addCartItem(this.props.productId);
	};

	render() {
		let imageUrl = this.props.imageUrl;

		return (
			<div className="product">
				<img src={imageUrl} alt={this.props.title}/>
					<div className="bottom">
						<h1>{this.props.title}</h1>
						<h2>{this.props.description}</h2>
						<div className="price">${this.props.price}</div>
						<div className="button" onClick={this.buy}>Buy</div>
					</div>
			</div>
		);
	}
}

// const mapDispatchToProps = {
// 	addCartItem: customerActions.addCartItem
// };

export default Product;