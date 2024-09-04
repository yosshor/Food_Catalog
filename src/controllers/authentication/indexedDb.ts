const dbName = "usersDB";
const storeName = "users";



// Function to open the database (same as before)
function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(storeName)) {
                const store = db.createObjectStore(storeName, { keyPath: "id", autoIncrement: true });
                store.createIndex("email", "email", { unique: true });
            }
        };

        request.onsuccess = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            resolve(db);
        };

        request.onerror = (event) => {
            reject(`Error opening database: ${(event.target as IDBOpenDBRequest).error}`);
        };
    });
}


// Function to check if both email and password are correct
export function checkEmailAndPassword(email: string, password: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);

            const index = store.index("email");
            const request = index.get(email);

            request.onsuccess = () => {
                const user = request.result;
                if (user && user.password === password) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            };

            request.onerror = (event) => {
                reject(`Error checking email and password: ${(event.target as IDBRequest).error}`);
            };
        } catch (error) {
            reject(`Error during transaction: ${error}`);
        }
    });
}


// Function to insert email and password
export function insertUser(email: string, password: string, id: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(storeName, "readwrite");
            const store = transaction.objectStore(storeName);

            const user = { email, password, id };
            const request = store.add(user);

            request.onsuccess = () => {
                resolve();
            };

            request.onerror = (event) => {
                reject(`Error inserting user: ${(event.target as IDBRequest).error}`);
            };
        } catch (error) {
            reject(`Error during transaction: ${error}`);
        }
    });
}



// Function to get all information by email
function getAllInfoByEmail(email: string): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await openDatabase();
            const transaction = db.transaction(storeName, "readonly");
            const store = transaction.objectStore(storeName);

            const index = store.index("email");
            const request = index.getAll(email);

            request.onsuccess = () => {
                resolve(request.result); // Resolves with an array of all matching records
            };

            request.onerror = (event) => {
                reject(`Error getting data by email: ${(event.target as IDBRequest).error}`);
            };
        } catch (error) {
            reject(`Error during transaction: ${error}`);
        }
    });
}


export async function checkEmailExists(emailToCheck: string) {
    try {
        // Step 1: Get all records by email
        const allEmails = await getAllInfoByEmail(emailToCheck);

        // Step 2: Check if the email exists in the result
        const emailExists = allEmails.some(record => record.email === emailToCheck);

        if (emailExists) {
            console.log(`Email ${emailToCheck} exists in the database.`);
            return true;
        } else {
            console.log(`Email ${emailToCheck} does not exist in the database.`);
            return false;
        }
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}


