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