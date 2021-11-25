const fetch = require('node-fetch')
const Api  = require('./Api')

const authHandler = {}

authHandler.Login = async(email)=>{
    const response = await fetch(`${Api.GetUrl()}verifyuser/${email}`)
    results = await response.json();
    return results
}

authHandler.SignUp = async(...params) =>{
    //some code
}

module.exports = authHandler;


