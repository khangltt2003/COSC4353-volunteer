## Frontend Setup

**Step 1: Navigate to the Frontend**  
Open another terminal in Visual Studio Code. If you're currently in the backend, navigate to the frontend by running:

```bash
cd frontend
```
**Step 2: Create Environment File**  
Create a `.env` file inside the frontend folder. This file may include any necessary environment variables for the frontend.

**Step 3: Start the Frontend Server**
Ensure all necessary packages are installed by running:
```bash
npm install
```
Run the frontend development server:
```bash
npm run dev/start
```

Open your browser and go to [http://localhost:5173](http://localhost:5173).

### Troubleshooting  
If you encounter import errors, ensure all necessary packages are installed. Copy the import line causing issues and search for installation instructions online.

## Available Features
- **Login/Register**: User authentication system for volunteers and admins.
- **Profile Management**: Users can manage their profiles.
- **Homepage**: The main landing page for the application.
- **History**: Users can view their past volunteering events.
- **Event Creation**: Admins can create volunteer events.
- **Matching**: Admins match volunteers with events based on their availability and preferences.
- **Notifications**: Users receive notifications for new event assignments, updates, and reminders.
