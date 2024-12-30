import { LightningElement,wire,track,api } from 'lwc';
import getProducts from '@salesforce/apex/ProductValues.getProducts';
import saveRecord from '@salesforce/apex/ProductValues.saveRecord';
import { createRecord } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

const columns = [
    { label: 'Product Name', fieldName: 'Name' },
    { label: 'Product Class', fieldName: 'ProductClass', type: 'Picklist' },
    { label: 'Product Code', fieldName: 'ProductCode', type: 'text' },
    { label: 'Division', fieldName: 'Division__c', type: 'text' },
];
export default class ChangeBrand  extends LightningElement {
cols=columns;
recordId;
@track ProdValues=[];
userDivision;

connectedCallback(){
    this.getBrandProducts();
}
getBrandProducts(){ // for displaying the data table
    getProducts().then(response => {
        console.log(response);
        this.ProdValues = response;
        console.log('the values are ' +JSON.stringify(this.ProdValues));
        this.userDivision = this.ProdValues[0].Division__c
        console.log('the values are ' +JSON.stringify(this.userDivision));
    }).catch(error => {
        console.log(error);
    })
}
HandleCreate = false;
ProductName
ProductCode
Active
ProductDescription
@track isChecked = false;
handleCreateProduct(){
    this.HandleCreate = true;
}
InputHandler(event){
    this.ProductName = event.target.value;
    console.log('the namloipuj' +this.ProductName)
}
InputHandler1(event){
    this.ProductCode = event.target.value;
}
// InputHandler2(event){
//     this.Active = event.target.value;
// }
InputHandler3(event){
    this.ProductDescription = event.target.value;
}

Canclebutton(){
    this.HandleCreate = false;
    this.ProductName='';
    this.ProductCode='';
    this.ProductDescription='';
}
SaveButton(){
    console.log('the record is there');
    saveRecord({ ProductName: this.ProductName, ProductCode:this.ProductCode, ProductDivision:this.userDivision, ProductDescription :this.ProductDescription})
            .then(result => {
                // Handle successful save
                console.log('Hey the record get saved');
                refreshApex(this.getBrandProducts())
                this.ProductName='';
                this.ProductCode='';
                this.ProductDescription='';
                })
            .catch(error => {
                // Handle error
                console.log('Hey the record not get saved' +error);
            });
    // const fields = {
    //     Name : this.ProductName,
    //     ProductCode: this.ProductCode,
    //     Description : this.ProductDescription,
    //     Division__c: this.userDivision
    // };
    // console.log('thre name is '+ this.ProductName)
    // const recordInput = { apiName: 'Product2', fields };
    // createRecord(recordInput).then(() => {
    //     console.log('records saved');
    //     refreshApex(this.getBrandProducts());
    //     // console.log('the records are '+JSON.stringify(this.recordList))
        
    // }).catch(error => {
    //     console.log('the errorr is coming')
    //     console.log(error);
    // });
    this.HandleCreate = false;
}

}