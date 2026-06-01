FROM node:22-bookworm-slim AS builder

WORKDIR /app

RUN apt-get update \
 && apt-get install -y --no-install-recommends git ca-certificates \
 && rm -rf /var/lib/apt/lists/*

RUN corepack enable

COPY .yarnrc.yml package.json yarn.lock ./
COPY .yarn/ ./.yarn/

RUN yarn install --immutable

COPY . .
RUN yarn build

# --------------------------------------------------
FROM nginx:1.27-alpine AS runtime

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
