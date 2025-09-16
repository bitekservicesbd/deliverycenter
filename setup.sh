#!/bin/bash

# Laravel 12 React Delivery Center Setup Script
# Compatible with Windows (Git Bash/WSL), macOS, and Linux

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Project configuration
PROJECT_NAME="deliverycenter"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE="src/.env"
ENV_EXAMPLE="src/.env.example"

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

is_windows() {
    [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" || -n "$WINDIR" ]]
}

docker_exec() {
    if is_windows; then
        MSYS_NO_PATHCONV=1 docker-compose exec "$@"
    else
        docker-compose exec "$@"
    fi
}

check_requirements() {
    print_status "Checking system requirements..."
    
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop"
        exit 1
    fi
    
    if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
        print_error "Docker Compose is not available. Please ensure Docker Desktop is running."
        exit 1
    fi

    if ! command_exists git; then
        print_error "Git is not installed. Please install Git from https://git-scm.com/"
        exit 1
    fi
    
    print_success "All required tools are installed."
}

# Function to check if Docker is running
check_docker_running() {
    print_status "Checking if Docker is running..."
    
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop and try again."
        exit 1
    fi
    
    print_success "Docker is running."
}

# Function to check project structure
check_project_structure() {
    print_status "Checking project structure..."
    
    if [ ! -d "src" ]; then
        print_error "'src' directory not found! Please make sure your Laravel 12 React project is in the 'src' directory"
        exit 1
    fi
    
    if [ ! -f "src/artisan" ]; then
        print_error "Laravel project not found in 'src' directory! Please make sure your Laravel 12 React project is in the 'src' directory"
        exit 1
    fi
    
    print_success "Project structure is correct."
}

# Function to create Docker directories
create_docker_directories() {
    print_status "Creating Docker configuration directories..."
    
    mkdir -p docker/php
    mkdir -p docker/nginx/conf.d
    mkdir -p docker/mysql
    mkdir -p docker/redis
    
    print_success "Docker directories created."
}

# Function to handle symbolic links
handle_symbolic_links() {
    print_status "Handling Laravel symbolic links..."
    
    if [ -L "src/public/storage" ]; then
        rm src/public/storage
        print_success "Removed existing storage symbolic link"
    fi
    
    print_success "Symbolic links handled."
}

# Function to create .env file
setup_environment() {
    print_status "Setting up environment configuration..."
    
    if [ ! -f "$ENV_FILE" ]; then
        if [ -f "$ENV_EXAMPLE" ]; then
            cp "$ENV_EXAMPLE" "$ENV_FILE"
            print_success "Created .env file from .env.example"
            
            print_status "Updating database configuration for Docker environment..."
            sed -i.bak 's/DB_HOST=.*/DB_HOST=mysql/' "$ENV_FILE" 2>/dev/null || sed -i 's/DB_HOST=.*/DB_HOST=mysql/' "$ENV_FILE"
            sed -i.bak 's/DB_DATABASE=.*/DB_DATABASE=deliverycenter/' "$ENV_FILE" 2>/dev/null || sed -i 's/DB_DATABASE=.*/DB_DATABASE=deliverycenter/' "$ENV_FILE"
            sed -i.bak 's/DB_USERNAME=.*/DB_USERNAME=root/' "$ENV_FILE" 2>/dev/null || sed -i 's/DB_USERNAME=.*/DB_USERNAME=root/' "$ENV_FILE"
            sed -i.bak 's/DB_PASSWORD=.*/DB_PASSWORD=password/' "$ENV_FILE" 2>/dev/null || sed -i 's/DB_PASSWORD=.*/DB_PASSWORD=password/' "$ENV_FILE"
            sed -i.bak 's/REDIS_HOST=.*/REDIS_HOST=redis/' "$ENV_FILE" 2>/dev/null || sed -i 's/REDIS_HOST=.*/REDIS_HOST=redis/' "$ENV_FILE"
            
            rm -f "$ENV_FILE.bak"
            
        else
            print_status "Creating default .env file for Laravel 12 React..."
            cat > "$ENV_FILE" << 'EOL'
APP_NAME="Delivery Center"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_TIMEZONE=UTC
APP_URL=http://localhost:8000

APP_LOCALE=en
APP_FALLBACK_LOCALE=en
APP_FAKER_LOCALE=en_US

APP_MAINTENANCE_DRIVER=file
APP_MAINTENANCE_STORE=database

BCRYPT_ROUNDS=12

LOG_CHANNEL=stack
LOG_STACK=single
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=deliverycenter
DB_USERNAME=root
DB_PASSWORD=password

SESSION_DRIVER=redis
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null

BROADCAST_CONNECTION=log
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis

CACHE_STORE=redis
CACHE_PREFIX=

REDIS_CLIENT=phpredis
REDIS_HOST=redis
REDIS_PASSWORD=null
REDIS_PORT=6379
REDIS_DB=0

MAIL_MAILER=log
MAIL_HOST=127.0.0.1
MAIL_PORT=2525
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
EOL
            print_success "Created default .env file"
        fi
    else
        print_warning ".env file already exists, skipping creation"
    fi
}

# Function to build and start containers
start_containers() {
    print_status "Building and starting Docker containers..."
    
    print_status "Cleaning Docker build cache..."
    docker builder prune -f >/dev/null 2>&1 || true
    
    docker-compose down --volumes --remove-orphans >/dev/null 2>&1 || true
    
    docker-compose up -d --build
    
    print_success "Docker containers are starting..."
}

# Function to wait for services to be ready
wait_for_services() {
    print_status "Waiting for services to be ready..."
    
    print_status "Waiting for MySQL to be ready..."
    max_attempts=30
    attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if docker_exec -T mysql mysqladmin ping -h "localhost" --silent >/dev/null 2>&1; then
            break
        fi
        attempt=$((attempt + 1))
        sleep 2
    done
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "MySQL failed to start after $max_attempts attempts"
        exit 1
    fi
    
    print_success "MySQL is ready"
    
    print_status "Waiting for Redis to be ready..."
    attempt=0
    
    while [ $attempt -lt $max_attempts ]; do
        if docker_exec -T redis redis-cli ping >/dev/null 2>&1; then
            break
        fi
        attempt=$((attempt + 1))
        sleep 2
    done
    
    if [ $attempt -eq $max_attempts ]; then
        print_error "Redis failed to start after $max_attempts attempts"
        exit 1
    fi
    
    print_success "Redis is ready"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to install PHP dependencies
install_php_dependencies() {
    print_status "Installing PHP dependencies..."
    
    if [ ! -f "src/composer.json" ]; then
        print_error "composer.json not found in src/ directory"
        exit 1
    fi
    
    print_status "Preparing vendor directory permissions..."
    docker_exec -T -u root app chown -R www:www /var/www/html/vendor >/dev/null 2>&1 || true
    docker_exec -T -u root app chmod -R 755 /var/www/html/vendor >/dev/null 2>&1 || true
    
    print_status "Running composer install..."
    docker_exec -T app composer install --no-interaction --optimize-autoloader --no-dev
    
    print_success "PHP dependencies installed"
}

# Function to generate application key
generate_app_key() {
    print_status "Generating application key..."
    
    print_status "Fixing .env file permissions..."
    docker_exec -T -u root app chown www:www /var/www/html/.env >/dev/null 2>&1 || true
    docker_exec -T -u root app chmod 664 /var/www/html/.env >/dev/null 2>&1 || true
    
    docker_exec -T app php artisan key:generate --force
    
    print_success "Application key generated"
}

# Function to clear Laravel caches
clear_laravel_caches() {
    print_status "Clearing Laravel caches..."
    
    docker_exec -T app php artisan config:clear >/dev/null 2>&1 || true
    docker_exec -T app php artisan cache:clear >/dev/null 2>&1 || true
    docker_exec -T app php artisan view:clear >/dev/null 2>&1 || true
    
    print_success "Laravel caches cleared"
}

# Function to run database migrations
run_migrations() {
    if [ "$SKIP_MIGRATE" = true ]; then
        print_warning "Skipping database migrations as requested"
        return
    fi
    
    print_status "Running database migrations..."
    
    if [ -d "src/database/migrations" ] && [ "$(ls -A src/database/migrations)" ]; then
        docker_exec -T app php artisan migrate --force
        print_success "Database migrations completed"
    else
        print_warning "No migration files found, skipping migrations"
    fi
}

# Function to seed database
seed_database() {
    print_status "Checking for database seeders..."
    
    if [ -f "src/database/seeders/DatabaseSeeder.php" ]; then
        read -p "Do you want to run database seeders? (y/N): " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            docker_exec -T app php artisan db:seed
            print_success "Database seeded"
        fi
    else
        print_warning "No database seeders found"
    fi
}

# Function to install Node.js dependencies and build assets
build_frontend() {
    if [ "$SKIP_BUILD" = true ]; then
        print_warning "Skipping frontend build as requested"
        return
    fi
    
    print_status "Installing Node.js dependencies..."
    
    if [ ! -f "src/package.json" ]; then
        print_warning "package.json not found, skipping frontend build"
        return
    fi
    
    docker_exec -T node npm install
    
    print_success "Node.js dependencies installed"
    print_status "Frontend development server will start automatically with HMR support"
}

# Function to set proper permissions
set_permissions() {
    print_status "Setting proper permissions..."
    
    if command_exists id; then
        HOST_USER_ID=$(id -u)
        HOST_GROUP_ID=$(id -g)
    else
        HOST_USER_ID=1000
        HOST_GROUP_ID=1000
    fi
    
    export USER_ID=$HOST_USER_ID
    export GROUP_ID=$HOST_GROUP_ID
    
    print_status "Fixing file ownership (this may take a moment)..."
    docker_exec -T -u root app chown -R www:www /var/www/html/vendor >/dev/null 2>&1 || true
    docker_exec -T -u root app chown -R www:www /var/www/html/storage >/dev/null 2>&1 || true
    docker_exec -T -u root app chown -R www:www /var/www/html/bootstrap/cache >/dev/null 2>&1 || true
    docker_exec -T -u root app chown www:www /var/www/html/.env >/dev/null 2>&1 || true
    
    docker_exec -T -u root app chmod -R 775 /var/www/html/storage >/dev/null 2>&1 || true
    docker_exec -T -u root app chmod -R 775 /var/www/html/bootstrap/cache >/dev/null 2>&1 || true
    docker_exec -T -u root app chmod -R 755 /var/www/html/vendor >/dev/null 2>&1 || true
    docker_exec -T -u root app chmod 664 /var/www/html/.env >/dev/null 2>&1 || true
    
    print_success "Permissions set"
}

# Function to create storage link
create_storage_link() {
    print_status "Creating storage symbolic link..."
    
    docker_exec -T app php artisan storage:link
    
    print_success "Storage symbolic link created"
}

# Function to show project URLs and information
show_project_info() {
    echo
    print_success "=== LARAVEL 12 REACT SETUP COMPLETE ==="
    echo
    print_status "Your Laravel 12 React Delivery Center application is now running!"
    echo
    echo "🌐 Application URLs:"
    echo "   🚀 Laravel App:     http://localhost:8000"
    echo "   🎨 Vite Dev Server: http://localhost:5173 (with HMR)"
    echo "   🗄️  phpMyAdmin:     http://localhost:9090"
    echo
    echo "🔑 Database Information:"
    echo "   • Host: localhost:3306"
    echo "   • Database: deliverycenter"
    echo "   • Username: root"
    echo "   • Password: password"
    echo
    echo "🛠️  Development Commands:"
    echo "   • View logs: docker-compose logs -f"
    echo "   • Stop containers: docker-compose down"
    echo "   • Restart containers: docker-compose restart"
    echo "   • Access app container: docker-compose exec app bash"
    echo "   • Run artisan commands: docker-compose exec app php artisan [command]"
    echo "   • Install new packages: docker-compose exec app composer require [package]"
    echo "   • Install npm packages: docker-compose exec node npm install [package]"
    echo
    echo "⚡ React Development:"
    echo "   • Vite dev server is running with Hot Module Replacement (HMR)"
    echo "   • Edit files in src/resources/js and see instant updates"
    echo "   • Access your React components at the main Laravel URL"
    echo
    print_status "Happy coding with Laravel 12 + React + Inertia.js! 🚀"
}

# Function to cleanup on error
cleanup_on_error() {
    print_error "Setup failed! Cleaning up..."
    docker-compose down --volumes --remove-orphans >/dev/null 2>&1 || true
    exit 1
}

# Main setup function
main() {
    echo "======================================================"
    echo "🚚 Laravel 12 React Delivery Center Setup Script"
    echo "======================================================"
    echo
    
    trap cleanup_on_error ERR
    
    check_requirements
    
    check_docker_running
    
    check_project_structure
    
    create_docker_directories
    
    handle_symbolic_links
    
    setup_environment
    
    start_containers
    
    wait_for_services
    
    install_php_dependencies
    
    generate_app_key
    
    clear_laravel_caches
    
    run_migrations
    
    seed_database
    
    build_frontend
    
    set_permissions
    
    create_storage_link
    
    show_project_info
}

# Help function
show_help() {
    echo "Laravel 12 React Delivery Center Setup Script"
    echo
    echo "Usage: $0 [OPTIONS]"
    echo
    echo "Options:"
    echo "  -h, --help     Show this help message"
    echo "  --no-build     Skip building frontend assets"
    echo "  --no-migrate   Skip running database migrations"
    echo "  --clean        Clean setup (remove existing containers and volumes)"
    echo
    echo "Examples:"
    echo "  $0                    # Full setup"
    echo "  $0 --clean            # Clean setup"
    echo "  $0 --no-build         # Setup without building frontend"
    echo "  $0 --no-migrate       # Setup without running migrations"
}

# Parse command line arguments
SKIP_BUILD=false
SKIP_MIGRATE=false
CLEAN_SETUP=false

while [[ $# -gt 0 ]]; do
    case $1 in
        -h|--help)
            show_help
            exit 0
            ;;
        --no-build)
            SKIP_BUILD=true
            shift
            ;;
        --no-migrate)
            SKIP_MIGRATE=true
            shift
            ;;
        --clean)
            CLEAN_SETUP=true
            shift
            ;;
        *)
            print_error "Unknown option: $1"
            show_help
            exit 1
            ;;
    esac
done

# Clean setup if requested
if [ "$CLEAN_SETUP" = true ]; then
    print_status "Performing clean setup..."
    docker-compose down --volumes --remove-orphans >/dev/null 2>&1 || true
    docker builder prune -f >/dev/null 2>&1 || true
    print_success "Cleanup completed"
fi

# Run main setup
main