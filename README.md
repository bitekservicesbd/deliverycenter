# 🚚 Delivery Center

A comprehensive delivery management system built with Laravel, React, and Docker.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Local Development](#-local-development)
- [Production Deployment](#-production-deployment)
- [File Structure](#-file-structure)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## ✨ Features

- **Multi-tenant Architecture**: Support for multiple delivery companies
- **Load Management**: Complete load tracking and dispatch system
- **Customer Management**: Customer and contact management
- **Accounting**: Invoice and payment tracking
- **Real-time Updates**: Live dispatch board and notifications
- **Mobile Responsive**: Works on all devices
- **API First**: RESTful API for integrations

## 🛠 Tech Stack

- **Backend**: Laravel 10+ (PHP 8.3)
- **Frontend**: React 18+ with TypeScript
- **Database**: MySQL 8.0
- **Cache**: Redis
- **Web Server**: Nginx
- **Containerization**: Docker & Docker Compose
- **Build Tool**: Vite
- **Authentication**: Laravel Sanctum + 2FA

## 📋 Prerequisites

- Docker & Docker Compose
- Git
- At least 4GB RAM available
- Ports 80, 3306, 6379, 8026 available

## 🚀 Quick Start

```bash
# Clone the repository
git clone <your-repo-url>
cd deliverycenter

# Copy environment file
cp .env.example .env

# Start local development
make local-up
# OR
docker-compose -f docker-compose.local.yml up -d

# Run deployment script
./deploy-local.sh
```

## 🏠 Local Development

### Option 1: Using Make Commands (Recommended)

```bash
# Start all services
make local-up

# Stop all services
make local-down

# Rebuild containers
make local-rebuild

# View logs
make local-logs

# Access containers
make local-shell
```

### Option 2: Direct Docker Compose

```bash
# Start services
docker-compose -f docker-compose.local.yml up -d

# Stop services
docker-compose -f docker-compose.local.yml down

# Rebuild and start
docker-compose -f docker-compose.local.yml up -d --build

# View logs
docker-compose -f docker-compose.local.yml logs -f
```

### Local Development Workflow

1. **Start Services**
   ```bash
   docker-compose -f docker-compose.local.yml up -d
   ```

2. **Run Deployment Script**
   ```bash
   ./deploy-local.sh
   ```

3. **Access Applications**
   - **Main App**: http://localhost
   - **Mailpit**: http://localhost:8026
   - **Database**: localhost:3306

4. **Development Commands**
   ```bash
   # Run migrations
   docker-compose -f docker-compose.local.yml exec api php artisan migrate

   # Seed database
   docker-compose -f docker-compose.local.yml exec api php artisan db:seed

   # Run tests
   docker-compose -f docker-compose.local.yml exec api php artisan test

   # Install new packages
   docker-compose -f docker-compose.local.yml exec api composer require package-name
   ```

## 🚀 Production Deployment

### Environment Setup

1. **Configure Environment Variables**
   ```bash
   cp .env.example .env.production
   # Edit .env.production with production values
   ```

2. **SSL Certificate Setup**
   ```bash
   # Generate SSL certificates
   ./make-ssl.sh
   ```

3. **Production Build**
   ```bash
   # Build production image
   docker build -f src/Dockerfile -t deliverycenter:latest .

   # Push to registry
   docker tag deliverycenter:latest your-registry/deliverycenter:latest
   docker push your-registry/deliverycenter:latest
   ```

### Production Deployment Commands

```bash
# Start production services
docker-compose up -d

# Update production
docker-compose pull
docker-compose up -d

# Monitor services
docker-compose ps
docker-compose logs -f
```

### Production Considerations

- **SSL**: Configure SSL certificates for HTTPS
- **Backup**: Set up automated database backups
- **Monitoring**: Implement health checks and monitoring
- **Scaling**: Use load balancers for high traffic
- **Security**: Regular security updates and audits

## 📁 File Structure

```
deliverycenter/
├── 📁 docker/                          # Docker configuration files
│   ├── 📁 mysql/                       # MySQL configuration
│   │   └── init.sql                    # Database initialization
│   ├── 📁 nginx/                       # Nginx configuration
│   │   ├── conf.d/                     # Nginx site configurations
│   │   │   ├── default.conf            # Default configuration
│   │   │   ├── local.conf              # Local development config
│   │   │   └── prod.conf               # Production configuration
│   │   └── nginx.conf                  # Main Nginx configuration
│   ├── 📁 php/                         # PHP-FPM configuration
│   │   ├── Dockerfile                  # PHP container definition
│   │   ├── init.sh                     # Container startup script
│   │   ├── opcache.ini                 # OPcache configuration
│   │   └── php.ini                     # PHP configuration
│   ├── 📁 redis/                       # Redis configuration
│   │   └── redis.conf                  # Redis server configuration
│   ├── 📁 web/                         # Web server configuration
│   │   └── Dockerfile                  # Web container definition
│   └── 📁 worker/                      # Background worker configuration
│       ├── Dockerfile                  # Worker container definition
│       ├── supervisord.conf            # Supervisor configuration
│       └── worker.conf                 # Worker process configuration
├── 📁 src/                             # Application source code
│   ├── 📁 app/                         # Laravel application
│   │   ├── 📁 Console/                 # Artisan commands
│   │   ├── 📁 Events/                  # Event classes
│   │   ├── 📁 Helpers/                 # Helper functions
│   │   ├── 📁 Http/                    # HTTP layer
│   │   │   ├── 📁 Controllers/         # Controller classes
│   │   │   ├── 📁 Middleware/          # Middleware classes
│   │   │   └── 📁 Requests/            # Form request classes
│   │   ├── 📁 Listeners/               # Event listeners
│   │   ├── 📁 Mail/                    # Mail classes
│   │   ├── 📁 Models/                  # Eloquent models
│   │   ├── 📁 Notifications/           # Notification classes
│   │   ├── 📁 Providers/               # Service providers
│   │   └── 📁 Services/                # Business logic services
│   ├── 📁 bootstrap/                   # Laravel bootstrap files
│   ├── 📁 config/                      # Configuration files
│   ├── 📁 database/                    # Database files
│   │   ├── 📁 factories/               # Model factories
│   │   ├── 📁 migrations/              # Database migrations
│   │   └── 📁 seeders/                 # Database seeders
│   ├── 📁 public/                      # Public assets
│   ├── 📁 resources/                   # Frontend resources
│   │   ├── 📁 css/                     # Stylesheets
│   │   ├── 📁 js/                      # JavaScript/TypeScript
│   │   │   ├── 📁 components/          # React components
│   │   │   ├── 📁 hooks/               # Custom React hooks
│   │   │   ├── 📁 layouts/             # Layout components
│   │   │   ├── 📁 lib/                 # Utility libraries
│   │   │   ├── 📁 pages/               # Page components
│   │   │   └── 📁 types/               # TypeScript type definitions
│   │   └── 📁 views/                   # Blade templates
│   ├── 📁 routes/                      # Route definitions
│   ├── 📁 storage/                     # Application storage
│   ├── 📁 tests/                       # Test files
│   ├── artisan                         # Laravel command line tool
│   ├── composer.json                   # PHP dependencies
│   ├── package.json                    # Node.js dependencies
│   └── Dockerfile                      # Production container definition
├── 📁 .data/                           # Persistent data storage
├── 📁 .env.example                     # Environment variables template
├── 📁 docker-compose.yml               # Production Docker Compose
├── 📁 docker-compose.local.yml         # Local development Docker Compose
├── 📁 deploy-local.sh                  # Local deployment script
├── 📁 make-ssl.sh.example             # SSL certificate generation script
└── 📁 README.md                        # This file
```

## ⚙️ Configuration

### Environment Variables

```bash
# Database
DB_CONNECTION=mysql
DB_HOST=database
DB_PORT=3306
DB_DATABASE=deliverycenter
DB_USERNAME=deliverycenter
DB_PASSWORD=password

# Redis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379

# Application
APP_NAME="Delivery Center"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost
```

### Docker Configuration

- **PHP**: PHP 8.3 with FPM
- **MySQL**: MySQL 8.0 with native password authentication
- **Redis**: Redis with persistence
- **Nginx**: Latest version with optimized configuration
- **Mailpit**: Local email testing

## 🔧 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   sudo lsof -i :80
   # Kill the process or change ports in docker-compose
   ```

2. **Permission Issues**
   ```bash
   # Fix storage permissions
   docker-compose -f docker-compose.local.yml exec api chown -R www-data:www-data storage
   ```

3. **Composer Install Fails**
   ```bash
   # Clear composer cache
   docker-compose -f docker-compose.local.yml exec api composer clear-cache
   # Reinstall dependencies
   docker-compose -f docker-compose.local.yml exec api composer install
   ```

4. **Database Connection Issues**
   ```bash
   # Check database status
   docker-compose -f docker-compose.local.yml ps database
   # View database logs
   docker-compose -f docker-compose.local.yml logs database
   ```

### Debug Commands

```bash
# View all container logs
docker-compose -f docker-compose.local.yml logs -f

# Access container shell
docker-compose -f docker-compose.local.yml exec api sh

# Check container status
docker-compose -f docker-compose.local.yml ps

# Restart specific service
docker-compose -f docker-compose.local.yml restart api
```

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Docker Documentation](https://docs.docker.com)
- [Nginx Configuration](https://nginx.org/en/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting section above

---

## 🧭 Governance & Branch Strategy

- **Default branch**: `main`
- **Active development**: `develop`
- **Release branches**: `release/x.y`
- **Hotfixes**: `hotfix/x.y.z`
- Use conventional commits (e.g., `feat:`, `fix:`, `docs:`) for clear history.

## 🔐 Security Policy

- Please report security vulnerabilities via email: `security@yourdomain.com`.
- Do not open public issues for security reports.
- We follow responsible disclosure and will acknowledge reports within 72 hours.

## 🧪 Versioning & Releases

- Uses Semantic Versioning: `MAJOR.MINOR.PATCH`.
- Release notes are published in the repository Releases page.
- Tag format: `vX.Y.Z`.

## 🧰 Environment Matrix

- **Local**: `docker-compose.local.yml` (includes MySQL, Redis, Mailpit)
- **Production**: `docker-compose.yml` (Nginx, API, Redis, Certbot)
- **Dockerfiles**: Local `docker/php/Dockerfile`, Production `src/Dockerfile`

## 🗄️ Backup & Restore (Production)

- Database: nightly dumps via your infrastructure scheduler (e.g., `mysqldump`).
- Storage: sync `src/storage` to durable storage (S3 or attached volume snapshots).
- Verify restores quarterly in a staging environment.

## ❤️ Health Checks & Monitoring

- Use `docker-compose ps` and `docker-compose logs -f` for runtime checks.
- Add external uptime monitoring (e.g., UptimeRobot) on `/health` endpoint if configured.
- Track error rates in logs and configure alerts for repeated failures.

## 📞 Contact

- General: `support@yourdomain.com`
- Security: `security@yourdomain.com`
- Operations: `ops@yourdomain.com`

---

**Maintained by the Delivery Center Engineering Team** 