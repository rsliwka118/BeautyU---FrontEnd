export class User {

    accessToken: string
    refreshToken: string
    id: string;
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
