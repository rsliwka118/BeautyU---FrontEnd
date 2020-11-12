export class User {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    
    hasEmail() {
        return this.email != '';
    }

    hasFirstName() {
        return this.firstName != '';
    }

    hasLastName() {
        return this.lastName != '';
    }
}
