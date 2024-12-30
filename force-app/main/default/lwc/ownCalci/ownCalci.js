
import { LightningElement } from 'lwc';

export default class OwnCalci extends LightningElement {
    userNumber=''
    userResult=''
    previousOperation=''
    ClrAll=false ;
    operations ={

        current :0,
        '=' :function(){
            return this.current;
        },
        '+' : function(n){
            this.current += parseInt(n);
            return this;
        },
        '-' : function(n){
            this.current -= parseInt(n);
            return this;
        },
        '*' :  function(n){
            this.current *= parseInt(n);
            return this;
        },
        '/' : function(n){
            this.current /= parseInt(n);
            return this;
        }
    }
    get userResult(){
        return this.operations.current;
    }

    handleClick(event){
        if(this.ClrAll){
            this.userNumber='';
            this.userResult='';
            this.operations.current=0;
            this.ClrAll=false

        }
        this.userNumber=this.userNumber+ event.target.label ;
        if(event.target.label === "CLR"){
            this.userNumber='';
            this.userResult='';
            this.previousOperation='';
        }
        else if(event.target.label ==="+"){
            if(this.operations.current === 0){
                this.operations.current = parseInt(this.userResult)
            }
            else{
                this.userResult = this.operations[this.previousOperation](this.userResult)
            }
            this.previousOperation= '+';
            this.userResult='';
        }
        else if(event.target.label === '-'){
            if(this.operations.current === 0){
                this.operations.current = parseInt(this.userResult);
            }
            else{
                this.userResult = this.operations[this.previousOperation](this.userResult)
            }
            this.previousOperation = "-";
            this.userResult=''
        }
        else if(event.target.label === '*'){
            if(this.operations.current === 0){
                this.operations = parseInt(this.userResult)
            }
            else{
                this.userResult = this.operations[this.previousOperation](this.userResult)
            }
            this.previousOperation= '*';
            this.userResult=''
        }
        else if (event.target.label === "/"){
            if(this.operations.current === 0){
                this.operations = parseInt(this.userResult)
            }
            else {
                this.userResult = this.operations[this.previousOperation](this.userResult)
            }
            this.previousOperation = '/';
            this.userResult=''
        }
        else if(event.target.label === "="){
            this.userResult = this.operations[this.previousOperation](this.userResult);
            this.userResult = this.operations['=']();
            this.ClrAll = true;
        }
        else{
            this.userResult = this.userResult + event.target.label
        }
   }
}