FROM node:20-alpine as BUILD

WORKDIR /app

COPY . .

RUN npm install

RUN echo NEXT_PUBLIC_API_URI=http://5.189.158.182:9000 > .env

RUN npm run build

EXPOSE 3000

CMD ["npm","start"]