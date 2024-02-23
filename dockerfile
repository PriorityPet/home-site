FROM node:18-alpine as builder
WORKDIR /xentraly-app

COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:18-alpine as runner
WORKDIR /xentraly-app
COPY --from=builder /xentraly-app/package.json .
COPY --from=builder /xentraly-app/package-lock.json .
COPY --from=builder /xentraly-app/next.config.js ./
COPY --from=builder /xentraly-app/public ./public
COPY --from=builder /xentraly-app/.next/standalone ./
COPY --from=builder /xentraly-app/.next/static ./.next/static
EXPOSE 3000
ENTRYPOINT ["npm", "start"]