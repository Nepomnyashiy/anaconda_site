# Архитектура проекта

Ниже представлена базовая схема взаимодействия компонентов.

```mermaid
graph TD
  Client --> Nginx
  Nginx --> Web
  Nginx --> API
  API --> Postgres
  API --> Redis
  API --> AIGateway
  pgAdmin --> Postgres
```
