function checkCashRegister(price, cash, cid) {

  function getVal(money) {
    let value;
    switch(money) {
      case "PENNY":
        value = 0.01;
        break;
      case "NICKEL":
        value = 0.05;
        break;
      case "DIME":
        value = 0.1;
        break;
      case "QUARTER":
        value = 0.25;
        break;
      case "ONE":
        value = 1;
        break;
      case "FIVE":
        value = 5;
        break;
      case "TEN":
        value = 10;
        break;
      case "TWENTY":
        value = 20;
        break;
      case "HUNDERED":
        value = 100;
        break;
    }
    return value;
  }
  
  function evenlyDistributed() {
    let change = (cash - price).toFixed(2);
    let largestIndex = 0;
    let numTimes;
    let realTimes = 0;
    // determine the correct value of largestIndex...
    while(largestIndex < cid.length && getVal(cid[largestIndex][0]) < change) {
      largestIndex++;
    }
    largestIndex--;
    // check if the change can be divided evenly into the money available
    while(change > 0 && largestIndex >= 0) {
      let currentVal = getVal(cid[largestIndex][0]);
      numTimes = Math.floor(change / currentVal);
      
      for(let i = 0; i < numTimes && realTimes * currentVal < cid[largestIndex][1]; i++) {
        realTimes++;
        change -= currentVal;
        change = change.toFixed(2);
      }
      realTimes = 0;
      largestIndex--;
    }
    return change == 0;
  }
  
  function returnChange() {
    let change = (cash - price).toFixed(2);
    let largestIndex = 0;
    let numTimes;
    let realTimes = 0;
    let changeArr = [];
    // determine the correct value of largestIndex...
    while(largestIndex < cid.length && getVal(cid[largestIndex][0]) < change) {
      largestIndex++;
    }
    largestIndex--;

    while(change > 0 && largestIndex >= 0) {
      let currentVal = getVal(cid[largestIndex][0]);
      numTimes = Math.floor(change / currentVal);
      
      for(let i = 0; i < numTimes && realTimes * currentVal < cid[largestIndex][1]; i++) {
        realTimes++;
        change -= currentVal;
        change = change.toFixed(2);
      }
      if(realTimes > 0) {
        changeArr.push([cid[largestIndex][0], realTimes * currentVal]);
      }
      realTimes = 0;
      largestIndex--;
    }
    return changeArr;
  }

  if(evenlyDistributed()) {
    let change = (cash - price).toFixed(2);
    let availableMoney = 0;
    for(let i = 0; i < cid.length; i++) {
      availableMoney += cid[i][1];
    }
    availableMoney = availableMoney.toFixed(2);
    if(availableMoney === change) {
      return {
        status: "CLOSED",
        change: cid
      };
    } else {
      return {
        status: "OPEN",
        change: returnChange()
      };
    }
  } else {
    return {
      status: "INSUFFICIENT_FUNDS",
      change: []
    };
  }
}
