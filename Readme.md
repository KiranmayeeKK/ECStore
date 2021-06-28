# ECStore Application
## A simple application  with React frontend and NodeJS backend

## Configuration
1. Create .env file in both ecs_server and ecs_client folders
2. In ecs_client/.env file, initialize REACT_APP_SERVER_URL variable to backend server `checkCredential` page
3. In ecs_server/.env file initialize the following variables
PORT, SSI_BRIDGE_URL
4. create SSL certificate and key for server, copy it to both ecs_server and ecs_client if both are running on same server, otherwise create two different sets of certificates and keys

## Runninng the applications
use `npm install` and `npm start` commands to run the applications

## Checking the functionality
1. Open `https://ecstore.com:3000` or `https:\\localhost:3000` 
2. Select the items and add them to cart
3. Click on cart to view the items added to cart
4. If any of the added items are adult products, it asks for credential
5. Upload `credential.json` file and click upload button
6. On Upload, the request is sent to backend server where it checks its validity with the Ecommerce SSI bridge 
7. On successful verification, the `proceed to checkout` button is enabled which when clicked redirects to payment page
8. If credential verification is unsuccessful, corresponding error message is displayed to the front end like `Invalid credential, please upload a valid credential`

