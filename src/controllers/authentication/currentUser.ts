import { User, UserType } from "../../models/user";


export function getCurrentUser(email?: string): User | null {
    let currentUserData: User = JSON.parse(localStorage.getItem('CurrentUser') as string);
    if (!currentUserData || currentUserData === null) {
        const users: User[] = getAllUsers();
        const user: User | undefined = users.find(user => user.email === email);
        if (!user) return null;
        currentUserData = new User(user.type as UserType, user.email, user.password,
            user.firstName, user.lastName, user.phoneNumber,
            user.address);
        localStorage.setItem('CurrentUser', JSON.stringify(currentUserData))
        return currentUserData;
    }
    // Reinstantiate as a User
    const currentUser = new User(currentUserData.type, currentUserData.email, currentUserData.password,
        currentUserData.firstName, currentUserData.lastName, currentUserData.phoneNumber, currentUserData.address);
    return currentUser;
}


export function getAllUsers(): User[] {
    const usersString = localStorage.getItem('AllUsers');
    if (!usersString) return [];

    // Parse and rehydrate the users
    const parsedUsers = JSON.parse(usersString);

    // Reconstruct the User and Task objects
    return parsedUsers.map((userData: any) => {
        const user = new User(userData.type, userData.email, userData.password,
            userData.firstName, userData.lastName, userData.phoneNumber, userData.address);
        return user;
    });
}

