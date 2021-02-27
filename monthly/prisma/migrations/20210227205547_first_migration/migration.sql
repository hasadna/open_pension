-- CreateTable
CREATE TABLE `ParsedFiles` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL,
    `status` ENUM('Succeeded', 'Failed') NOT NULL DEFAULT 'Succeeded',
    `error` VARCHAR(191) NOT NULL,
    `id_guf` INT NOT NULL,
    `shem_guf` VARCHAR(191) NOT NULL,
    `taarich_hafakat_hadoch` DATETIME(3) NOT NULL,
    `id_hevra` INT NOT NULL,
    `tkufat_hakama` VARCHAR(191) NOT NULL,
    `tkufat_divuach` DATETIME(3) NOT NULL,
    `tsua_mitz_mi_thilat_hashana` DECIMAL(65,30) NOT NULL,
    `tsua_hodshit` DECIMAL(65,30) NOT NULL,
    `tsua_memuzaat36_hodashim` DECIMAL(65,30) NOT NULL,
    `tsua_memuzaat60_hodashim` DECIMAL(65,30) NOT NULL,
    `tsua_mitztaberet36_hodashim` DECIMAL(65,30) NOT NULL,
    `tsua_mitztaberet60_hodashim` DECIMAL(65,30) NOT NULL,
    `tsua_shnatit_memuzaat3_shanim` DECIMAL(65,30) NOT NULL,
    `tsua_shnatit_memuzaat5_shanim` DECIMAL(65,30) NOT NULL,
    `stiat_teken36_hodashim` DECIMAL(65,30) NOT NULL,
    `stiat_teken60_hodashim` DECIMAL(65,30) NOT NULL,
    `yit_nchasim_bfoal` DECIMAL(65,30) NOT NULL,
    `shiur_d_nihul_nechasim` DECIMAL(65,30) NOT NULL,
    `shiur_d_nihul_hafkadot` DECIMAL(65,30) NOT NULL,
    `sharp_tsua_hezyonit_anaf` DECIMAL(65,30) NOT NULL,
    `sharp_ribit_hasrat_sikun` DECIMAL(65,30) NOT NULL,
    `alpha_shnati` DECIMAL(65,30) NOT NULL,
    `beta_ta100` DECIMAL(65,30) NOT NULL,
    `beta_agach_kontzerniot_tzmudot` DECIMAL(65,30) NOT NULL,
    `beta_agach_mem_lo_tzmudot` DECIMAL(65,30) NOT NULL,
    `beta_agach_memshaltiot_tzmudot` DECIMAL(65,30) NOT NULL,
    `beta_hutz_laaretz` DECIMAL(65,30) NOT NULL,
    `r_squared` DECIMAL(65,30) NOT NULL,
    `yahas_nezilut` DECIMAL(65,30) NOT NULL,
    `num_hevra` INT NOT NULL,
    `taarich_sium_peilut` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
