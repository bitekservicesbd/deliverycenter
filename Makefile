# Delivery Center Makefile
# Usage: make <command>

.PHONY: help local-up local-down local-rebuild local-logs local-shell local-clean local-restart local-status local-db local-migrate local-seed local-test local-composer local-npm production-up production-down production-logs production-shell production-restart production-status production-pull production-update

# Default target
help:
	@echo "🚚 Delivery Center - Available Commands:"
	@echo ""
	@echo "🏠 Local Development:"
	@echo "  local-up          - Start local development environment"
	@echo "  local-down        - Stop local development environment"
	@echo "  local-rebuild     - Rebuild and start local containers"
	@echo "  local-restart     - Restart local services"
	@echo "  local-status      - Show local container status"
	@echo "  local-logs        - View local container logs"
	@echo "  local-shell       - Access local API container shell"
	@echo "  local-db          - Access local database shell"
	@echo "  local-clean       - Clean up local containers and volumes"
	@echo ""
	@echo "🔧 Local Development Commands:"
	@echo "  local-migrate     - Run database migrations"
	@echo "  local-seed        - Seed database with sample data"
	@echo "  local-test        - Run PHP tests"
	@echo "  local-composer    - Run composer commands (usage: make local-composer CMD='require package')"
	@echo "  local-npm         - Run npm commands (usage: make local-npm CMD='install package')"
	@echo ""
	@echo "🚀 Production:"
	@echo "  production-up     - Start production environment"
	@echo "  production-down   - Stop production environment"
	@echo "  production-logs   - View production logs"
	@echo "  production-shell  - Access production API container shell"
	@echo "  production-restart- Restart production services"
	@echo "  production-status - Show production container status"
	@echo "  production-pull   - Pull latest production images"
	@echo "  production-update - Update production environment"
	@echo ""
	@echo "📦 Utility:"
	@echo "  deploy-local      - Run local deployment script"
	@echo "  ssl-generate      - Generate SSL certificates"

# Local Development Commands
local-up:
	@echo "🚀 Starting local development environment..."
	docker-compose -f docker-compose.local.yml up -d
	@echo "✅ Local environment started successfully!"
	@echo "🌐 Main App: http://localhost"
	@echo "📧 Mailpit: http://localhost:8026"
	@echo "🗄️  Database: localhost:3306"

local-down:
	@echo "🛑 Stopping local development environment..."
	docker-compose -f docker-compose.local.yml down
	@echo "✅ Local environment stopped successfully!"

local-rebuild:
	@echo "🔨 Rebuilding local containers..."
	docker-compose -f docker-compose.local.yml down
	docker-compose -f docker-compose.local.yml up -d --build
	@echo "✅ Local containers rebuilt and started successfully!"

local-restart:
	@echo "🔄 Restarting local services..."
	docker-compose -f docker-compose.local.yml restart
	@echo "✅ Local services restarted successfully!"

local-status:
	@echo "📊 Local container status:"
	docker-compose -f docker-compose.local.yml ps

local-logs:
	@echo "📋 Local container logs (press Ctrl+C to exit):"
	docker-compose -f docker-compose.local.yml logs -f

local-shell:
	@echo "🐚 Accessing local API container shell..."
	docker-compose -f docker-compose.local.yml exec api sh

local-db:
	@echo "🗄️ Accessing local database shell..."
	docker-compose -f docker-compose.local.yml exec database mysql -u root -p

local-clean:
	@echo "🧹 Cleaning up local environment..."
	docker-compose -f docker-compose.local.yml down -v
	docker system prune -f
	@echo "✅ Local environment cleaned successfully!"

# Local Development Commands
local-migrate:
	@echo "🔄 Running database migrations..."
	docker-compose -f docker-compose.local.yml exec api php artisan migrate
	@echo "✅ Migrations completed successfully!"

local-seed:
	@echo "🌱 Seeding database with sample data..."
	docker-compose -f docker-compose.local.yml exec api php artisan db:seed
	@echo "✅ Database seeded successfully!"

local-test:
	@echo "🧪 Running PHP tests..."
	docker-compose -f docker-compose.local.yml exec api php artisan test
	@echo "✅ Tests completed!"

local-composer:
	@if [ -z "$(CMD)" ]; then \
		echo "❌ Error: Please specify a composer command"; \
		echo "Usage: make local-composer CMD='require package-name'"; \
		exit 1; \
	fi
	@echo "📦 Running composer $(CMD)..."
	docker-compose -f docker-compose.local.yml exec api composer $(CMD)
	@echo "✅ Composer command completed!"

local-npm:
	@if [ -z "$(CMD)" ]; then \
		echo "❌ Error: Please specify an npm command"; \
		echo "Usage: make local-npm CMD='install package-name'"; \
		exit 1; \
	fi
	@echo "📦 Running npm $(CMD)..."
	docker-compose -f docker-compose.local.yml exec api npm $(CMD)
	@echo "✅ NPM command completed!"

# Production Commands
production-up:
	@echo "🚀 Starting production environment..."
	docker-compose up -d
	@echo "✅ Production environment started successfully!"

production-down:
	@echo "🛑 Stopping production environment..."
	docker-compose down
	@echo "✅ Production environment stopped successfully!"

production-logs:
	@echo "📋 Production container logs (press Ctrl+C to exit):"
	docker-compose logs -f

production-shell:
	@echo "🐚 Accessing production API container shell..."
	docker-compose exec api sh

production-restart:
	@echo "🔄 Restarting production services..."
	docker-compose restart
	@echo "✅ Production services restarted successfully!"

production-status:
	@echo "📊 Production container status:"
	docker-compose ps

production-pull:
	@echo "📥 Pulling latest production images..."
	docker-compose pull
	@echo "✅ Production images updated successfully!"

production-update:
	@echo "🔄 Updating production environment..."
	docker-compose pull
	docker-compose up -d
	@echo "✅ Production environment updated successfully!"

# Utility Commands
deploy-local:
	@echo "🚀 Running local deployment script..."
	@if [ -f "./deploy-local.sh" ]; then \
		chmod +x ./deploy-local.sh; \
		./deploy-local.sh; \
	else \
		echo "❌ Error: deploy-local.sh not found!"; \
		exit 1; \
	fi

ssl-generate:
	@echo "🔐 Generating SSL certificates..."
	@if [ -f "./make-ssl.sh.example" ]; then \
		cp ./make-ssl.sh.example ./make-ssl.sh; \
		chmod +x ./make-ssl.sh; \
		./make-ssl.sh; \
	else \
		echo "❌ Error: make-ssl.sh.example not found!"; \
		exit 1; \
	fi

# Development shortcuts
dev: local-up
dev-down: local-down
dev-rebuild: local-rebuild
dev-logs: local-logs
dev-shell: local-shell

# Production shortcuts
prod: production-up
prod-down: production-down
prod-logs: production-logs
prod-shell: production-shell
prod-update: production-update 