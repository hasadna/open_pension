-- CreateTable
CREATE TABLE `File` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `storageID` INTEGER NOT NULL,
    `filename` VARCHAR(191) NOT NULL,
    `path` LONGTEXT NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` ENUM('Ready', 'Succeeded', 'Failed') NOT NULL DEFAULT 'Ready',
    `error` LONGTEXT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Row` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `MANAGER_ID` INTEGER NOT NULL,
    `ALPHA_SHNATI` DOUBLE NOT NULL,
    `SHARP_RIBIT_HASRAT_SIKUN` DOUBLE,
    `STIAT_TEKEN_60_HODASHIM` DOUBLE NOT NULL,
    `STIAT_TEKEN_36_HODASHIM` DOUBLE NOT NULL,
    `TSUA_SHNATIT_MEMUZAAT_5_SHANIM` DOUBLE NOT NULL,
    `TSUA_SHNATIT_MEMUZAAT_3_SHANIM` DOUBLE NOT NULL,
    `TSUA_MITZTABERET_60_HODASHIM` DOUBLE NOT NULL,
    `TSUA_MITZTABERET_36_HODASHIM` DOUBLE NOT NULL,
    `TSUA_MEMUZAAT_60_HODASHIM` DOUBLE NOT NULL,
    `TSUA_MEMUZAAT_36_HODASHIM` DOUBLE NOT NULL,
    `TSUA_MITZT_MI_THILAT_SHANA` DOUBLE NOT NULL,
    `YITRAT_NCHASIM_LSOF_TKUFA` DOUBLE NOT NULL,
    `TSUA_NOMINALIT_BRUTO_HODSHIT` DOUBLE NOT NULL,
    `fileID` INTEGER NOT NULL,
    `managingBodyID` INTEGER NOT NULL,
    `fundNameyID` INTEGER NOT NULL,
    `stausID` INTEGER NOT NULL,
    `channelID` INTEGER NOT NULL,
    `subChannelID` INTEGER NOT NULL,
    `typeID` INTEGER NOT NULL,
    `passiveActiveID` INTEGER NOT NULL,
    `homebaseID` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ManagingBody` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FundName` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Status` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Channel` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,
    `prefix` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubChannel` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PassiveActive` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Homebase` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `label` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`fileID`) REFERENCES `File`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`managingBodyID`) REFERENCES `ManagingBody`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`fundNameyID`) REFERENCES `FundName`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`stausID`) REFERENCES `Status`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`channelID`) REFERENCES `Channel`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`subChannelID`) REFERENCES `SubChannel`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`typeID`) REFERENCES `Type`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`passiveActiveID`) REFERENCES `PassiveActive`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Row` ADD FOREIGN KEY (`homebaseID`) REFERENCES `Homebase`(`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
