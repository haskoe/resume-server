# docker run -d --expose 80 -e VIRTUAL_HOST=resume.haskoe.dk --name resume-server ${USER}/resume-server -port 80
# http://resume.haskoe.dk/haskoe
FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY ./package*.json ./
ADD lib ./lib

RUN npm ci --only=production
RUN npm install -g esbuild
RUN esbuild lib/index.js --outfile=index.js --bundle --platform=node

FROM node:lts-alpine As production

RUN apk add dumb-init

WORKDIR /usr/src/app

COPY --chown=node:node --from=build /usr/src/app/index.js ./ 

ENV WEB_SERVER_PORT 80

EXPOSE 80

USER node
CMD ["dumb-init", "node", "./index.js"]