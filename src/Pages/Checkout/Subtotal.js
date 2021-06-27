import React from 'react'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from './../../Reducer/StateProvider'

function Subtotal(){
    const getCartTotal = (basket) =>
    basket?.reduce((amount,item) => item.price + amount, 0);
    const [{basket, isVerified}, dispatch] = useStateValue();

    let flagAgeLimit = 0
    
    basket.map(item => item.hasAgeLimit =="true"? flagAgeLimit= flagAgeLimit+1 : <p></p>)

    return(<div className="subtotal">
        {/* computing price*/}
        <CurrencyFormat
        renderText = {(value) => (
            <p>
                Subtotal({basket.length} items) : <strong>{value}</strong>
            </p>
        )}
        decimalScale={2}
        value ={getCartTotal(basket)}
        displayType = {"text"}
        thousandSeperator ={true}
        prefix= {"€"}
        />
        
        {
             flagAgeLimit > 0 &&  
            <div>           
                 <input type="file" name="credentialFile"/>
                 <button onClick="uploadCredentialFile">Upload</button>
             </div>
        }
        {
              (flagAgeLimit == 0 || isVerified ) &&  <button>Proceed to Checkout</button>
        }
    </div>
    )
}

export default Subtotal;