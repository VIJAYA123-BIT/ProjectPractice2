import { LightningElement, track } from 'lwc';

export default class Calci extends LightningElement {
@track Num1 ;
@track Num2;
@track result='';
@track operation=''
oper=false
number1(event){
    this.Num1=event.target.value;
}
number2(event){
    this.Num2 = event.target.value;
}
AddHandler(){
    this.oper=true
    this.result = Number(this.Num1)+Number(this.Num2);
    this.operation= '+'
}
subHandler(){
    this.oper=true
    this.operation= '-'
    this.result =Number(this.Num1)-Number(this.Num2);
}
MulHandler(){
    this.oper=true
    this.operation= '*'
    this.result = Number(this.Num1)*Number(this.Num2);
}
DivHandler(){
    this.oper=true
    this.operation= '/'
    this.result =Number(this.Num1)/Number(this.Num2);
}
resetHandler(){
    this.Num1='';
    this.Num2='';
    this.result='';
    this.oper=false;
}
}