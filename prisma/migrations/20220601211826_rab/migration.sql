-- CreateTable
CREATE TABLE `Company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `creatorId` INTEGER NOT NULL,
    `website` VARCHAR(191) NOT NULL,
    `supportEmail` VARCHAR(191) NOT NULL,
    `supportPhone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Company_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Offer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryId` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `salary` DOUBLE NOT NULL,
    `workSchedule` VARCHAR(191) NOT NULL,
    `datePublished` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CV` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `photo` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `canDisclocate` BOOLEAN NOT NULL DEFAULT false,
    `sex` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `experience` VARCHAR(191) NOT NULL,
    `education` VARCHAR(191) NOT NULL,
    `aditional` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Apply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `offerId` INTEGER NOT NULL,
    `cvId` INTEGER NOT NULL,
    `fullname` VARCHAR(191) NOT NULL DEFAULT '',
    `experience` VARCHAR(191) NOT NULL DEFAULT '',
    `contactPhone` VARCHAR(191) NOT NULL DEFAULT '',
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
