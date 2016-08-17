import os
from django.utils.translation import ugettext_lazy as _

# UNSUITABLE FOR PRODUCTION (yet)
# See https://docs.djangoproject.com/en/1.9/howto/deployment/checklist/

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

CORS_ORIGIN_REGEX_WHITELIST = (
  '^(localhost:)*',
)

# SECURITY WARNING: set this correctly before running in production
ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
  'modeltranslation',
  'api',
  'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',

  'django_extensions',
  'rest_framework',
  'corsheaders',

  'pension',
]

MIDDLEWARE_CLASSES = [
  'django.middleware.security.SecurityMiddleware',
  'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.locale.LocaleMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  'django.contrib.auth.middleware.AuthenticationMiddleware',
  'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
  'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
  'corsheaders.middleware.CorsMiddleware',
  'django.middleware.common.CommonMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
  {
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {
      'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
      ],
    },
  },
]

WSGI_APPLICATION = 'config.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.9/ref/settings/#databases

DATABASES = {
  'default': {
    # Docker Postgres Database.
    'ENGINE': 'django.db.backends.postgresql_psycopg2',
    'NAME': 'postgres',
    'USER': 'postgres',
    'HOST': 'database',
    'PORT': 5432,
  }
}


# Password validation
# https://docs.djangoproject.com/en/1.9/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
  {
    'NAME': 'django.contrib.auth.password_validation.'
    'UserAttributeSimilarityValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.'
    'MinimumLengthValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.'
    'CommonPasswordValidator',
  },
  {
    'NAME': 'django.contrib.auth.password_validation.'
    'NumericPasswordValidator',
  },
]

REST_FRAMEWORK = {
  'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.AllowAny'
  ],
  'PAGE_SIZE': 10,
}

# Internationalization
# https://docs.djangoproject.com/en/1.9/topics/i18n/
LANGUAGE_CODE = 'he'
LANGUAGES = [
  ('he', _('Hebrew')),
  ('en', _('English')),
]
TIME_ZONE = 'Asia/Jerusalem'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.9/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')
DATA_ROOT = os.path.abspath(os.path.join(BASE_DIR, "data"))

# Importing local settings if exists.
try:
  from .local_settings import *
except ImportError:
  pass
