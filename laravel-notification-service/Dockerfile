FROM php:7.4-cli

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpq-dev libzip-dev librdkafka-dev \
    && docker-php-ext-install pdo pdo_pgsql zip

# install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-interaction

# optional but recommended for rdkafka
RUN pecl install rdkafka && docker-php-ext-enable rdkafka

CMD php artisan kafka:consume-tasks