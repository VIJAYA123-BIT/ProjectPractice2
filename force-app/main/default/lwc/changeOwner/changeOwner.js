import { LightningElement,  track, api } from 'lwc';
import getAllUsers from '@salesforce/apex/Users.UsersList';
import assignOwner from '@salesforce/apex/Users.changeRecordOwner';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const USER_COLS = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Email', fieldName: 'Email', type: 'text' },
    { label: 'User Type', fieldName: 'UserType', type: 'text' },
    {
        type: 'button',
        typeAttributes: {
            label: 'Assign'
        }
    }
];

const QUEUE_COLS = [
    { label: 'Name', fieldName: 'DeveloperName', type: 'text' },
    {
        type: 'button',
        typeAttributes: {
            label: 'Click me'
        }
    }
];

export default class ChangeOwner extends LightningElement {
    cols;
    @api recordId;
    @track users;
    @track showDatatable = false;
    @track showMessage = false;
    @track searchType = 'User';
    searchValue = '';


    // update searchValue var when input field value change
    searchKeyword(event) {
        this.searchValue = event.target.value;
    }

    handleChange(event) {
        let checkboxes = this.template.querySelectorAll('[data-id="checkbox"]')
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked === true && checkboxes[i].label === event.target.label) {
                this.searchType = event.target.label;
            } else {
                checkboxes[i].checked = false;
            }
        }
    }

    // call apex method on button click 
    handleSearchKeyword() {
        if (this.searchValue !== '') {
            getAllUsers({
                input: this.searchValue,
                searchType: this.searchType
            })
                .then(result => {
                    if (this.searchType === 'User') {
                        if (result.users.length !== 0) {
                            this.users = result.users;
                            this.cols = USER_COLS;
                            this.showDatatable = true;
                            this.showMessage = false;
                        } else {
                            this.showMessage = true;
                            this.showDatatable = false;
                        }
                    } else {
                        if (result.groups.length !== 0) {
                            this.users = result.groups;
                            this.cols = QUEUE_COLS;
                            this.showDatatable = true;
                            this.showMessage = false;
                        } else {
                            this.showMessage = true;
                            this.showDatatable = false;
                        }
                    }
                })
                .catch(error => {

                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message: error.body.message,
                    });
                    this.dispatchEvent(event);
                    this.users = null;
                });
        } else {
            const event = new ShowToastEvent({
                variant: 'error',
                message: 'Search text missing..',
            });
            this.dispatchEvent(event);

        }
    }

    handleRowAction(event) {
        const row = event.detail.row;
        assignOwner({
            taskId: this.recordId,
            ownerId: row.Id
        })
            .then(result => {
                const event = new ShowToastEvent({
                    variant: 'success',
                    message: 'Task Assigned Successfully',
                });
                this.dispatchEvent(event);
                // location.reload();
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title: 'Error',
                    variant: 'error',
                    message: error.body.message,
                });
                this.dispatchEvent(event);
            })

    }
}