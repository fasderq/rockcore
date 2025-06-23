FROM node:20-alpine AS builder

ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
ENV HTTP_PORT=4000
ENV HTTP_HOST=0.0.0.0

WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build
#end build

#compose target container
FROM node:20-alpine
ENV NODE_ENV=production
ENV HTTP_PORT=4000
ENV HTTP_HOST=0.0.0.0
WORKDIR /app

#copy package.json and install production only packages
COPY --from=builder /app/yarn.lock .
COPY --from=builder /app/package.json .
COPY --from=builder /app/config ./config
RUN yarn install --frozen-lockfile --production \
    && yarn cache clean
#copy built project to target
COPY --from=builder /app/dist ./dist

CMD [ "node", "./dist/src/main.js" ]
EXPOSE 4000
