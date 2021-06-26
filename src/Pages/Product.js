import React from 'react'
import { useStateValue } from '../Reducer/StateProvider'

import { useHistory } from 'react-router-dom'

import './Product.css'

function Product({id, title, image, price, rating}){
    const [{basket}, dispatch] = useStateValue()
    console.log('basket content', basket)
    let history = useHistory()
    const addToBasket = () => {
        if(basket.length == 0) {
            history.push("/register");
        }
        else {
        dispatch({
        type: 'ADD_TO_BASKET',
        item: {
            id: id,
            title: title,
            image: image,
            price: price,
            rating: rating
        }
        })
        }
    }
    return (
        <div className="product">
            <div className="product__info">
                <p>{title}</p>
                <p className="product__price">
                    <small>€</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    {
                        Array(rating)
                        .fill()
                        .map((_) => (
                            <p>*</p>
                        ))
                    }
                </div>
            </div>  
            <img src={image} alt=""/>
            <button onClick={addToBasket}>Add to Cart</button>
        </div>
    )
}

export default Product;