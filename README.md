## Backend Setup

**Requirement: Make sure a virtual environment for Python is activated, and PostgreSQL is installed**

**Step 1: Navigate to the Backend**

Open the terminal in Visual Studio Code. If you're currently in the frontend, navigate to the backend by running:
```bash
cd backend
```

**Step 2: Get Database Config**

In settings.py, comment lines 100-109 and uncomment lines 110-119

**Step 3: Install all Dependencies**

Ensure all necessary packages are installed by running:
```bash
pip install -r requirements.txt
```

**Step 4: Start the Backend Server**

Run the backend development server:
```bash
python manage.py runserver
```


## Frontend Setup

**Step 1: Navigate to the Frontend**  

Open another terminal in Visual Studio Code. If you're currently in the root directory, navigate to the frontend by running:

```bash
cd frontend
```

**Step 2: Install all dependencies**

Ensure all necessary packages are installed by running:
```bash
npm install
```

**Step 3: Start the Frontend Server**

Run the frontend development by running:
```bash
npm run dev
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
