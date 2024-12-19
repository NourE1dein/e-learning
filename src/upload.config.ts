import { existsSync, mkdirSync } from 'fs';

export function ensureUploadDirectory() {
  const uploadDir = './uploads';
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
    console.log(`Uploads directory created at ${uploadDir}`);
  }
}
