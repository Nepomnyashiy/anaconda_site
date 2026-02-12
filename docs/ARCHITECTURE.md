# Architecture

```mermaid
graph TD
  Client --> Nginx
  Nginx --> Web
  Nginx --> API
  API --> Postgres
  API --> Redis
  API --> AIGateway
  AIGateway --> OpenRouter
```
