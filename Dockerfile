FROM node:20
WORKDIR /app
COPY package.json .
RUN npm install
EXPOSE 3000
COPY . .
#ENV NODE_OPTIONS="--max-old-space-size=4096"
ENTRYPOINT npm run dev