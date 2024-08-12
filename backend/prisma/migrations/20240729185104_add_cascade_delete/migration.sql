-- DropForeignKey
ALTER TABLE `certificates` DROP FOREIGN KEY `certificates_userId_fkey`;

-- AddForeignKey
ALTER TABLE `certificates` ADD CONSTRAINT `certificates_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
