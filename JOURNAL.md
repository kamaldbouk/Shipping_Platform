# Shipping Application Journal

## Backend Decisions

### Authentication
Implemented JWT tokens assigned to user at login to ensure routes are accessed by the intended users. Tokens expire after 24-hours.

### Database
Using Sequelize ORM with MySQL. Users own shipments (1-to-many relationship), and each shipment tracks a waybill (1-to-1 relationship), customer info, address, and status.

### Weather Integration
Used Open-Meteo for weather because it's free, doesn't need an API key (since this is a temporary, small-scale project), and is useful for showing destination weather conditions. Just extracts the city name from the address and fetches current weather data.

### API Structure
Used controller logic. Each shipment operation (create, read, update, delete) is its own function. Auth middleware protects shipment endpoints.

### Error Handling
Basic error handling for now using try/catch blocks. Console logs are used throughout to help with debugging process.

### Environment Variables
Using dotenv to load from .env file for key safety once pushed on GitHub.

## Frontend Decisions

### Components
Created reusable components: Button (with primary/secondary variants), Input (with optional custom styling), Card (for content containers), Modal (for forms and dialogs), Navbar (with dropdown logout menu), and Loading (full-page spinner overlay).

### Pages
Each page uses React hooks (useState, useEffect) for state management. No external state management library needed for the such project. Authentication tokens and user names are stored in localStorage for simplicity and persistance.

### Search & Filter
The useEffect dependency array includes search and filterStatus that make up the functionality of the search and filter feature.

### API Integration
All API calls go through shipmentAPI wrapper functions (getShipments, createShipment, updateShipment, deleteShipment). Errors are caught and displayed to users with user-freindly messages. The application makes authenticated requests using JWT tokens.