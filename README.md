# API Usage Guide (Thunder Client)

## Prerequisites
- Node.js and npm installed
- MongoDB running locally or update URI in `.env`
- Install dependencies: `npm install`
- Start server: `npm start` or `node server.js`

## Authentication
- Register: `POST /auth/register`
  - Body (JSON):
    ```json
    {
      "name": "John Doe",
      "uname": "johndoe",
      "email": "john@example.com",
      "password": "yourpassword",
      "role": "user"
    }
    ```
- Login: `POST /auth/login`
  - Body (JSON):
    ```json
    {
      "email": "john@example.com",
      "password": "yourpassword"
    }
    ```
  - Response: accessToken, refreshToken (save as Bearer token or in cookies)




can you check this Order Logic to ensure it pulls this default address during checkout
## Token Implementation
- After login, you receive an `accessToken` (JWT).
- For all protected endpoints, **you must pass this token as a Bearer token in the `Authorization` header**:
  - Set the `Authorization` header to `Bearer <accessToken>`.
- The backend does **not** accept tokens in cookies.

**Thunder Client Example:**
- After login, copy the `accessToken` from the response.
- For requests to protected endpoints, go to the Authorization tab, select `Bearer Token`, and paste the token.

## Order Endpoints
- Place Order: `POST /order/place`
  - Auth: Bearer token (from login)
  - Body (JSON):
    ```json
    {
      "items": [
        { "product": "<productId>", "quantity": 2, "price": 100 }
      ],
      "total": 200
    }
    ```
- Get Order Summary: `GET /order/summary/:id`
  - Auth: Bearer token
- Get My Orders: `GET /order/myorders`
  - Auth: Bearer token
- Get All Orders: `GET /order/all`
  - Auth: Bearer token (admin only)

## Example Thunder Client Steps
1. Register a user.
2. Login and copy the accessToken.
3. In Thunder Client, set Authorization to Bearer Token and paste the accessToken.
4. Use the endpoints above to place orders and view summaries.

## Notes
- Product IDs must exist in the database.
- For purchase, use `/order/place` and then `/order/summary/:id` for the summary.
- All endpoints require proper authentication.

---

For any issues, check server logs or ensure MongoDB is running.