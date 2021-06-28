import React,{useState} from 'react'
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

    const formData = new FormData();
    function readFileAsync(file) {
        return new Promise((resolve, reject) => {
          let reader = new FileReader();
      
          reader.onload = () => {
            resolve(reader.result);
          };
      
          reader.onerror = reject;
      
          reader.readAsText(file);
        })
      }
    
    basket.map(item => item.hasAgeLimit =="true"? flagAgeLimit= flagAgeLimit+1 : <p></p>)

      const selectFile =async(event) => {
           
          console.log("File read started");
       let fileObj =  await readFileAsync(event.target.files[0]);
       console.log("File read finished");
    
        let checkJSON = JSON.parse(fileObj);
    //    console.log("original string" + JSON.stringify(checkJSON));
     //   console.log("print JSON" + JSON.stringify(checkJSON['verifiableCredentials']));
       // console.log("print JSON123" + JSON.stringify(checkJSON.verifiableCredentials));
        
        dispatch({
            type: 'SELECT_FILE',
            file: event.target.files[0]
        })
    }
     const uploadCredentialFile = async() => {
         
            console.log("uploading to server");
            console.log("File read started");
            let fileObj =  await readFileAsync(selectedCredentialFile);
            console.log("File read finished");
            const headers = {
                'Content-Type': 'application/json',
              }
             let formData = JSON.parse(fileObj);
            console.log(formData);
          //  formData.append("fileName", fileName);
        const server_url = process.env.REACT_APP_SERVER_URL;
        axios.post(server_url, formData, { headers : headers
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