# Laravel7-Airlock-Vue SPA 

> A Laravel-Airlock-Vue SPA starter project template. This project inspired [cretueusebiu/laravel-vue-spa](https://github.com/cretueusebiu/laravel-vue-spa)

<p align="center">
<img src="https://raw.githubusercontent.com/serkandyck/laravel-airlock-vue-spa/master/screenshot/login.png">
</p>

## Features

- Laravel 7.0 With Airlock
- Vue + VueRouter + Vuex + VueI18n + ESlint
- Pages with dynamic import and custom layouts
- Login, register, email verification and password reset all functional on airlock
- Authentication with [Airlock](https://github.com/laravel/airlock)
- [Tailwind CSS](https://tailwindcss.com/)

## Installation

- `git clone https://github.com/serkandyck/laravel-airlock-vue-spa`
- `composer install`
- Edit `.env` and set your database connection details and set your environment SESSION_DOMAIN, AIRLOCK_STATEFUL_DOMAINS default 127.0.0.1
- `php artisan migrate`
- `npm install`

## Usage

#### Development

```bash
# build and watch
npm run watch

# serve with hot reloading
npm run hot
```

#### Production

```bash
npm run production
```

## Airlock

This project uses a Airlock SPA Authentication.

Airlock does not use tokens of any kind. Instead, Airlock uses Laravel's built-in cookie based session authentication services. This provides the benefits of CSRF protection, session authentication, as well as protects against leakage of the authentication credentials via XSS. Airlock will only attempt to authenticate using cookies when the incoming request originates from your own SPA frontend.

[More Details](https://laravel.com/docs/master/airlock#spa-authentication)