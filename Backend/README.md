# Backend API Documentation

## Endpoint: `/users/register`

### Description:

This endpoint is used to register a new user in the system.

### HTTP Method:

`POST`

### Request Body:

The request body must be in JSON format and include the following fields:

- `fullname` (object):
  - `firstName` (string, required): Must be at least 5 characters long.
  - `lastName` (string, required): Must be at least 5 characters long.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 5 characters long.

#### Example Request Body:

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Response:

#### Success Response:

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com",
      "socketId": null
    }
  }
  ```

#### Error Responses:

1. **Validation Errors:**

   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "First name must be at least 5 character long",
           "param": "fullname.firstName",
           "location": "body"
         },
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Password Hashing Error:**

   - **Status Code:** `500 Internal Server Error`
   - **Body:**
     ```json
     {
       "message": "Error hashing password"
     }
     ```

3. **Other Errors:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
     ```json
     {
       "message": "Error message here"
     }
     ```

### Notes:

- Ensure that all required fields are provided in the request body.
- The `password` field is hashed before being stored in the database.
- A JWT token is generated upon successful registration.

## Endpoint: `/users/login`

### Description:

This endpoint is used to authenticate a user and return a JWT token upon successful login.

### HTTP Method:

`POST`

### Request Body:

The request body must be in JSON format and include the following fields:

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 5 characters long.

#### Example Request Body:

```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

### Response:

#### Success Response:

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "_id": "user_id_here",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com",
      "socketId": null
    }
  }
  ```

#### Error Responses:

1. **Validation Errors:**

   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "errors": [
         {
           "msg": "Invalid Email",
           "param": "email",
           "location": "body"
         },
         {
           "msg": "password must be at least 5 character long",
           "param": "password",
           "location": "body"
         }
       ]
     }
     ```

2. **Invalid Credentials:**

   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Invalid email or password"
     }
     ```

3. **Other Errors:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
     ```json
     {
       "message": "Error message here"
     }
     ```

### Notes:

- Ensure that both `email` and `password` fields are provided in the request body.
- The `password` is compared with the hashed password stored in the database.
- A JWT token is generated upon successful authentication.
