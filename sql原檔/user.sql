-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-07-04 21:04:47
-- 伺服器版本： 8.0.36
-- PHP 版本： 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `team_0628`
--

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `postcode` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `google_uid` varchar(255) DEFAULT NULL,
  `line_uid` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `line_access_token` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`id`, `name`, `username`, `password`, `email`, `avatar`, `birth_date`, `sex`, `phone`, `postcode`, `address`, `google_uid`, `line_uid`, `photo_url`, `line_access_token`, `created_at`, `updated_at`) VALUES
(1, '哈利', 'herry', '$2b$10$dI5EovzmQM6NEK8q6kZEA.igBCoKJ9lCci1viHBxv2zPU9ZV/NoKG', 'herry@test.com', '1.webp', '1980-07-13', '男', '0906102808', '330', '桃園市桃園區劉南路377號18樓', NULL, NULL, NULL, NULL, '2024-06-28 23:45:27', '2024-07-03 02:01:16'),
(2, '金妮', 'ginny', '$2b$10$3nPiG8PsNS02eU5Lh5owOORhNI0HaXyraFXEpoBNKWK0HqU68O7BW', 'ginny@test.com', '', '1981-08-11', '女', '0946840920', '882', '澎湖縣望安鄉高東路305號19樓', NULL, NULL, NULL, NULL, '2024-06-28 23:45:27', '2024-06-28 23:45:27'),
(3, '妙麗', 'mione', '$2b$10$GmA5v2yr4iqJ3/yh/HF4TOQ3tS/e7TjVfW5iJXWih0eJvmib6g7wm', 'mione@test.com', '', '1979-09-19', '女', '0912541534', '511', '彰化縣社頭鄉趙南路295號15樓', NULL, NULL, NULL, NULL, '2024-06-28 23:45:27', '2024-06-28 23:45:27'),
(4, '榮恩', 'ron', '$2b$10$aVKnQfnYnEypNEHYBFR9OOJGJ5CfLRgojghg.x8lrpUZzdru1nXD2', 'ron@test.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-06-28 23:48:37', '2024-06-28 23:48:37'),
(5, '榮恩', '0962033585', '$2b$10$ghVg7H5uoojvJwP1xAjfYur9OMYsFCh5t8XKtrr.LhQshjagsYacm', 'aaaa9613@yahoo.com.tw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-01 22:57:09', '2024-07-01 22:57:09'),
(6, '榮恩', '09620335851', '$2b$10$X0a8cmpJ77HNVL7aviR5BuGnzmDhVkb3MMkPAoqZKKBpNhxJYks0q', 'aaaa96113@yahoo.com.tw', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-01 22:57:53', '2024-07-01 22:57:53'),
(7, '榮恩', 'nimabo0121@gmail.com', '$2b$10$921lTSPHC.A9ADui05nDsOBMFqBFUZ9rk2tmp.0FRVvrJ9K/7eQoS', 'nimabo0121@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-07-01 23:32:52', '2024-07-01 23:32:52');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
