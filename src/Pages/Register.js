import React from 'react'

//import the stylesheet
import './Register.css'

function Register(){

    return(
        <div className="register">
            <div className="register__container">
                <h1> Registration</h1>
                <form>
                    <h5>Username</h5>
                    <input type="text"></input>
                    <h5>E-mail</h5>
                    <input type="email"></input>
                    <button type="submit" className="register__registerButton">Register</button>
                </form>
                <p>The above fields are mandatory to track Users order</p>
            </div>
        </div>
    )
}

export default Register