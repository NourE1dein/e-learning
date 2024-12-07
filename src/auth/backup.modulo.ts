/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';

@Module({
  providers: [BackupService], // Register the BackupService as a provider
})
export class BackupModule {}
