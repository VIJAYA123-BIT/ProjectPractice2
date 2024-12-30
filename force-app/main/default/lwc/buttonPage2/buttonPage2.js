import { LightningElement ,api,track,wire} from 'lwc'
import UsersList from '@salesforce/apex/Users.UsersList';
import taskRecord from '@salesforce/apex/Users.taskRecord';
import changeRecordOwner from '@salesforce/apex/Users.changeRecordOwner';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent} from 'lightning/actions';
import { refreshApex } from '@salesforce/apex';
import { RefreshEvent } from 'lightning/refresh';
import { CurrentPageReference } from 'lightning/navigation';
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
export default class buttonPage extends LightningElement {
    columns = columns;
    @api recordId;
    @api objectApiName; 
    SelectedUser
    searchKey = '';
    @track data = [];
    filteredData = [];
    @track UserTable=false;
    selectedUsers =false;
    usersData=[]
    @track wiredData;
    @api newOwnerId;
    handleSuccess=true
    InputHandler(event){
        if(this.selectedUsers == true){
            this.searchKey = event.target.value.toLowerCase();
            this.filteredData = this.data.filter(row =>
                Object.values(row).some(value => String(value).toLowerCase().includes(this.searchKey))
            );
            this.usersData= this.filteredData
        }
        }
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
            const actionName = event.detail.action.value;
            const row = event.detail.row;
                changeRecordOwner({
                    recordId: this.recordId,
                    newOwnerId: row.Id
                })
                .then(result => {
                    const event = new ShowToastEvent({
                        variant: 'success',
                        message: 'Task Assigned Successfully',
                    });
                    // this.dispatchEvent(event);
                    // location.reload();
                    this.closeAction();
                })
                .catch(error => {
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                })
                console.log('Button clicked on: ', row.Name);

            }
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
    closeAction() {
        this.dispatchEvent(new CloseActionScreenEvent({bubbles: true, composed: true}));
        console.log('heyy ,template get closed');
    }
    
   
}
