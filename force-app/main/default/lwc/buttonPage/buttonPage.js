import { LightningElement ,api,track,wire} from 'lwc'
import UsersList from '@salesforce/apex/Users.UsersList';
import changeRecordOwner from '@salesforce/apex/Users.changeRecordOwner';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent} from 'lightning/actions';
// import { getRecordNotifyChange } from 'lightning/uiRecordApi';
import {NavigationMixin} from 'lightning/navigation';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Email', fieldName: 'Email' },
    { label: 'UserType', fieldName: 'UserType'},
    { label: 'Action',
        type: 'button',
        initialWidth: 135, typeAttributes: {
            label: 'Assign',
            name: 'assign',
            variant: 'brand',
            value : 'assign'
        }}
];
export default class buttonPage extends NavigationMixin(LightningElement) {
    columns = columns;
    @api recordId;
    @api objectApiName; 
    SelectedUser
    searchKey = '';
    @track data = [];
    filteredData = [];
    @track UserTable=false
    @track showDataTable = false;
    selectedUsers =false;
    usersData=[]
    @track wiredData;
    @api newOwnerId;
    @wire(UsersList) UserHandler({ error, data }) {
        if (data) {
            this.data = data;
            this.filteredData = this.data; // Initialize filtered data with all rows
            this.wiredData = data
            console.log('the data is '+this.filteredData);
        } else if (error) {
            // Handle error
        }
    }
    
    InputHandler(event){
        if(this.selectedUsers == true){
            this.searchKey = event.target.value.toLowerCase();
            this.filteredData = this.data.filter(row =>
                Object.values(row).some(value => String(value).toLowerCase().includes(this.searchKey))
            );
            this.usersData= this.filteredData
        }}
    value = [];
    get options() {
        return [
            { label: 'Users', value: 'Users' },
            { label: 'Queue', value: 'Queue' },
        ];
    }
    handleChange(e) {
        this.selectValue = e.detail.value;
        if(this.selectValue == 'Users'){
            this.selectedUsers = true ;
            this.usersData= this.filteredData
            console.log('heiiii ,selected users')
            console.log('the recod id is '+this.recordId);
            
        }
        else{
            this.usersData=[];
        }
      }

      handleRowAction(event) {
          console.log('the result is changed');
        //   this.quickbox =false;
            const actionName = event.detail.action.value;
            const row = event.detail.row;
                    changeRecordOwner({
                    recordId: this.recordId,
                    newOwnerId: row.Id
                })
                this.dispatchEvent(new ShowToastEvent({
                    title : 'Success',
                    message : 'Record updated!',
                    variant :'success'
                })
                )
                this.dispatchEvent(new CloseActionScreenEvent());
                this.navigationtoRecordPage()
                console.log('Button clicked on: ', row.Name);
            }
                navigationtoRecordPage(){
                    this[NavigationMixin.Navigate]({
                        type:'standard__recordPage',
                        attributes:{
                            recordId:this.recordId,
                            objectApiName: 'MentorTasks__c',
                            actionName: 'view'
                        }
                    })
                }
                disconnectedCallback(){
                    window.location.reload();
                }  
}
