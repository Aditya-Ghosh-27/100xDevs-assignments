/*
  Implement a class `Calculator` having below methods
    - initialise a result variable in the constructor and keep updating it after every arithmetic operation
    - add: takes a number and adds it to the result
    - subtract: takes a number and subtracts it from the result
    - multiply: takes a number and multiply it to the result
    - divide: takes a number and divide it to the result
    - clear: makes the `result` variable to 0
    - getResult: returns the value of `result` variable
    - calculate: takes a string expression which can take multi-arithmetic operations and give its result
      example input: `10 +   2 *    (   6 - (4 + 1) / 2) + 7`
      Points to Note: 
        1. the input can have multiple continuous spaces, you're supposed to avoid them and parse the expression correctly
        2. the input can have invalid non-numerical characters like `5 + abc`, you're supposed to throw error for such inputs

  Once you've implemented the logic, test your code by running
*/

class Calculator {
  constructor(){
    this.result = 0;
  }
  add(num){
    this.result += num;
  }
  subtract(num){
    this.result -= num;
  }
  multiply(num){
    this.result *= num;
  }
  divide(num){
    if(num === 0){
      throw new Error ("Divide by 0 is not possible");
    }
    this.result /= num;
  }
  clear(){
    this.result = 0;
  }
  getResult(){
    return this.result;
  }
  calculate(expression){
    // Removes continenous spaces from expressions and validate expression
    const cleanedExpression = expression.replace(/\s+/g, ' ').trim();
    if(!/^[0-9+\-*/(). ]+$/.test(cleanedExpression)){
    throw new Error("Invalid characters in the expression")
    }

    try{
      this.result = eval(cleanedExpression);
      
      if(!isFinite(this.result)){
        throw new Error("Cannot divide by zero");
      }
      return this.result;
    }
    catch(error){
      if(error instanceof TypeError || error instanceof SyntaxError){
        throw new Error("Invalid Expression");
      }
      else if(error instanceof ReferenceError){
        throw new Error("Undefined Expression in the variable");
      }
      else if(error instanceof RangeError){
        throw new Error("Invalid expression in the range");
      }
      else if(error instanceof Error){
        throw new Error(error.message);
      }
    }
    
  }
}

module.exports = Calculator;
