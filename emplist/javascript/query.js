/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const express2 = require('express');
const router = express2.Router();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});


async function queryAllEmps() {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('emplist');

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: queryCar, CAR4
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        const result = await contract.evaluateTransaction('queryAllEmps');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        return result;

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}

// app.use(express.static(path.join(__dirname, 'angularApp/dist')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'angularApp/dist/index.html'));
// });

app.get('/api/queryAllEmps', (req, res) => {
  queryAllEmps().then( snapshot => {
      res.send(snapshot);
    });
});

app.listen(1337, () => console.log('Server started...'));
