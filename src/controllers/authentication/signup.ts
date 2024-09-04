import { checkEmailExists, insertUser } from "./indexedDb";
import { User, UserType } from "../../models/user";
import { getAllUsers } from "./currentUser";
import { homePage } from "../../controllers/HomeController";
import { renderLogin } from "./login";
import { renderNewDivElement } from "../../views/HeaderView";

export async function handleClickSignUp(event: any): Promise<void> {
    try {
        event.preventDefault()
        const form = event.target;
        const firstName = form.fname.value as string;
        const lastName = form.lname.value as string;
        const email = form.email.value as string;
        const password = form.password.value as string;
        const userType: UserType = form.userType.value as UserType;
        const address = form.address.value as string;
        const phoneNumber = form.phoneNumber.value as string;

        if (email == null || password == null || firstName == null || lastName == null
            || email === "" || password === "" || firstName === "" || lastName === ""
        ) {
            const loginError = document.querySelector('#loginError') as HTMLFormElement;
            loginError.innerHTML = 'Please Fill All The Fields.';
            return
        }
        console.log(email, firstName, lastName, password);
        const user = new User(userType, email, password, firstName, lastName, phoneNumber, address);
        const users: User[] = getAllUsers();
        users.push(user);
        localStorage.setItem('CurrentUser', JSON.stringify(user));
        localStorage.setItem('AllUsers', JSON.stringify(users));
        event.target.reset();

        //checking if the mail already exists
        const allUsersMail = await checkEmailExists(email);
        if (allUsersMail) {
            const loginError = document.querySelector('#loginError') as HTMLFormElement;
            loginError.innerHTML = 'The email already exists.';
            return
        }

        //adding the user to the database
        insertUser(email, password, user.id)
            .then(() => console.log("User added successfully"))
            .catch((error) => console.error(error));

        moveToToyFoodPage();



    } catch (error) {
        console.error(error);
    }
}

export function moveToToyFoodPage(): void {
    const loginForm = document.querySelector('.login-wrapper') as HTMLFormElement;
    const register = document.querySelector('.signup-wrapper') as HTMLDivElement;
    if (loginForm) loginForm.remove();
    if (register) register.remove();

    homePage();
}

export function handleClickHomeButton() {
    //remove all elements in the body to render the login page and append app div
    const content = document.querySelector('#content') as HTMLDivElement;
    if (content) {
        document.body.removeChild(content);
        document.body.removeChild(document.querySelector('#header') as HTMLDivElement);
        document.body.removeChild(document.querySelector('#footer') as HTMLDivElement);
    };
    const app = document.querySelector<HTMLDivElement>('#app')! as HTMLDivElement;
    if (app) renderLogin(app);
    else {
        renderNewDivElement('app');
        const app = document.querySelector<HTMLDivElement>('#app')! as HTMLDivElement;
        if (app) renderLogin(app);

    }

}