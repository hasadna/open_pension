#!/usr/bin/env bash

# Get project root folder.
PROJECT_ROOT=$(git rev-parse --show-toplevel)

DOCKER_COMPOSE="docker-compose -f docker/docker-compose.common.yml -f docker/docker-compose.dev.yml"

# Build and run the containers.
${DOCKER_COMPOSE} up -d

# Run server entry-point.
${DOCKER_COMPOSE} exec server bash -c "/home/app/server/entrypoint.sh"

# Create dummy data.
${DOCKER_COMPOSE} exec server bash -c "python manage.py create_blog_dummy_data"
