# RUNBOOK: эксплуатация деплоя

## Пользовательский сайт проекта

Ansible создаёт отдельный Nginx vhost под проект:

- `/etc/nginx/sites-available/<project_name>.conf`
- `/etc/nginx/sites-enabled/<project_name>.conf` (symlink)

Шаблон конфигурации:
- `ansible/roles/nginx/templates/project_site.conf.j2`

### Как изменить домен

1. Обновите переменную `domain` в inventory/group_vars.
2. Запустите деплой:

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/playbooks/site.yml
```

### Как перезапустить Nginx

Стандартно перезагрузка выполняется handler-ом автоматически после изменений.
Если нужен ручной перезапуск:

```bash
sudo nginx -t && sudo systemctl reload nginx
```
