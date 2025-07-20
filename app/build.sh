#!/bin/bash

# Cloudflare Pages Build Script
echo "Starting Cloudflare Pages build..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build Next.js application
echo "Building Next.js application..."
npm run build

echo "Build completed successfully!"