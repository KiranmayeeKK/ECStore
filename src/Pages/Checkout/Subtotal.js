import React from 'react'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from './../../Reducer/StateProvider'  
import axios from 'axios'
import { ClosedCaptionOutlined } from '@material-ui/icons';
import './Subtotal.css'

function Subtotal(){
    //calculating cart total price
    const getCartTotal = (basket) =>
    basket?.reduce((amount,item) => item.price + amount, 0);
    const [{basket, isVerified, selectedCredentialFile}, dispatch] = useStateValue();

    let flagAgeLimit = 0
    
    basket.map(item => item.hasAgeLimit =="true"? flagAgeLimit= flagAgeLimit+1 : <p></p>)

      const selectFile =(event) => {
        dispatch({
            type: 'SELECT_FILE',
            file: event.target.files[0]
        })
    }
/*
    const setIsVerified = () => {
        dispatch({
            type: 'SET_IS_VERIFIED',
            value: true
        }        )
    }
*/
     const uploadCredentialFile = () => {
        const data = new FormData()
        const server_url = process.env.REACT_APP_SERVER_URL;
        data.append('file', selectedCredentialFile)
        axios.post(server_url, data, { 
           // receive two    parameter endpoint url ,form data
       })
     .then(res => { 
   //      console.log(res.data)
        res.data == "verified" && 
        dispatch({
            type: 'SET_IS_VERIFIED',
            value: true
        }        )
      })
     }

    return(<div className="subtotal">
        {/* computing price*/}
        <CurrencyFormat
        renderText = {(value) => (
            <p className="subtotal_credentialFields" >
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
            <div className="subtotal_credentialFields">           
                 <input type="file" name="credentialFile" onChange={selectFile}/>
                 <button onClick={uploadCredentialFile}>Upload Identity</button>
             </div>
        }
        {
              (flagAgeLimit == 0 || isVerified ) &&  <button>Proceed to Checkout</button>
        }
    </div>
    )
}

export default Subtotal;