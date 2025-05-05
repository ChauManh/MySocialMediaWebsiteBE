# Stage 1: Build app + cài dependencies
FROM node:18-alpine AS build

WORKDIR /app

# Chỉ copy file cần thiết để cache tốt hơn
COPY package*.json ./

# Cài full dependency để build (nếu có)
RUN npm install

# Copy toàn bộ source code
COPY . .

# Nếu có bước build (TypeScript chẳng hạn), thực hiện tại đây
# RUN npm run build


# Stage 2: Tạo image nhẹ chỉ chạy production
FROM node:18-alpine

WORKDIR /app

# Copy source code và node_modules từ image build
COPY --from=build /app /app

# Xoá devDependencies nếu muốn tối ưu size
RUN npm prune --production

# Mở port backend (ví dụ: 5000)
EXPOSE 5000

# Chạy app
CMD ["npm", "start"]
