// calculator.js
import { LightningElement, track } from 'lwc';
//import math from 'math.js'; // Import math.js

export default class Calculator extends LightningElement {
    @track input = '';
    @track result = '';

    handleInputChange(event) {
        this.input = event.target.value;
    }

    addOperator() {
        this.input += '+';
    }

    subtractOperator() {
        this.input += '-';
    }

    multiplyOperator() {
        this.input += '*';
    }

    divideOperator() {
        this.input += '/';
    }

    calculateResult() {
        try {
            // Use eval to evaluate the input (security concerns for untrusted input)
            // You may want to implement a more robust input parser in a real application
            this.result = eval(this.input);

            //this.result = math.evaluate(this.input);
        } catch (error) {
            this.result = 'Error';
        }
    }
}
