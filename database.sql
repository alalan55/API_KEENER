-- MySQL Workbench Synchronization
-- Generated: 2021-07-22 19:46
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Alan

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `keener-database` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `keener-database`.`usuarios` (
  `id_usuario` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `keener-database`.`produtos` (
  `id_produto` INT(11) NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `preco` DOUBLE NOT NULL,
  `quantidade` INT(11) NOT NULL,
  PRIMARY KEY (`id_produto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `keener-database`.`movimentacoes` (
  `id_movimentacao` INT(11) NOT NULL AUTO_INCREMENT,
  `fornecedor` VARCHAR(50) NOT NULL,
  `descricao` VARCHAR(150) NOT NULL,
  `tipo_movimentacao` INT(11) NOT NULL,
  `id_produto` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id_movimentacao`),
  INDEX `id_produto_idx` (`id_produto` ASC),
  CONSTRAINT `id_produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `keener-database`.`produtos` (`id_produto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
