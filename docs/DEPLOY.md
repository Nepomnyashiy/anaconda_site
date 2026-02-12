# DEPLOY: деплой приложения через Ansible

## CI/CD деплой

Деплой выполняется workflow `.github/workflows/blank.yml` при push в `main`.

Ключевые этапы:
- установка Ansible;
- pre-step проверки наличия файлов;
- запуск playbook.

Команда запуска в CI:

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/site.yml
```

## Где лежит playbook

Основной playbook находится по пути:

- `ansible/playbooks/site.yml`

## Локальный запуск

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/site.yml
```

Перед запуском убедитесь, что заполнены обязательные переменные в inventory:
- `project_name`
- `domain`
- `deploy_dir`
- `nginx_http_port`
- `compose_file_name`
- `env_file_name`
