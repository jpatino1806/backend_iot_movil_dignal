FROM node:lts-alpine3.16

RUN apk update && \
    apk add --no-cache bash

WORKDIR /var/www/html/dignal

COPY --chown=1000:1000 . /var/www/html/dignal/

RUN chown -R node:node /usr/local

RUN npm install

EXPOSE ${PORT}

CMD ["node", "index.js"]
