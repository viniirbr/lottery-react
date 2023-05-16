FROM node:18-alpine
WORKDIR /app
COPY ./package*.json ./
COPY . .
RUN npm install
EXPOSE 5172
CMD ["npm", "run", "dev"]