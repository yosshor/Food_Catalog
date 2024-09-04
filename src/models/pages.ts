export class Pages {
    name: string;
    theme: string = "dark" || "light";
    constructor(name: string, theme?: string) {
        this.name = name;
        this.theme = theme || "dark";
    }
};

const homePage = new Pages("Home", "light");
const menuPage = new Pages("Menu");
const itemPage = new Pages("Item");
const cartPage = new Pages("Shopping Card");
const orderPage = new Pages("Order");
const profilePage = new Pages("Profile");
const consolePage = new Pages("Console");
const notFoundPage = new Pages("Not Found");
const singUpPage = new Pages("Sign Up");
const singInPage = new Pages("Sign In");

export { homePage, menuPage, itemPage, cartPage, orderPage, profilePage, consolePage, notFoundPage, singUpPage, singInPage };