# InkSpire API Documentation

InkSpire is a platform for inspiring writings and ideas, providing a full-featured API to manage users, articles, comments, and likes. This documentation serves as a comprehensive guide for integrating with the platform's endpoints.

## 🚀 Getting Started

### Base URL
All API calls should be made to the following base URL:
`http://localhost:4444/api`

### Authentication
Authentication is handled via a **JSON Web Token (JWT)**, which is set in an **HTTP-only cookie** named `token` upon successful login. This token must be present in subsequent requests for all private routes.

---

## 🏗️ Architecture Overview

The application utilizes a secure, decoupled architecture where the frontend and backend interact via defined API endpoints.

### FrontEnd API EndPoints Flow

This diagram illustrates the client-side approach, differentiating between public routes handled by **Axios** and private, authenticated routes managed efficiently using **RTK Query**.



### BackEnd API EndPoints Flow

This diagram details the server-side structure, showing how incoming requests are routed through `index.js` to specific routers (`auth.js`, `post.js`, `like.js`, `gemini.js`) and how the crucial **`verify JWT` middleware** protects private routes.



---

## 1. Authentication

| Endpoint | Method | Route | Description |
| :--- | :--- | :--- | :--- |
| **Register** | `POST` | `/auth/signup` | Creates a new user account. |
| **Login** | `POST` | `/auth/login` | Authenticates a user and sets the JWT cookie. |
| **Logout** | `POST` | `/auth/logout` | Clears the JWT cookie to log the user out. |

### Request/Response Details

#### POST /auth/signup
**Request Body:**
```json
{
"username": "string",
"email": "string",
"password": "string"
}
Success Response (200 OK):

JSON

{
"message": "User registered successfully",
"user": {
"id": "number",
"username": "string",
"email": "string"
}
}
POST /auth/login
Request Body:

JSON

{
"email": "string",
"password": "string"
}
Success Response (200 OK):

JSON

{
"message": "Logged in successfully",
"user": {
"id": "number",
"username": "string",
"email": "string"
}
}
2. Articles (Posts)
Endpoint	Method	Route	Authentication	Description
Get All	GET	/	Public	Retrieves all articles.
Get By User	GET	/user	Private	Retrieves articles authored by the authenticated user.
Get Single	GET	/:id	Public	Retrieves a single article by ID.
Create	POST	/	Private	Creates a new article.
Update	PUT	/:id	Private (Author Only)	Modifies an existing article.
Delete	DELETE	/:id	Private (Author Only)	Deletes an article by ID.

Export to Sheets
Request/Response Details
POST / (Create Article)
Request Body:

JSON

{
"title": "string",
"content": "string"
}
Success Response (201 Created):

JSON

{
"message": "Article created successfully",
"article": {
"id": "number",
"title": "string",
"content": "string",
"author": { "id": "number", "username": "string" },
"createdAt": "ISO 8601 timestamp"
}
}
3. Likes
Endpoint	Method	Route	Authentication	Description
Check Status	GET	/hasLiked/:postId	Private	Checks if the authenticated user has liked a post.
Toggle Like	POST	/toggle/:postId	Private	Adds or removes a like from a post.
Get Count	GET	/:postId	Public	Gets the total like count for a post.

Export to Sheets
Request/Response Details
POST /toggle/:postId
Success Response (200 OK):

JSON

{
"liked": true  // The new status after the toggle operation
}
GET /:postId
Success Response (200 OK):

JSON

{
"likes": 42
}
4. Error Responses
All endpoints adhere to standard HTTP status codes. Error responses will always contain a JSON body with a descriptive message.

Error Body Structure:

JSON

{
"message": "Description of the error"
}
Status Code	Meaning	Context / Usage
400 Bad Request	Client-side error	Invalid data sent.
401 Unauthorized	Authentication failure	JWT cookie is missing, expired, or invalid.
403 Forbidden	Authorization failure	User is authenticated but lacks the necessary permissions.
404 Not Found	Resource not found	The requested URL or resource ID does not exist.
500 Internal Server Error	Server-side crash	Unhandled exception or database connection error.
