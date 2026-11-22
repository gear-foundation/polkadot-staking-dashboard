FROM ghcr.io/gear-foundation/vara-staking-dashboard:vara-staking-dashboard-2026.06.01_17.17_main_2ba7374@sha256:64bea13e92721bca4ff83c48c096cb2083a0dbafaaf00ae797eb6c3a3e205782 AS build

FROM ghcr.io/nginx/nginx-unprivileged:1.31.9-alpine-slim@sha256:75e85a09b0f25bd46d49a9fd85589ffa70b0459c8ed5ee0dc6596fd642e1f829

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/share/nginx/html /usr/share/nginx/html

EXPOSE 8080
