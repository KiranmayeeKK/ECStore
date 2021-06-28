var express = require("express");
var router = express.Router();
var cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');
const { response } = require("express");
dotenv.config();

router.post("/", async function(req,res,next) {
//	const file = req.files.filename;
  console.log(req.body);
  try {
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
	  .then(SSI_res => {
		  console.log(SSI_res.data);
		  let SSI_response = JSON.stringify(JSON.parse(JSON.stringify(SSI_res.data)).isVerified);
		  console.log("response value : " + SSI_response);
		if(SSI_response == "true")
		{ console.log("success");
		res.statusCode = 200;
		res.send("valid");
		}
		else {
			res.statusCode = 400;
			res.send("Invalid credential, please upload a valid credential");
			}
	  })
	  .catch(error => {
		console.error(error)
	  }) 
	  }
	  else {
		res.statusCode = 400;
		res.send("Missing credential information in the uploaded file");
	  }
}
catch(error) {
	console.log("Missing credential information in the uploaded file");
	res.statusCode = 400;
	res.send("Missing credential information in the uploaded file");
	}
}
catch(error) {
	console.log("Error parsing JSON input");
	res.statusCode = 400;
	res.send("Expected a JSON file");
}
})
module.exports=router; 