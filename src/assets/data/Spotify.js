    const clientID = import.meta.env.VITE_CLIENT_ID;
// PKCE
    // Generate a random string for the code verifier
    const generateRandomString = (length) => {
        // Define the characters that can be used in the random string
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        // Generate secure random bytes using the Web Crypto API
        const values = crypto.getRandomValues(new Uint8Array(length));
        // Convert random bytes into characters from 'possible' and build the string
        return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    }

    // Compute SHA-256 hash of a string (async because it returns a Promise)
        // This creates a secure hash of the code verifier, which becomes the code challenge
    const sha256 = async (plain) => {
        // Convert the plain string into a format the Web Crypto API can process
        const encoder = new TextEncoder();
        const data = encoder.encode(plain);
        // Use the Web Crypto API to compute the SHA-256 hash
        return window.crypto.subtle.digest('SHA-256', data);
    }

    // Encode a buffer (hash) to base64 URL format
        // This makes the hashed code verifier URL-safe for inclusion in the authorization URL
    const base64encode = (input) => {
        // Convert the buffer to a string and encode it to base64
        return btoa(String.fromCharCode(...new Uint8Array(input)))
            // Remove padding ('=') and replace characters that aren't URL-safe ('+' and '/')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

// USER AUTHORIZATION

    // Generate the authorization URL and redirect the user to Spotify's login page
    export const generateAuthUrl = async () => {
        // Generate a random code verifier (a secret string) with a length of 64 characters
        const codeVerifier = generateRandomString(64);
        // Save the code verifier in localStorage so it can be used later when requesting a token
        window.localStorage.setItem('code_verifier', codeVerifier);

        // Hash the code verifier and encode it to create the code challenge
        const hashed = await sha256(codeVerifier);
        const codeChallenge = base64encode(hashed);

        // Define constants needed for Spotify API authentication
        const clientId = clientID; // Unique ID for this app
        const redirectUri = 'http://127.0.0.1:5173/callback'; // Where Spotify redirects after login
        // List of permissions (scopes) the app needs from the user
        const scopes = [
            'user-read-private',        // Access to user's private profile info
            'user-read-email',          // Access to user's email
            'playlist-modify-public',   // Ability to modify public playlists
            'playlist-modify-private'   // Ability to modify private playlists
        ];

        // Create the base authorization URL for Spotify
        const authUrl = new URL("https://accounts.spotify.com/authorize");
        // Define the query parameters to include in the URL
        const params = {
            response_type: 'code',           // We want an authorization code back
            client_id: clientId,             // Identify our app
            scope: scopes.join(' '),         // Combine scopes into a space-separated string
            code_challenge_method: 'S256',   // Specify SHA-256 as the hashing method
            code_challenge: codeChallenge,   // Send the hashed code verifier
            redirect_uri: redirectUri,       // Tell Spotify where to redirect after login
        };

        // Add the parameters to the URL as a query string
        authUrl.search = new URLSearchParams(params).toString();
        // Redirect the user to Spotify's authorization page
        return window.location.href = authUrl.toString();
    };

// REQUEST ACCESS TOKEN

    // Exchange the authorization code for an access token
    export const getToken = async (code) => {
        // Get the code verifier we stored earlier
        const codeVerifier = localStorage.getItem('code_verifier');

        // Check if the code verifier exists, or throw an error
        if (!codeVerifier) {
            throw new Error('No code verifier found in localStorage');
        }

        // Define constants for Spotify API authentication
        const clientId = clientID; // Unique ID for this app
        const redirectUri = 'http://127.0.0.1:5173/callback'; // Must match the redirect URI used earlier

        // Define the URL where we'll request the token
        const url = "https://accounts.spotify.com/api/token";
        // Create the request payload to send to Spotify
        const payload = {
            method: 'POST', // Use POST method to send data securely
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Format for sending form data
            },
            body: new URLSearchParams({
                client_id: clientId,             // Identify our app
                grant_type: 'authorization_code', // Type of request (using an auth code)
                code,                            // The authorization code from Spotify
                redirect_uri: redirectUri,       // Where Spotify redirected earlier
                code_verifier: codeVerifier,     // Prove we made the original request
            }),
        };

        try {
            // Send the request to Spotify's token endpoint
            const response = await fetch(url, payload);
            const data = await response.json(); // Parse the response as JSON

            // Check if the request failed and throw an error if it did
            if (!response.ok) {
                throw new Error(
                    `Token request failed: ${data.error_description || response.statusText}`
                );
            }

            // If we got an access token, save it and clean up
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token); // Store the access token
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token); // Store the refresh token
                }
                localStorage.removeItem('code_verifier'); // Remove the code verifier (no longer needed)
                return data.access_token; // Return the access token for use
            }
            throw new Error('No access token in response'); // Error if no token was returned
        } catch (error) {
            console.error('Error fetching token:', error); // Log any errors
            throw error; // Re-throw the error to handle it elsewhere
        }
    }

    // Refresh the access token using the refresh token
    export const refreshToken = async () => {
        // Get the refresh token from storage
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
            throw new Error('No refresh token available'); // Error if no refresh token exists
        }

        // Define the URL for token refreshing
        const url = 'https://accounts.spotify.com/api/token';
        // Create the request payload
        const payload = {
            method: 'POST', // Use POST method
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' // Form data format
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',     // Type of request (refreshing a token)
                refresh_token: refreshToken,     // The refresh token we stored
                client_id: clientID, // Identify our app
            }),
        };

        try {
            // Send the request to refresh the token
            const response = await fetch(url, payload);
            const data = await response.json(); // Parse the response

            // Check if the request failed
            if (!response.ok) {
                throw new Error(
                    `Token refresh failed: ${data.error_description || response.statusText}`
                );
            }
            // If we got a new access token, save it
            if (data.access_token) {
                localStorage.setItem('access_token', data.access_token); // Store new access token
                if (data.refresh_token) {
                    localStorage.setItem('refresh_token', data.refresh_token); // Update refresh token if provided
                }
                return data.access_token; // Return the new access token
            }
            throw new Error('No access token in response'); // Error if no token was returned
        } catch (error) {
            console.error('Error refreshing token:', error); // Log any errors
            throw error; // Re-throw the error
        }
    };

    // Utility function to make API calls to Spotify endpoints
    export const apiCall = async (url, method = 'GET', body = null) => {
        // Get the current access token
        let accessToken = localStorage.getItem('access_token');
        // Set up the request options
        const options = {
            method, // HTTP method (default is GET)
            headers: {
                Authorization: `Bearer ${accessToken}`, // Include the access token for authentication
                'Content-Type': 'application/json',     // Format for sending JSON data
            },
        };
        if (body) {
            options.body = JSON.stringify(body); // Add body data if provided (e.g., for POST requests)
        }

        // Make the API call
        let response = await fetch(url, options);
        // If the token expired (401 status), refresh it and try again
        if (response.status === 401) {
            accessToken = await refreshToken(); // Get a new access token
            options.headers.Authorization = `Bearer ${accessToken}`; // Update the header
            response = await fetch(url, options); // Retry the request
        }

        // Check if the request failed
        if (!response.ok) {
            const errorData = await response.json(); // Parse error details
            throw new Error(`API call failed: ${errorData.error.message || response.statusText}`);
        }
        return response.json(); // Return the successful response data as JSON
    };