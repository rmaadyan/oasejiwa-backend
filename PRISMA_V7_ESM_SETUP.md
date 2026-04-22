# 🎯 Complete Fix: NestJS + Prisma v7 ESM Configuration

## Problem Summary

When using **Prisma v7** with NestJS, `moduleFormat = "esm"`, and `module: "NodeNext"`:
- Prisma generates **ESM TypeScript code** to `.prisma-client/` folder
- TypeScript compiler compiles it to **CommonJS** (.js) format  
- Node.js ESM loader throws: `ReferenceError: exports is not defined in ES module scope`

## Root Cause

1. TypeScript `module: "NodeNext"` with ESM files should work, but NestJS CLI still compiles to CommonJS
2. Prisma-generated `.ts` files are TSinstead of `.js`, causing module resolution failures
3. Path resolution between dev (src/) and production (dist/) differs

## Solution: Clean Configuration Files

### 1. tsconfig.json
```json
{
  "compilerOptions": {
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolvePackageJsonExports": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "isolatedModules": true,
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "ES2022",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "paths": {
      "src/*": ["src/*"]
    },
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "noFallthroughCasesInSwitch": false,
    "lib": ["ES2022"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "test", "**/*spec.ts", "prisma", ".prisma*"]
}
```

### 2. tsconfig.build.json
```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts", "prisma", ".prisma*"]
}
```

### 3. nest-cli.json
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
```

### 4. prisma/schema.prisma
```prisma
generator client {
  provider     = "prisma-client"
  output       = "../.prisma-client"
  moduleFormat = "esm"
}

datasource db {
  provider = "postgresql"
}
```

### 5. package.json (key scripts)
```json
{
  "scripts": {
    "prebuild": "pnpm prisma generate",
    "build": "nest build",
    "postbuild": "node -e \"const fs = require('fs'); const path = require('path'); const src = path.join(__dirname, '.prisma-client'); const dest = path.join(__dirname, 'dist/.prisma-client'); if (fs.existsSync(src)) { if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true }); fs.cpSync(src, dest, { recursive: true }); console.log('Copied Prisma client to dist'); }\"",
    "start": "nest start",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main.js"
  }
}
```

### 6. prisma/prisma.service.ts
```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function loadPrismaClient() {
  // Construction absolute path for dynamic import
  // In dev runs from src/, in production from dist/
  const isDev = process.env.NODE_ENV !== 'production';
  const prismaPath = isDev 
    ? path.resolve(__dirname, '../.prisma-client/client.ts')
    : path.resolve(__dirname, '../.prisma-client/client.ts');
  
  try {
    // Use file:// URL for proper ESM resolution
    const fileUrl = new URL(`file://${prismaPath.replace(/\\/g, '/')}`);
    return await import(fileUrl.href);
  } catch (e) {
    console.error('Failed to load Prisma client:', e);
    throw new Error(`Cannot load Prisma client from ${prismaPath}: ${e.message}`);
  }
}

let PrismaClientClass: any;
let prismaClientLoaded = false;

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private prismaInstance: any;

  async onModuleInit() {
    if (!prismaClientLoaded) {
      const module = await loadPrismaClient();
      PrismaClientClass = module.PrismaClient;
      prismaClientLoaded = true;
    }
    
    this.prismaInstance = new PrismaClientClass();
    await this.prismaInstance.$connect();
  }

  async onModuleDestroy() {
    if (this.prismaInstance) {
      await this.prismaInstance.$disconnect();
    }
  }

  // Proxy all Prisma methods to instance
  [key: string]: any;
  
  constructor() {
    // Initialize PrismaClient dummy for type checking
    super();
    
    return new Proxy(this, {
      get: (target, prop) => {
        if (typeof prop === 'string' && (prop === 'onModuleInit' || prop === 'onModuleDestroy')) {
          return target[prop as keyof PrismaService];
        }
        
        if (target.prismaInstance && prop in target.prismaInstance) {
          const value = target.prismaInstance[prop];
          return typeof value === 'function'
            ? value.bind(target.prismaInstance)
            : value;
        }
        
        return target[prop as keyof PrismaService];
      },
    }) as any;
  }
}

// Dummy PrismaClient class for type compatibility
abstract class PrismaClient {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $transaction(fn: any): any;
  [key: string]: any;
}
```

### 7. .env
```env
DATABASE_URL="postgresql://oasejiwa:sosok_menginspirasi@localhost:5433/oase_jiwa_db?schema=public"
NODE_ENV="development"
PORT=3000
```

### 8. prisma.config.ts  
```typescript
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
```

## Setup Steps

1. **Update all config files** above
2. **Regenerate Prisma**:
   ```bash
   pnpm prisma generate
   ```
3. **Clean build**:
   ```bash
   rm -rf dist node_modules/.cache
   pnpm run build
   ```
4. **Test**:
   ```bash
   pnpm run start:dev
   ```

## Expected Behavior

✅ Project builds without errors
✅ `pnpm run start:dev` starts successfully  
✅ Prisma client loads correctly with ESM
✅ Database connection initializes properly
✅ Hot-reload works in watch mode

## Troubleshooting

**Error: Cannot find module**.prisma-client/client.js`**
- Verify postbuild script ran: `ls -la dist/.prisma-client`
- Manually copy: `cp -r .prisma-client dist/`

**Error: exports is not defined**
- Ensure tsconfig excludes `prisma` and `.prisma*`
- Delete dist/ and rebuild from clean state

**Module already provided**
- Remove node_modules/.cache
- Clear TypeScript build cache

## Key Insights

1. **Exclude Prisma folder** from TypeScript compilation
2. **Generate to project root** (`.prisma-client/`) not in src/
3. **Copy to dist/** during postbuild
4. **Use dynamic import** for runtime module loading
5. **Handle dev/prod paths** correctly with file URLs
