import conf from "../conf/config";
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client);
    }

    createAccount({ email, password, name }) {
        return this.account.create(ID.unique(), email, password, name)
            .then(userAccount => {
                if (userAccount) {
                    return this.login({ email, password });
                } else {
                    return userAccount;
                }
            });
    }

    login({ email, password }) {
        return this.account.createEmailSession(email, password);
    }

    getCurrentUser() {
        return this.account.get()
            .catch(error => {
                console.log(error);
                return null;
            });
    }

    logout() {
        return this.account.deleteSessions()
            .catch(error => {
                console.log(error);
            });
    }
}

const authService = new AuthService();
export default authService;
