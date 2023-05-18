API Documentation link (postman)

| Version |                            Link                            |
| ------- | :--------------------------------------------------------: |
| v1      | https://documenter.getpostman.com/view/26058588/2s93K1pKet |
| V2      |                       coming soon...                       |

## Table of Contents

- Introduction
- Technologies
- Features
- Future Enhancements

## Introduction

As an experienced developer, I have been working on several JavaScript projects. However, I have recently been focusing on Node.js (backend) and learning its core concepts, such as event loop and other internal workings. This project is currently in progress, and I have intentionally taken a break from it to focus on learning more about Node.js concepts and internal workings.

In this project, I have been adding new concepts and technologies to it, with a primary focus on the learning process. For instance, I have incorporated a session cookie for authentication and authorization and added JWT. However, I faced some issues while using JWT and session-based authentication, such as JWT's inability to be invalidated in an out-of-the-box manner and session-cookie consuming storage space, and adding more requests to prevent user identity. To address these issues, I used Redis for caching and to keep a blacklist of tokens that need to be invalidated for JWT.

Additionally, I have integrated Mongoose and Mongoose validation into the project, and I have utilized Express-validation to validate the user inputs and Mongoose validation to validate inputs originating from my program before storing them in the database. I believe that using both packages in the same project is the right approach. Moving forward, I intend to incorporate MySQL, rate-limiting, streaming, and Docker to enhance the app's functionality and ease of deployment while mitigating collisions between different configurations for different databases.

Additionally, I want to incorporate the ability to use sockets to develop a chat app. I am continuously exploring new features to add to my project and use it for learning and enhancing my skills. While I don't have a definite idea about the final project, I envision it to be an all-in-one structure.

## Technologies

- Node.js
- Express.js & Express-validation
- Mongoose and Mongoose validation
- Redis
- Session-cookie & JWT

## Features

- (Session-cookie & JWT) for authentication and authorization
- Redis for caching and token invalidation
- Mongoose and Express-validation for input validation

## Future Enhancements

Additional features to be determined as the project progresses.

- MySQL for database storage
- Docker for ease of deployment
- Sockets for real-time communication
- Streams for streaming data
- Ability to upload files
- Integrate stripe

## Conclusion

This project is a work in progress, and I am continuously learning new concepts and technologies to enhance its functionality. I am excited about the potential of this project and look forward to exploring new features and capabilities in the future.
