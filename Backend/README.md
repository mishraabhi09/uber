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

## Endpoint: `/users/profile`

### Description:

This endpoint is used to fetch the profile of the currently authenticated user.

### HTTP Method:

`GET`

### Headers:

- `Authorization`: `Bearer <token>` (Required)

### Response:

#### Success Response:

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "firstName": "John",
    "lastName": "Doe",
    "email": "johndoe@example.com",
    "_id": "64f1c2e5b7e3a2f1c8d9a123"
  }
  ```

#### Error Responses:

1. **Token Not Found:**

   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Token not found"
     }
     ```

2. **Invalid Token:**

   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Token is invalid"
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

- Ensure the `Authorization` header contains a valid token.
- The token must not be blacklisted.

---

## Endpoint: `/users/logout`

### Description:

This endpoint is used to log out the currently authenticated user by invalidating their token.

### HTTP Method:

`GET`

### Headers:

- `Authorization`: `Bearer <token>` (Required)

### Response:

#### Success Response:

- **Status Code:** `200 OK`
- **Body:**
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

#### Error Responses:

1. **Token Not Found:**

   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Token not found"
     }
     ```

2. **Invalid Token:**

   - **Status Code:** `401 Unauthorized`
   - **Body:**
     ```json
     {
       "message": "Token is invalid"
     }
     ```

3. **Other Errors:**
   - **Status Code:** `500 Internal Server Error`
   - **Body:**
     ```json
     {
       "message": "Internal Server Error"
     }
     ```

### Notes:

- The token is cleared from cookies and added to the blacklist to prevent reuse.
- Ensure the `Authorization` header contains a valid token.

---

## Endpoint: `/captains/register`

### Description:

This endpoint is used to register a new captain in the system.

### HTTP Method:

`POST`

### Request Body:

The request body must be in JSON format and include the following fields:

- `fullname` (object):
  - `firstName` (string, required): Must be at least 5 characters long.
  - `lastName` (string, required): Must be at least 5 characters long.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Must be at least 5 characters long.
- `vehicle` (object):
  - `color` (string, required): Must be at least 3 characters long.
  - `plate` (string, required): Must be at least 5 characters long.
  - `capacity` (integer, required): Must be at least 1.
  - `vehicleType` (string, required): Must be one of `car`, `auto`, or `bike`.

#### Example Request Body:

```json
{
  "fullname": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Response:

#### Success Response:

- **Status Code:** `201 Created`
- **Body:**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "johndoe@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "Status": "inactive"
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
           "msg": "First name must be at least 5 characters long",
           "param": "fullname.firstName",
           "location": "body"
         },
         {
           "msg": "Invalid email , ensure it is at least 5 characters long",
           "param": "email",
           "location": "body"
         }
       ]
     }
     ```

2. **Captain Already Exists:**

   - **Status Code:** `400 Bad Request`
   - **Body:**
     ```json
     {
       "message": "Captain already exists"
     }
     ```

3. **Password Hashing Error:**

   - **Status Code:** `500 Internal Server Error`
   - **Body:**
     ```json
     {
       "message": "Error hashing password"
     }
     ```

4. **Other Errors:**
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

---

## Captain Endpoints

---

### Endpoint: `/captains/login`

**Description:**  
Authenticate a captain and return a JWT token upon successful login.

**HTTP Method:**  
`POST`

**Request Body:**
```json
{
  "email": "captain@example.com",
  "password": "securepassword"
}
```

**Responses:**

- **200 OK**
  ```json
  {
    "token": "jwt_token_here",
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "captain@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "Status": "inactive"
    }
  }
  ```

- **400 Bad Request** (Validation or invalid credentials)
  ```json
  {
    "errors": [
      {
        "msg": "Invalid email",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Error message here"
  }
  ```

---

### Endpoint: `/captains/profile`

**Description:**  
Fetch the profile of the currently authenticated captain.

**HTTP Method:**  
`GET`

**Headers:**
- `Authorization`: `Bearer <token>` (Required)

**Responses:**

- **200 OK**
  ```json
  {
    "captain": {
      "_id": "captain_id_here",
      "fullname": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "captain@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      },
      "socketId": null,
      "Status": "inactive"
    }
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Unauthorized, token not found"
  }
  ```
  or
  ```json
  {
    "message": "Unthorized, token blacklisted"
  }
  ```
  or
  ```json
  {
    "message": "Unauthorized, invalid token"
  }
  ```

---

### Endpoint: `/captains/logout`

**Description:**  
Logs out the currently authenticated captain by invalidating their token.

**HTTP Method:**  
`GET`

**Headers:**
- `Authorization`: `Bearer <token>` (Required)

**Responses:**

- **200 OK**
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "message": "Token not found"
  }
  ```
  or
  ```json
  {
    "message": "Unthorized, token blacklisted"
  }
  ```
  or
  ```json
  {
    "message": "Unauthorized, invalid token"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "message": "Internal Server Error"
  }
  ```

---
