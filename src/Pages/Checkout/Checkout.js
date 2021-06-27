import React from 'react'
import './Checkout.css'
import Subtotal from './Subtotal.js'
import {useStateValue} from './../../Reducer/StateProvider'
import ProductCart from './ProductCart'
import {Link} from 'react-router-dom'

function Checkout(){

    const[{basket}] = useStateValue();
    return (
        <div className="checkout">
            <div className="checkout__left">
           {
               basket.length === 0 ? (
                   <div>
                       <h2 clasName="checkout__title">Your shopping cart is empty</h2>
                       <p> You have no items in your shopping cart</p>
                       <Link to = "/"> Back to shopping</Link>
                    </div>
               ) : (
                   <div>
                       <h2 className="shoppingbaskettitle">Items in the basket</h2>
                       {
                           basket.map(item => (
                               <ProductCart
                               id={item.id}
                               title={item.title}
                               image={item.image}
                               price={item.price}
                               rating={item.rating}
                               hasAgeLimit={item.hasAgeLimit}
                               />
                           ))
                       }
                       </div>
               )
           }
        </div>
        {
            basket.length > 0 && (
            <div className="checkout__right">
                <Subtotal/>
            </div>
            )
        }

        </div>
    )
}

export default Checkout;