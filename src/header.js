import React, { Component } from 'react';

export class Header extends Component {

  constructor(props) {
    super(props)

  }

  render() {


    //creating the className variable 
    var colorClassName;
    var attemptUnlockName;
    var carLockStatusLabel;

    carLockStatusLabel = this.props.lockStatus ? "Car is LOCKED 🔒" : "Car is UNLOCKED 🔑"

    //deciding what the className is 
    switch (this.props.unlockStatus) {
      case 0: colorClassName = "bigbuttonnoUnlockAttempted"
        attemptUnlockName = "Unlock"
        // carLockStatusLabel="Car is LOCKED"
        break
      case 1: colorClassName = "bigbuttonsuccessfulUnlock"
        attemptUnlockName = "Unlock"
        // carLockStatusLabel="Car is UNLOCKED"
        break
      case 2: colorClassName = "bigbuttonunsuccessfulUnlock"
        attemptUnlockName = "Unlock FAILED"
        // carLockStatusLabel="Car is LOCKED"
        break
      case 3: colorClassName = "bigbuttonoutOfRangeUnlock"
        attemptUnlockName = "OUT OF SYNC. TRY AGAIN"
        // carLockStatusLabel="Car is STILL LOCKED"
        break
      default: colorClassName = "bigbuttonunsuccessfulUnlock"
        attemptUnlockName = "Unlock FAILED"
      // carLockStatusLabel="Car is LOCKED"
    }





    return (
      // the header 
      <div className="header">

        {/* toggles keyfob distance  */}
        {/* <div className="leftDistanceButton">
          <button className="bigButton" onClick={this.props.toggleKeyFobRange} disabled={this.props.forceTableRegen}>{this.props.keyFobIsWithinRange ? "Move Key OUT of range" : "Move Key WITHIN range"}</button>
        </div> */}

        {/* simulate antsy toddler */}
        <div className="antsyToddler" >
          <button className="bigButton" onClick={this.props.simulateAntsyToddler} disabled={this.props.forceTableRegen}>Simulate out of range unlock attempt</button>
        </div>

        {/* attempts unlock  */}
        <div className="centerButton">
          <button className={colorClassName} onClick={this.props.attemptUnlock} disabled={this.props.forceTableRegen}>{attemptUnlockName}</button>
        </div>

        {/* lock button */}
        <div className="lockButton">
          <button className="bigButton" onClick={this.props.lockCar} disabled={this.props.forceTableRegen}>
            Lock
          </button>
        </div>

        {/* label for car lock status  */}
        <div className="carLockStatusLabel">
          <label>{carLockStatusLabel}</label>
        </div>

        {/* regenerates Table of keys  */}
        <div className="rightRegenButton">
          <button className="bigButton" onClick={this.props.regenTable} disabled={!this.props.canRegenTable}>Regen table</button>
        </div>

      </div>

    );
  }
}

export default Header;