#!/usr/bin/env bash

if [ "${1}" == "deploy" ]; then
    cd /home/travis/build/hasadna/open_pension || true && \
    AUTO_UPDATED="$(node ./service-json-generator)" && \
    echo &&\
    echo "AUTO_UPDATED: " &&\
    echo $AUTO_UPDATED &&\
    echo &&\
    travis_ci_operator.sh github-yaml-update \
        hasadna-k8s master values.auto-updated.yaml "$AUTO_UPDATED" \
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
