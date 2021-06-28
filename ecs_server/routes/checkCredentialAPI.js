var express = require("express");
var router = express.Router();
var cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

router.post("/", async function(req,res,next) {
//	const file = req.files.filename;
  console.log(req.body);
  var credentialParse = await JSON.parse(JSON.stringify(req.body));
  console.log(credentialParse);
  try{
	let trim_vcString = await JSON.parse(JSON.stringify(credentialParse.verifiableCredentials))[0];
	let vcString_JSONobj = JSON.stringify(trim_vcString);
		console.log(vcString_JSONobj);
	if(vcString_JSONobj.length > 0)
	  {
		const ssi_bridge_url = process.env.SSI_BRIDGE_URL;
		console.log(ssi_bridge_url);
		console.log("forwarding request to SSI bridge: " + ssi_bridge_url );
		axios.post(ssi_bridge_url, vcString_JSONobj, { headers: {
    'content-type': 'application/json'
		}})
	  .then(res => {
		console.log(res.data)
	  })
	  .catch(error => {
		console.error(error)
	  }) 
	  }
	  else {
	  res.statusCode = 400;
	  }
}
catch(error) {
	console.log("Error parsing JSON input");
	res.statusCode = 400;
	}
/*	console.log(JSON.stringify(req.body));
var credentialParse = await JSON.parse(req.body);
try{
	let trim_vcString = await JSON.parse(credentialParse.verifiableCredentials)[0];
	console.log(trim_vcString);
	if(JSON.stringify(trim_vcString.length)> 0)
	  {
		const ssi_bridge_url = process.env.SSI_BRIDGE_URL;
		console.log(ssi_bridge_url);
		console.log("forwarding request to SSI bridge: " + ssi_bridge_url );
		axios.post(ssi_bridge_url, trim_vcString)
	  .then(res => {
		console.log(res.data)
	  })
	  .catch(error => {
		console.error(error)
	  }) 
	  }
	  else {
	  res.statusCode = 400;
	  }
}
catch(error) {
	console.log("Error parsing JSON input");
	res.statusCode = 400;
	}
	res.statusCode = 200;*/
	
})
module.exports=router; 