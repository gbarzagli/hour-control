export class User {
    email: string = null;
    password: string = null;

    constructor(user: any = {}) {
        const {
            email, 
            password
        } = user;
        
        this.email = email;
        this.password = password;
    }
}