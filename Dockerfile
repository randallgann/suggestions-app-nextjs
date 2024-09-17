FROM node:lts-alpine

# Default to production mode
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies based on the environment
RUN if [ "$NODE_ENV" = "production" ]; then \
    npm install --production --silent; \
  else \
    npm install --silent; \
  fi

COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
