import { Email } from "../../models/email";
import { renderLoginPage } from "../../views/login/login";
import { renderRegisterForm } from "../../views/register/register";
import { getCurrentUser } from "./currentUser";
import { checkEmailAndPassword } from "./indexedDb";
import { moveToToyFoodPage } from './signup';


/// Render Login Page
export function renderLogin(app: HTMLDivElement): void {
    try {
        if (!app) throw new Error('No app found');

        const htmlLogin = renderLoginPage()!;
        app.innerHTML = htmlLogin;
        const loginForm = document.querySelector('#loginForm') as HTMLFormElement;
        const register = document.querySelector('#register-btn') as HTMLDivElement;
        if (loginForm) loginForm.addEventListener('submit', handleLogin);
        if (register) register.addEventListener('click', handleRegister);

    }
    catch (error) {
        console.error(error);
    }
}


/// Event Handlers for Login Page
function handleLogin(event: any): void {
    event.preventDefault();
    console.log('Login button clicked');
    const form = event.target;
    const email = form.email.value as string;
    const password = form.password.value as string;
    console.log('Email:', email, 'Password:', password);
    localStorage.setItem('CurrentUser', null!);

    const mail: Email | null | undefined = getCurrentUser(email);
    if(mail === null) return emailOrPassIncorrect();
    if (mail) console.log(mail.email, mail.id, mail.password)
    checkValidEmailPass(email, password, mail);
    event.target.reset();
}


// Function to check if both email and password are correct
function checkValidEmailPass(email: string, password: string, mail: Email) {
    checkEmailAndPassword(email, password)
        .then((isValid) => {

            if (isValid) {
                console.log("Email and password are correct.");
                localStorage.setItem('CurrentUser', JSON.stringify(mail));
                moveToToyFoodPage();

            } else {
                emailOrPassIncorrect();
            }
        })
        .catch((error) => console.error(error));
}


/// Event Handlers for incorrect email or password
function emailOrPassIncorrect(){
    const loginError = document.querySelector('#loginError') as HTMLFormElement;
    loginError.innerHTML = 'Email or password is incorrect.';
    console.log("Email or password is incorrect.");
}


/// Event Handlers for Register Page
function handleRegister(event: any): void {
    try {
        event.preventDefault();
        console.log('Register button clicked');
        const app = document.querySelector('#app') as HTMLDivElement;
        if (app) renderRegisterForm(app);
    } catch (error) {
        console.error(error);
    }
}