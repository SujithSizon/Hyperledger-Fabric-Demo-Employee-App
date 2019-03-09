/*
 * SPDX-License-Identifier: Apache-2.0
 * THIS IS THE SMART CONTRACT!!!!!!!!!!!!!
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class EmpList extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const emps = [
            {
                name: 'Alice',
                age: '21',
                dept: 'Compliance',
            },
        ];

        for (let i = 0; i < emps.length; i++) {
            emps[i].docType = 'emp';
            await ctx.stub.putState('EMP' + i, Buffer.from(JSON.stringify(emps[i])));
            console.info('Added <--> ', emps[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEmp(ctx, empNumber) {
        const empAsBytes = await ctx.stub.getState(empNumber); // get the car from chaincode state
        if (!empAsBytes || empAsBytes.length === 0) {
            throw new Error(`${empNumber} does not exist`);
        }
        console.log(empAsBytes.toString());
        return empAsBytes.toString();
    }

    async addEmp(ctx, empNumber, name, age, dept) {
        console.info('============= START : Create Car ===========');

        const emp = {
            name,
            docType: 'emp',
            age,
            dept,
        };

        await ctx.stub.putState(empNumber, Buffer.from(JSON.stringify(emp)));
        console.info('============= END : Create Car ===========');
    }

    async queryAllEmps(ctx) {
        const startKey = 'EMP0';
        const endKey = 'EMP999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                const Key = res.value.key;
                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                allResults.push({ Key, Record });
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }



}

module.exports = EmpList;
