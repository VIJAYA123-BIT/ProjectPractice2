import { LightningElement, track } from 'lwc';

export default class Calculator extends LightningElement {
    @track inputExpression = '';
    @track result = '';

    handleInputChange(event) {
        this.inputExpression = event.target.value;
    }

    calculateResult() {
        try {
            // Use eval to calculate the result. Ensure it's a safe expression.
            const safeExpression = this.inputExpression.replace(/[^-()\d/*+.]/g, '');
            this.result = eval(safeExpression);
        } catch (error) {
            this.result = 'Error';
        }
    }
}
