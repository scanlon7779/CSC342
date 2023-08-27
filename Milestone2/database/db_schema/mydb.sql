SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`bets`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`bets` (
  `bet_id` INT NOT NULL AUTO_INCREMENT,
  `game_id` INT NOT NULL,
  `user1_id` INT NOT NULL,
  `user2_id` INT NULL,
  `team_pick_id` INT NOT NULL,
  `status_id` INT NOT NULL,
  `wager_amount` INT NOT NULL,
  PRIMARY KEY (`bet_id`),
  CONSTRAINT `fk_game_id` FOREIGN KEY (`game_id`) REFERENCES `games` (`game_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user1_id` FOREIGN KEY (`user1_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user2_id` FOREIGN KEY (`user2_id`) REFERENCES `users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_status_id` FOREIGN KEY (`status_id`) REFERENCES `statuses` (`status_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_pick_id` FOREIGN KEY (`team_pick_id`) REFERENCES `teams` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELETE FROM `bets`;
INSERT INTO `bets` (`bet_id`, `game_id`, `user1_id`, `user2_id`, `team_pick_id`, `status_id`, `wager_amount`) VALUES
  (2, 1, 2, null, 1, 1, 15),
  (3, 1, 1, null, 1, 1, 20),
  (4, 1, 1, 2, 1, 1, 10);

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_first_name` VARCHAR(100) NULL,
  `user_last_name` VARCHAR(100) NULL,
  `user_username` VARCHAR(150) NOT NULL,
  `user_image` VARCHAR(150) NULL,
  `user_credits` INT  NOT NULL DEFAULT 100,
  `user_salt` VARCHAR(100) NOT NULL,
  `user_password` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;

DELETE FROM `users`;
INSERT INTO `users` (`user_id`, `user_username`, `user_salt`, `user_password`) VALUES
  (1, 'user', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4'),
  (2, 'user2', '801e87294783281ae49fc8287a0fd86779b27d7972d3e84f0fa0d826d7cb67dfefc', 'e289219c34f9a32ebc82393f09719b7f34872de95463242b5ffe8bb4b11a5fe7d454f9f5d082c8207c5d69b220ba06624b4bb15ffa05cc7d7d53c43f9e96da6a');


-- -----------------------------------------------------
-- Table `mydb`.`games`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`games` (
  `game_id` INT NOT NULL AUTO_INCREMENT,
  `team1_id` INT NULL,
  `team2_id` INT NULL,
  `sport_id` INT NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`game_id`),
  CONSTRAINT `fk_team1_id` FOREIGN KEY (`team1_id`) REFERENCES `teams` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_team2_id` FOREIGN KEY (`team2_id`) REFERENCES `teams` (`team_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_sport_id` FOREIGN KEY (`sport_id`) REFERENCES `sports` (`sport_id`) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB;

DELETE FROM `games`;
INSERT INTO `games` (`game_id`, `team1_id`, `team2_id`, `sport_id`, `date`) VALUES
  (1, 1, 2, 1, '2023-05-14 16:45:18'),
  (2, 3, 4, 1, '2023-05-15 20:45:18'),
  (3, 1, 3, 1, '2023-06-14 16:45:18'),
  (4, 2, 3, 1, '2023-07-14 16:45:18');

-- -----------------------------------------------------
-- Table `mydb`.`sports`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`sports` (
  `sport_id` INT NOT NULL AUTO_INCREMENT,
  `sport_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`sport_id`))
ENGINE = InnoDB;

DELETE FROM `sports`;
INSERT INTO `sports` (`sport_id`, `sport_name`) VALUES
  (1, 'basketball'),
  (2, 'soccer'),
  (3, 'football');

-- -----------------------------------------------------
-- Table `mydb`.`teams`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`teams` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `team` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`team_id`))
ENGINE = InnoDB;

DELETE FROM `teams`;
INSERT INTO `teams` (`team_id`, `team`) VALUES
  (1, 'Lions'),
  (2, 'Tigers'),
  (3, 'Reds'),
  (4, 'Blues');

-- -----------------------------------------------------
-- Table `mydb`.`statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`statuses` (
  `status_id` INT NOT NULL AUTO_INCREMENT,
  `status` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`status_id`))
ENGINE = InnoDB;

DELETE FROM `statuses`;
INSERT INTO `statuses` (`status_id`, `status`) VALUES
  (1, 'pending'),
  (2, 'won'),
  (3, 'lost');


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;