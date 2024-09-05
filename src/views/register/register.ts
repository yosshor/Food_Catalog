import '../login/login.scss'
import './register.scss'
import { handleClickSignOut, handleClickSignUp } from "../../controllers/authentication/signup";



export function renderRegisterForm(div: HTMLDivElement): undefined {
    try {
        if (!div) throw new Error("No div element provided");
        const registerDiv = `
                        <div class='signup-wrapper'>
                            <div class="header">
                                <h1>TOY Food SignUp Page</h1>
                                <h5 id="loginError"></h5>
                            </div>
                            <div class="register">
                                <form id="registerForm" >
                                    <h2>Sign Up</h2>
                                    <p>Please fill in this form to create an account.</p>

                                    <div class="row-register">
                                        <label>User Type:</label>
                                        <select name="userType" id="userType">
                                            <option value="Admin">Admin</option>
                                            <option value="Customer">Customer</option>
                                        </select>
                                    </div>
                                    <div class="row-register">
                                        <label>Address :</label>
                                        <input name="address" type="text" id="address" placeholder="Your Address" required>
                                    </div>
                                    <div class="row-register">
                                        <label>Phone Number:</label>
                                        <input name="phoneNumber" type="text" id="phoneNumber" placeholder="Your Phone Number" required>
                                    </div>


                                    <div class="row-register">
                                        <label>First Name :</label>
                                        <input name="fname" type="text" id="fname" placeholder="First Name" required>
                                    </div>

                                    <div class="row-register">
                                        <label>Last Name :</label>
                                        <input name="lname" type="text" id="lname" placeholder="Last Name" required> 
                                    </div>

                                    <div class="row-register">
                                        <label>Email :</label>
                                        <input name="email" type="text" id="email" placeholder="Email" required>
                                    </div>

                                    <div class="row-register">
                                        <label>Password :</label>
                                        <input name="password" type="password" id="password" placeholder="Password" required>
                                    </div>
                                    <div class="row-register">
                                        <button type="submit" class="buttons buttons__register" id="register-btn">Register</button>
                                        <button class="buttons buttons__login" id="home-btn">Home</button>
                                    </div>
                                </form>
                            </div>
                         </div>`
        div.innerHTML = registerDiv;
        const registerForm = document.getElementById('home-btn') as HTMLButtonElement;
        if(registerForm) {
            registerForm.addEventListener('click', handleClickSignOut)
        }
        div.addEventListener('submit', handleClickSignUp)
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

