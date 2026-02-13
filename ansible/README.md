# Anaconda Site Deployment

This directory contains the Ansible playbooks to deploy the Anaconda Site to the production server.

## Prerequisites

- Ansible installed on the control machine
- SSH access to the target server with root privileges
- The `id_ed25519` private key in the `keys/` directory

## Deployment Steps

1. Ensure your SSH key is available and permissions are set correctly:
   ```bash
   chmod 600 keys/id_ed25519
   ```

2. Run the Ansible playbook:
   ```bash
   ansible-playbook -i inventory/hosts.ini site.yml
   ```

## CI/CD (GitHub Actions)

Automatic deployment runs on every push to the `main` branch via GitHub Actions.

### Required repository secrets

Add the following secret in the repository settings:

- `ANSIBLE_SSH_KEY`: the private SSH key used to connect to the server (contents of `id_ed25519`).

The workflow writes this key to `ansible/keys/id_ed25519` and runs:

```bash
ansible-playbook -i ansible/inventory/hosts.ini ansible/site.yml
```

## What the Playbook Does

1. Prepares the server (installs packages, configures firewall)
2. Sets up Node.js and PM2
3. Deploys the application files
4. Builds the application
5. Starts the application using PM2 on port 9998
6. Verifies the application is running

## Application Access

After successful deployment, the application will be accessible at:
http://31.59.106.120:9998

The application runs under PM2, which ensures it restarts automatically after system reboots.

## Useful PM2 Commands

To check application status:
```bash
pm2 status
```

To view logs:
```bash
pm2 logs
```

To stop/start the application:
```bash
pm2 stop anaconda-site
pm2 start anaconda-site
