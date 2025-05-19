# Build Server
FROM node:23-alpine AS base

RUN mkdir -p /out && chown node:node /out

WORKDIR /out

USER node

FROM base AS builder

COPY --chown=node:node . .

RUN npm install && npm run build:server

# Run Server
FROM base

COPY --from=builder --chown=node:node ./out/out .

# env variable for port
ENV PORT=4324
ENV HOST=0.0.0.0

# Expose port from env variable
EXPOSE ${PORT}

CMD [ "node", "./preview-server.js" ]

