import { LightningElement ,api} from 'lwc';
import {showToastEvent} from 'lightning/platformShowToastEvent';
import {CloseActionScreenEvent} from 'lightning/actions';
export default class QuickudatesLwc extends LightningElement {
    @api recorId;
    @api objectApiName;
    name
    InputHandler(event){
        this.name=event.detail.value;
    }
    handleSuccess(e){
        this.dispatchEvent(new CloseActionScreenEvent());
        this.dispatchEvent(
            new showToastEvent({
                title : 'Success',
                message : 'Record updated!',
                variant :'success'
            })
        );
    }

}