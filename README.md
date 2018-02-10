
# NeuroChain

Take a deep look at the project [NeuroChain](https://www.neurochaintech.io/). Future of blockchain is coming soon...

This sandbox permits us to test some features of our projects. Mainly about communication and consensus matters. We are currently using NodeJS to develop this prototype for quickness reason. Final version of NeuroChain will be mostly developed in C++.

Updates are coming every day.


## Prototype User Interface

This user interface is a **minimalist blockchain simulator**. In this environement, few bots run together and perform a **specific use case**. We choosed a **traceability** example to implement the business side of our bots.


### The Bot
**All bots** running in the environement are instances of the **same application**, our bot prototype (loaded from the NeuroChain/Prototype repo).
Prototype features:
* **Network**: bot uses a directory of known bots to share information and to weight decisions.
* **Storage**: bot stores its own version of the blockchain locally in a PouchDB storage.
* **Traceability job**: bot is dynamically set to perform a specific job from the Traceability use case (Fruits Producer, carrier, warehouse, shop).
* **Transaction**: bot knows when it should create a transaction and the associated content.
* **Block**: bot knows when it should create a block and how to select transactions to put in.
* **Security**: from a received message, bot knows if this message is authentic or not.
* **Consensus**: bot select the next block forger using a seed function


### The User Interface
To **simplify the test** of our bot and make easier **the build of a minimalist NeuroChain environement**, we decided to create an easy launcher and an Electron interface.

The launcher uses a declaration list of bots with some properties:
* **Identifier**: bot needs to be recognized by peers
* **Listening Port**: bot is listening to peers at a specific port (UDP comunication).
* **Sending Port**: bot send communication from thi port ((UDP comunication).
* **Seed Host**: IP of the seed bot. For this prototype, bots run locally so 127.0.0.1.The seed bot is the sponsor of the current bot. The sponsor grant  or not the access the network.
* **Seed Port**: The listening port of the seed bot.
* **Connector UDP Port**: the user interface will allow interaction with a running bot (transactions creation for example). Data will go trough this port.
* **WebSocket Port**: Logs of a bot are readable on this port. The Electron interface get the logs from this port and displays it.

**What is doing this program ?**


The current version shows a 4 bots environment playing a Traceability use case.

Each bot has a specific role : producer, carrier, warehouse and shop.


Producer creates fruits and converts it into transactions.


Transactions are propagated to the other bots.


When there are enough transactions, bots create blocks.


Consensus is established between the 4 bots to decide which one is going to write in the ledger. The block is written.


When Production transactions are written into the NeuroChain, the carrier, then the warehouse, then the shop can perfom their jobs too.


Every information is shared, approved and validated by the network.


During the run you can read the logs of each bot. You can also select the type of logs the interface is displaying.

## Run this program
Clone this repository then run:
```
npm install
```
Launch the Prototype-UI :
```
npm start
```
##
