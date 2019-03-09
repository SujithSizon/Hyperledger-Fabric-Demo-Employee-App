# Fabric-Demo-Employee-App
A demo application built on hyper ledger fabric to add employees and read them


## Setup
1. Copy the folder Fabric-Demo-Employee-App/chaincode/emplist (the chaincode) and place it inside your local_dir/fabric-samples/chaincode/
2. Copy the folder Fabric-Demo-Employee-App/emplist (the application) and place it inside local_dir/fabric-samples/
3. cd local_dir/fabric-samples/first-network
4. sudo ./byfn.sh down
5. cd ../emplist
6. sudo docker rm -f $(sudo docker ps -aq)
7. sudo docker rmi -f $(sudo docker images | grep fabcar | awk '{print $3}')
8. sudo docker rmi -f $(sudo docker images | grep emplist | awk '{print $3}')
9. cd local_dir/fabric-samples/emplist
10. sudo ./startFabric.sh javascript
11. cd local_dir/fabric-samples/emplist/javscript
12. npm install
13. cd local_dir/fabric-samples/emplist/javscript/frontend
14. npm install -g @angular/cli
15. npm install
16. ng build
17. cd local_dir/fabric-samples/emplist/javscript
18. node enrollAdmin.js
19. node registerUser.js
20. 



