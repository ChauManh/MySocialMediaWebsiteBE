# Stage 1: Build app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Copy only necessary files
FROM node:18-alpine

WORKDIR /app
COPY --from=build /app /app
RUN npm install --production

EXPOSE 5000
# Lệnh để chạy ứng dụng
CMD ["npm", "start"]