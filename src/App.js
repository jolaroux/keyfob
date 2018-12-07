import React, { Component } from 'react';
import { Header } from './header.js';
import { Table } from './table.js'
import './App.css';

class App extends Component {

  // constructor(props) {
  //   super(props)
  // this.state = {item: value,

  constructor(props) {
    super(props)

    this.state = { keyObject: [{}], carObject: [{}], keyFobIsWithinRange: true, resetScroll: false, unlockStatus: 0, ifPrevOORindex: 0, canRegenTable: true, lockStatus: true, forceTableRegen: false }
    //changing to unlockStatus = integer because it's easier than keeping track of all the true/false's
    //0 = noUnlockAttempted 
    //1 = successfulUnlock
    //2 = unsuccessfulUnlock
    //3 = keyfob back in range of car but keys don't match up

  }

  componentDidMount() {
    this.regenTable()
  }


  //function that attempts unlock 
  attemptUnlock = () => {

    console.log(
      this.state.keyObject.length
    )

    //see if it needs a table regen 
    if (this.state.keyObject.length === 0) {
      this.setState({ forceTableRegen: true })

    } else {
      //at this point it has recieved that the key wants to unlock the car 
      //it's going to check whether the keyFob is within range of the car 
      if (this.state.keyFobIsWithinRange === false) {
        //the keyFob is out of range

        this.unsuccessfulUnlock()

      } else {
        //here the keyFob is within range of the car 

        //going to see if the first item on the keyObject matches the first item on the carObject 
        if (this.state.keyObject[0].key === this.state.carObject[0].key) {

          //this means the keyfob and the car key matches 
          this.successfulUnlock()

        } else {

          //this means the keyfob and the car key DON'T match 
          this.outOfRangeUnlock()

        }

      }
    }



  }

  //locking the car 
  lockCar = () => {
    this.setState({ lockStatus: true })
  }

  //easy button to click to simulate the key being out of range 
  simulateAntsyToddler = () => {


    //changing the state to unsuccessfulUnlock
    this.setState({ unlockStatus: 2, canRegenTable: false })

    //changing the table 
    //copying manually because javascript
    var KeyTable = []
    for (var i = 1; i < this.state.keyObject.length; i++) {

      if (i !== 0) {
        KeyTable[i - 1] = this.state.keyObject[i]
      }

    }
    var forTabReg = KeyTable.length === 0 ? true : false
    // a delay to reset the table after the successfulUnlock
    setTimeout(() => { this.setState({ keyObject: KeyTable, unlockStatus: 0, canRegenTable: true, forceTableRegen: forTabReg }); }, 1000)
  }




  //when the key is out of range 
  unsuccessfulUnlock = () => {

    //changing the state to unsuccessfulUnlock
    this.setState({ unlockStatus: 2, canRegenTable: false })

    //changing the table 
    //copying manually because javascript
    var KeyTable = [{}]
    for (var i = 1; i < this.state.keyObject.length; i++) {

      if (i !== 0) {
        KeyTable[i - 1] = this.state.keyObject[i]
      }

    }

    // a delay to reset the table after the successfulUnlock
    setTimeout(() => { this.setState({ keyObject: KeyTable, unlockStatus: 0, canRegenTable: true }); }, 2000)

  }

  //this is called when there's an unsuccessful unlock because the keyfob was out of range before but now it's back in range of the car 
  outOfRangeUnlock = () => {

    //need to test if the keyFob code is even on the car's key table 


    //setting to 3 because keyFob was out of range previously 
    this.setState({ unlockStatus: 3, ifPrevOORindex: this.state.carObject.indexOf(this.state.keyObject[0]), canRegenTable: false })//[0].index})

    //need to change the KeyTable to match the key's 
    //changing the table 
    //copying manually because javascript
    var KeyTable = []
    for (var i = 1; i < this.state.keyObject.length; i++) {

      KeyTable[i - 1] = this.state.keyObject[i]
    }

    var forTabReg = KeyTable.length === 0 ? true : false


    // a delay to reset the table after the successfulUnlock
    setTimeout(() => { this.setState({ keyObject: KeyTable, carObject: KeyTable, unlockStatus: 0, canRegenTable: true, forceTableRegen: forTabReg }); }, 2000)

  }

  //this is called if there's a successfulUnlock
  successfulUnlock = () => {

    //starting the successfulUnlock process 
    this.setState({ unlockStatus: 1, canRegenTable: false, lockStatus: false })

    //changing the table 
    //copying manually because javascript
    var KeyTable = []
    for (var i = 1; i < this.state.keyObject.length; i++) {

      KeyTable[i - 1] = this.state.keyObject[i]

    }
    console.log("KEYTABLE LENGTH IS " + KeyTable.length)
    console.log("KEYTABLE 0 is ")
    console.log(KeyTable[0])

    //test 
    var forTabReg = KeyTable.length === 0 ? true : false

    // a delay to reset the table after the successfulUnlock
    setTimeout(() => { this.setState({ keyFobIsWithinRange: true, unlockStatus: 0, keyObject: KeyTable, carObject: KeyTable, canRegenTable: true, forceTableRegen: forTabReg }); }, 2000)
  }

  //function that toggles whether the keyFob is within range or not 
  toggleKeyFobRange = () => {
    console.log("toggleKeyFobRange");

    this.setState({ keyFobIsWithinRange: !this.state.keyFobIsWithinRange })

  }

  //function that regenerates the table 
  regenTable = () => {
    console.log("regenTable");

    //creating the keyObject
    var keyObject = [{}];
    var carObject = [{}];

    //generate 100 keys and values (100 just for demonstrations sake, not trying to murder Chrome)
    for (var i = 0; i < 20; i++) {

      //creating a 40 digit hex number that has all 0's and replacing each one with a random hex degit 
      var randomNumber = "#0000000000000000000000000000000000000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

      //adding to the objects
      let tempObject = { index: i + 1, key: randomNumber, status: "none" }
      keyObject[i] = tempObject;
      carObject[i] = tempObject;

    }


    //now that there's 100 random keys set the state so the table refreshes 
    this.setState({ keyObject: keyObject, carObject: carObject, resetScroll: true, keyFobIsWithinRange: true, forceTableRegen: false });

  }

  render() {
    return (
      // the main screen 
      <div className="App">

        {/* the header with the buttons  */}
        <Header unlockStatus={this.state.unlockStatus} attemptUnlock={this.attemptUnlock} toggleKeyFobRange={this.toggleKeyFobRange} regenTable={this.regenTable} keyFobIsWithinRange={this.state.keyFobIsWithinRange} simulateAntsyToddler={this.simulateAntsyToddler} canRegenTable={this.state.canRegenTable} lockCar={this.lockCar} lockStatus={this.state.lockStatus} forceTableRegen={this.state.forceTableRegen}></Header>

        {/* the labels  */}
        <div className="labels">
          <div className="keyFobLabel">Key Fob</div>
          <div className="carLabel">Car</div>
        </div>

        {/* the keyFob section  */}
        <div className="keyFob">
          <Table name="keyFob" keyObject={this.state.keyObject} unlockStatus={this.state.unlockStatus}></Table>
        </div>

        {/* the line between keyfob and car */}
        <div className="divider">
        </div>

        {/* the car section  */}
        <div className="car">
          <Table name="car" keyObject={this.state.carObject} unlockStatus={this.state.unlockStatus} ifPrevOORindex={this.state.ifPrevOORindex} ></Table>
        </div>
      </div>
    );
  }
}

export default App;
