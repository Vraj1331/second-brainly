FROM node:20-alpine

# Install bash & curl (needed for Bun install)
RUN apk add --no-cache bash curl

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:$PATH"

WORKDIR /app

# Copy package.json and lockfile
COPY package.json bun.lockb* ./

# Install deps with Bun
RUN bun install

# Copy source code
COPY . .

# Expose backend port
EXPOSE 3000

# Run backend in dev mode
CMD ["bun", "run", "start"]
