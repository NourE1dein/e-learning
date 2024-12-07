/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as cron from 'node-cron';
import * as child_process from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BackupService {
  constructor() {
    // Schedule backup to run every day at midnight
    cron.schedule('0 0 * * *', () => {
      this.createBackup();
    });
  }

  // backup
  private createBackup() {
    const backupDir = path.join(__dirname, '..', '..', 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir);
    }

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
    const backupFile = path.join(backupDir, `backup-${timestamp}.gz`);

    const command = `mongodump --uri=${process.env.MONGODB_URI} --archive=${backupFile} --gzip`;

    child_process.exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Backup failed: ${stderr}`);
        return;
      }
      console.log(`Backup successful: ${stdout}`);
    });
  }
}
