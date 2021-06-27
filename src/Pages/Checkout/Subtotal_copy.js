import React from 'react'
import CurrencyFormat from 'react-currency-format'
import {useStateValue} from '../../Reducer/StateProvider'

//to communicate with ECS server
import axios from 'axios';

function Subtotal(){
    const getCartTotal = (basket) =>
    basket?.reduce((amount,item) => item.price + amount, 0);
    const [{basket}, dispatch] = useStateValue();
  /*  this.state = {
        selectedFile: null
      }
    const onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      };

      const uploadCredentialFile = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:3001/uploadCredentialFile", data, { 
            // receive two    parameters - endpoint url ,form data
        })
      .then(res => { // then print response status
          console.log(res.statusText)
       })
      }
      }
*/
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
        <button>Proceed to Checkout</button>
    {/*    <input type="file" name="credentialFile" onChange={onChangeHandler}/>
       <button onClick="uploadCredentialFile">Upload</button> */}
    </div>
    )
}

export default Subtotal;