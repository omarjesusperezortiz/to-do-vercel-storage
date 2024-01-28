# Vue Vercel Postgress To-Do App

This is a simple to-do app made with Vue, Vite, Vercel and Vercel Postgress.
The idea is to show how to set up a simple to-do app with a serverless backend and a database.
We will use Vercel Postgress as a database and creating a serverless API with Vercel functions.

## Vercel Postgress

Vercel Postgress is a database service provided by Vercel. It is a Postgress database that is hosted on Vercel.
You can create a database in the Vercel dashboard and then connect to it using the credentials provided by Vercel.
You can find more information about Vercel Postgress [here](https://vercel.com/docs/edge-network/database/overview).

## Vercel Functions

Vercel functions are serverless functions that are hosted on Vercel. You can create a function in the Vercel dashboard and then connect to it using the credentials provided by Vercel.
You can find more information about Vercel functions [here](https://vercel.com/docs/serverless-functions/introduction).

# PROJECT STRUCTURE

```
/my-vue-app
│
├── /src
│   ├── /assets              # Static assets like images, styles, etc.
│   ├── /components          # Vue components
│   ├── /views               # Vue views/pages
│   ├── /router              # Vue router files
│   ├── /store               # State management (Pinia stores)
│   ├── /services            # Services for API calls
│   └── App.vue
│   └── main.js
│
├── /api                     # Serverless functions (Deploying on Vercel)
│   ├── /tasks               # API related to tasks
│   │   ├── get.js           # GET endpoint for tasks
│   │   ├── post.js          # POST endpoint to add a task
│   │   ├── put.js           # PUT endpoint to update a task
│   │   └── delete.js        # DELETE endpoint to delete a task
│   ├── /users               # API related to user authentication
│   │   ├── login.js         # User login
│   │   └── register.js      # User registration
│   └── /utils               # Utility functions for API (database connection)
│
├── /public                  # Public files
│
├── .env                     # Environment variables (i will set a .env.example, remember in vercel 
│                              you have to set the env variables in the vercel dashboard)
├── package.json             # Project metadata and dependencies
└── vite.config.js           # Vite configuration
```
