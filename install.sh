#!/bin/bash
echo "🔧 Starting environment installation..."

if [ ! -f .env ]; then
  echo "📄 Creating .env file..."
  cp .env.example .env
else
  echo "✅ .env file already exists, skipping..."
fi

echo "📦 Installing dependencies..."
npm install

echo "✅ Installation complete!"
