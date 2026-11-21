FROM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS builder

WORKDIR /app

RUN corepack enable

COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn/ ./.yarn/

RUN yarn install --immutable

COPY . .
RUN yarn build

# --------------------------------------------------
FROM nginxinc/nginx-unprivileged:1.31.7-alpine-slim@sha256:a8cb0f33d51fa107c96fd2bd3a71aaf564ec131e9d2bdf8700944f0ed8b170d7 AS runtime

USER root
RUN apk upgrade --no-cache
USER 101

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 8080
