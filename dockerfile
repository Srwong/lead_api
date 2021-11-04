FROM node:16.13.0

WORKDIR /usr/lead_api

COPY ./ /usr/lead_api

RUN npm install 

CMD ["npm", "start"]