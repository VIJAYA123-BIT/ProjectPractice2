public with sharing class Users {
    @AuraEnabled(cacheable= true)
    public static List<User> UsersList() {

        return [SELECT  Id, Name, Email, UserType  FROM User];
    }
    // @AuraEnabled(cacheable= true)
    // public static List<MentorTasks__c> taskRecord() {

    //     return [SELECT 	Id,OwnerId FROM MentorTasks__c];
    // }
    @AuraEnabled(cacheable= true)
    public static void changeRecordOwner(Id recordId, Id newOwnerId) {
        // Query the record
        // MentorTasks__c record = [SELECT Id FROM MentorTasks__c WHERE Id = :recordId LIMIT 1];

        // // Set the new owner
        // record.put('OwnerId', newOwnerId);

        // // Update the record
        // update record;
        try {
            MentorTasks__c t = new MentorTasks__c();
            t.id = recordId;
            t.OwnerId = newOwnerId;
            update t;
        } catch (exception ex) {
            throw ex;
        }
    }
    
} 