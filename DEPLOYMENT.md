# 🚀 Deployment Guide

Quick deployment instructions for Delivery Center.

## 🏠 Local Development - Quick Start

### 1. Start Environment
```bash
# Option A: Using Make (Recommended)
make local-up

# Option B: Direct Docker Compose
docker-compose -f docker-compose.local.yml up -d
```

### 2. Run Deployment Script
```bash
./deploy-local.sh
```

### 3. Access Applications
- **Main App**: http://localhost
- **Mailpit**: http://localhost:8026
- **Database**: localhost:3306

## 🚀 Production Deployment

### 1. Environment Setup
```bash
# Copy and configure environment
cp .env.example .env.production
# Edit .env.production with production values
```

### 2. SSL Setup (Optional)
```bash
# Generate SSL certificates
make ssl-generate
```

### 3. Build & Deploy
```bash
# Build production image
docker build -f src/Dockerfile -t deliverycenter:latest .

# Start production services
make production-up
# OR
docker-compose up -d
```

### 4. Update Production
```bash
# Pull latest images and restart
make production-update
# OR
docker-compose pull && docker-compose up -d
```

## 📋 Common Commands

### Local Development
```bash
make local-up          # Start local environment
make local-down        # Stop local environment
make local-rebuild     # Rebuild containers
make local-logs        # View logs
make local-shell       # Access container shell
make local-migrate     # Run migrations
make local-seed        # Seed database
make local-test        # Run tests
```

### Production
```bash
make production-up     # Start production
make production-down   # Stop production
make production-logs   # View logs
make production-shell  # Access container shell
make production-update # Update production
```

### Package Management
```bash
# Install PHP packages
make local-composer CMD='require package-name'

# Install NPM packages
make local-npm CMD='install package-name'
```

## 🔧 Troubleshooting

### Port Conflicts
```bash
# Check what's using port 80
sudo lsof -i :80

# Kill process or change ports in docker-compose
```

### Permission Issues
```bash
# Fix storage permissions
docker-compose -f docker-compose.local.yml exec api chown -R www-data:www-data storage
```

### Database Issues
```bash
# Check database status
make local-status

# View database logs
docker-compose -f docker-compose.local.yml logs database
```

### Rebuild Everything
```bash
# Clean and rebuild
make local-clean
make local-rebuild
```

## 📁 File Locations

- **Local Config**: `docker-compose.local.yml`
- **Production Config**: `docker-compose.yml`
- **Local Dockerfile**: `docker/php/Dockerfile`
- **Production Dockerfile**: `src/Dockerfile`
- **Deployment Script**: `deploy-local.sh`
- **Environment Template**: `.env.example`

## 🚨 Important Notes

1. **Always backup** before production updates
2. **Test locally** before deploying to production
3. **Check logs** if something goes wrong
4. **Use Make commands** for consistency
5. **Keep dependencies updated** regularly

---

**Need help?** Check the main [README.md](README.md) or create an issue. 