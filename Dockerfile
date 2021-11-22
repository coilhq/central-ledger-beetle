FROM node:14.15.0-alpine AS builder
WORKDIR /opt/central-ledger

RUN apk add --no-cache -t build-dependencies git make gcc g++ python libtool autoconf automake \
    && cd $(npm root -g)/npm \
    && npm config set unsafe-perm true \
    && npm install -g node-gyp

COPY package.json package-lock.json* /opt/central-ledger/

RUN npm install

COPY src /opt/central-ledger/src
COPY config /opt/central-ledger/config
COPY migrations /opt/central-ledger/migrations
COPY seeds /opt/central-ledger/seeds
COPY test /opt/central-ledger/test

FROM node:14.15.0-alpine
WORKDIR /opt/central-ledger

# Create empty log file & link stdout to the application log file
RUN mkdir ./logs && touch ./logs/combined.log
RUN ln -sf /dev/stdout ./logs/combined.log

# Create a non-root user: ml-user
RUN adduser -D ml-user
USER ml-user

COPY --chown=ml-user --from=builder /opt/central-ledger .
RUN npm prune --production

EXPOSE 3001
CMD ["npm", "run", "start"]
