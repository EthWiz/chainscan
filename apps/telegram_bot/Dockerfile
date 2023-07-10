# Dockerfile.bot
FROM node:18
WORKDIR /app
COPY ./package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY ./src ./src
EXPOSE 5001
CMD [ "npx", "nodemon", "./src/bot.js" ]