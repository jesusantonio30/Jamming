
# Jammming

Jammming is a web application that allows users to search for music tracks using the Spotify API, create custom playlists, and save them directly to their Spotify account. Built with React and styled with Tailwind CSS, Jammming offers a user-friendly and interactive experience for music enthusiasts.

## Features

-   **Login with Spotify:** Authenticate securely with your Spotify account.
-   **Search for Tracks:** Find tracks on Spotify using a search term.
-   **Create a Playlist:** Add tracks from search results to a custom playlist.
-   **Remove Tracks:** Remove tracks from your playlist with ease.
-   **Save to Spotify:** Save your playlist directly to your Spotify account.
-   **Custom Playlist Title:** Edit the playlist title before saving.

## Installation

To set up and run Jammming locally, follow these steps:

1.  **Clone the Repository:**
    
    ```bash
    git clone https://github.com/your-username/jammming.git
    cd jammming
    
    ```
    
2.  **Install Dependencies:**
    
    ```bash
    npm install
    
    ```
    
3.  **Run the Application:**
    
    ```bash
    npm start
    
    ```
    
    

### Prerequisites

-   **Node.js**: Install Node.js (version 14 or higher recommended) from [nodejs.org](https://nodejs.org/).


## Technology Stack

-   **Frontend:** React, Tailwind CSS
-   **API:** Spotify Web API
-   **Routing:** React Router
-   **Authentication:** OAuth 2.0 with PKCE

## Project Structure

Jammming uses the container-presentational React pattern for better organization:

-   **`src/`**
    
    -   **`assets/`**
        -   **`data/`**
            -   `Spotify.js`: Handles Spotify API calls and authentication.
        -   **`images/`**
            -   `jamming_background.jpg`: Background image for styling.
    -   **`components/`**
        -   **`container/`**
            -   `App.jsx`: Manages state and logic, composing the UI.
        -   **`presentation/`**
            -   `Playlist.jsx`: Renders the playlist with editing and saving options.
            -   `SearchResults.jsx`: Displays search results with add functionality.
            -   `Track.jsx`: Shows individual tracks with add/remove buttons.
            -   `SearchBar.jsx`: Renders the search input and button.
            -   `Tracklist.jsx`: Lists tracks for search results or playlist.
    -   **`index.html`**: Entry point setting the app title to "Jammming."
    -   **`main.jsx`**: Initializes React and React Router.
    -   **`index.css`**: Defines Tailwind CSS styles and custom themes.

## Contributing

We welcome contributions! To get started:

1.  Fork the repository.
2.  Create a branch (`git checkout -b feature/your-feature`).
3.  Commit your changes (`git commit -m "Your message"`).
4.  Push your branch (`git push origin feature/your-feature`).
5.  Open a pull request with a clear description.

## License

This project is licensed under the MIT License. See the [LICENSE](https://grok.com/chat/LICENSE) file for details.

----------

Enjoy using Jammming! For questions or feedback, open an issue on GitHub.
