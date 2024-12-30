public with sharing class ProductValues {
    // @AuraEnabled
        // public static List<Product2> getProducts(){
        //     return [Select Name,ProductClass,Division__c, ProductCode,Description,Family from Product2 ];
        // }
        
        @AuraEnabled
        public static List<Product2> getProducts(){
            String userDivision = [SELECT Division FROM User WHERE Id = :UserInfo.getUserId()].Division;                
              // Query products that match the logged-in user's division
              return [SELECT Name,ProductClass,ProductCode,Description, Division__c  FROM Product2 WHERE Division__c = :userDivision];   
            }
        @AuraEnabled
        public static void saveRecord(String ProductName , String ProductCode, String ProductDivision, String ProductDescription) {
           
            try {
                Product2 newPro = new Product2();
                newPro.Name = ProductName;
                newPro.ProductCode =ProductCode;
                newPro.Division__c = ProductDivision;
                newPro.Description =ProductDescription;
                insert newPro;
            } catch (exception ex) {
                throw ex;
            }
        }
    
}
