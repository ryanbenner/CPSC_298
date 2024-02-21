// Define a type for email strings that must match a specific format.
type Email = string & { readonly brand: unique symbol };

function createEmail(value: string): Email {
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(value)) {
        throw new Error('Invalid email format');
    }
    return value as Email;
}

// Define a type for secure strings that enforce certain security requirements.
type SecureString = string & { readonly brand: unique symbol };

function createSecureString(value: string): SecureString {
    if (value.length < 8 || !/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
        throw new Error('SecureString must be at least 8 characters long and include both letters and numbers.');
    }
    return value as SecureString;
}

interface User {
    username: Email;
    password: string; // This is intended to store a hashed password.
}

interface LoginCredentials {
    username: Email;
    password: SecureString;
}

interface HashedPassword {
    algorithm: string;
    value: string;
}

// Simulating a hashing function for demonstration.
function hashPassword(password: SecureString): HashedPassword {
    // In real applications, use a secure hashing library.
    return {
        algorithm: 'SHA-256',
        value: 'hashed-' + password // Placeholder for actual hash.
    };
}

function login(credentials: LoginCredentials): boolean {
    // Example: Fetch the user's hashed password from a database based on the username.
    const user: User = {
        username: credentials.username,
        password: 'hashed-password-stored-in-db',
    };

    const hashedPassword: HashedPassword = hashPassword(credentials.password);

    // Simulate checking the hashed password against the stored hash.
    // In real applications, use a secure function to compare hashed passwords.
    return hashedPassword.value === user.password;
}

// Example usage
try {
    const email = createEmail('user@example.com');
    const password = createSecureString('Password123');
    const credentials: LoginCredentials = {
        username: email,
        password: password,
    };
    const isAuthenticated = login(credentials);
    console.log(`Authentication successful: ${isAuthenticated}`);
} catch (error) {
    console.error(error);
}
