FROM mdkhadikul/deliverycenter-base-images:latest

ARG SERVER_ENVIRONMENT
ARG APP_DIR=/var/www/app

# Setup Working Dir
WORKDIR $APP_DIR
RUN chown www-data:www-data $APP_DIR

# Remove any existing vendor directory to ensure clean install
RUN rm -rf vendor node_modules

# Copy source code
COPY --chown=www-data:www-data ./src/ .

# Install dependencies with proper error handling
RUN composer install --no-interaction --optimize-autoloader --no-dev --prefer-dist --no-scripts || (rm -rf vendor && composer install --no-interaction --optimize-autoloader --no-dev --prefer-dist --no-scripts)
RUN npm install && npm run build

# Set proper permissions
RUN chown -R www-data:www-data storage
RUN chown -R www-data:www-data vendor
RUN chown -R www-data:www-data bootstrap

# Copy PHP configuration files
COPY ./docker/php/opcache.ini $PHP_INI_DIR/conf.d/
COPY ./docker/php/php.ini $PHP_INI_DIR/conf.d/

# Setup directories and permissions
RUN mkdir -p /var/www/app/bootstrap/cache
RUN chmod -R 775 /var/www/app/bootstrap/cache
RUN chmod -R 775 storage
RUN chmod -R 775 vendor

# Copy and setup startup script
COPY ./docker/php/init.sh /usr/bin/startx.sh
RUN chmod +x /usr/bin/startx.sh

# Setup logs directory
RUN mkdir -p storage/logs
RUN touch storage/logs/worker.log
RUN chown -R www-data:www-data storage/logs

ENTRYPOINT ["/usr/bin/startx.sh"]