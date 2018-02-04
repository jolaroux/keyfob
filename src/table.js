import React, { Component } from 'react'; 

export class Table extends Component {
  constructor(props) {
    super(props)

  }
  
  componentDidUpdate = () => {

      window.scrollTo(0,0); 
      // React.findDOMNode("tableID").scrollTop = 100;

  }
  
  render() {

    //the class name of the key, deciding color 
    var colorClassName;
    console.log("STATUS IS " + this.props.unlockStatus)
    
    //creating the className variable 
    var colorClassName;
    
    //deciding what the className is 
    switch (this.props.unlockStatus) {
      case 0: colorClassName = "noUnlockAttempted"
      break
      case 1: colorClassName = "successfulUnlock"
      break
      case 2: colorClassName = "unsuccessfulUnlock"
      break
      case 3: colorClassName = "outOfRangeUnlock"
      break
      default: colorClassName = "unsuccessfulUnlock"
    }
  

    //name of the table 
    let name = this.props.name 
    
    //making note of what index should be colored what 
    var whatIndexShouldBeColored;
    //doing the work 
    if (this.props.unlockStatus != 3) {
      //if it's not 3 then color the first one 
      whatIndexShouldBeColored = 0;
    } else {
      //if it IS 3 then we need to color the first one if it's the keyFob table and the matching one if it's the car table
      if (this.props.name == "car") {
        // if this is the car table then color the index that matches whatever the keyFob sent
        whatIndexShouldBeColored = this.props.ifPrevOORindex;
      } else {
        //if it's the key one color 0 
        whatIndexShouldBeColored = 0;
      }
    }
    

    return ( 
      <div className="tableDiv" id="tableID">
        <table className="table">
          <tbody className="tableBody">
            <tr>
              <th>#</th>
              <th>Key</th>
            </tr>
            {this.props.keyObject.map(function(r, index) {     //making sure it's mainly just the first one colored
              return <tr key={"row" + name + r.key} className={(index == whatIndexShouldBeColored) ? colorClassName : "noUnlockAttempted"}>
                <td key={name + index + r.key}>
                  {r.index}
                </td> 
                <td key={name + r.key + index}>
                  {r.key}
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
      
    );
  }
}

export default Table;