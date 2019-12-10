#!/usr/bin/env bash

DOCKER_IMAGE_CLIENT=uumpa/hasadna-openpension:client
DOCKER_IMAGE_SERVER=uumpa/hasadna-openpension:server

if [ "${1}" == "deploy" ]; then
    docker tag hasadna/open-pension-server ${DOCKER_IMAGE_SERVER}-latest &&\
    docker tag hasadna/open-pension-server ${DOCKER_IMAGE_SERVER}-${TRAVIS_COMMIT} &&\
    docker tag hasadna/open-pension-client ${DOCKER_IMAGE_CLIENT}-latest &&\
    docker tag hasadna/open-pension-client ${DOCKER_IMAGE_CLIENT}-${TRAVIS_COMMIT} &&\
    docker push ${DOCKER_IMAGE_CLIENT}-latest &&\
    docker push ${DOCKER_IMAGE_CLIENT}-${TRAVIS_COMMIT} &&\
    docker push ${DOCKER_IMAGE_SERVER}-latest &&\
    docker push ${DOCKER_IMAGE_SERVER}-${TRAVIS_COMMIT} &&\
    travis_ci_operator.sh github-yaml-update \
        hasadna-k8s master values.auto-updated.yaml '{"openpension":{"client": {"image":"'${DOCKER_IMAGE_CLIENT}-${TRAVIS_COMMIT}'"},"server":{"image": "'${DOCKER_IMAGE_SERVER}-${TRAVIS_COMMIT}'"}}}' \
        "automatic update of openpension" hasadna/hasadna-k8s &&\
    echo &&\
    echo Great Success &&\
    echo &&\
    echo ${DOCKER_IMAGE}:latest &&\
    echo ${DOCKER_IMAGE}:${TRAVIS_COMMIT} &&\
    exit 0

else
    exit 1

fi
