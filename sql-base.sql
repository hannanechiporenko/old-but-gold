-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 12 2025 г., 14:38
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `sale`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Home & Garden'),
(2, 'Fashion'),
(3, 'Electronics'),
(4, 'Vehicles'),
(5, 'Kids & Baby'),
(6, 'Pets'),
(7, 'Books, Movies & Music'),
(8, 'Hobbies & Leisure'),
(9, 'Miscellaneous');

-- --------------------------------------------------------

--
-- Структура таблицы `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category_id` int(11) NOT NULL,
  `condition_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `products`
--

INSERT INTO `products` (`id`, `user_id`, `title`, `description`, `price`, `category_id`, `condition_id`, `created_at`) VALUES
(78, 9, 'Vintage Wooden Coffee Table', 'Solid vintage coffee table made from natural oak wood. Has minor scratches from normal use but no structural damage. Perfect for living rooms, cozy corners, or boho-style interiors. Stable, durable, and easy to restore with light sanding.', 45.00, 1, 2, '2025-12-08 07:44:49'),
(79, 9, 'Samsung Galaxy S21 128GB', 'Samsung Galaxy S21 in excellent condition, always used with a case and screen protector. Battery still holds charge very well. Includes original box and USB-C cable. No cracks, no repairs. Fully unlocked.', 290.00, 3, 2, '2025-12-08 07:47:46'),
(81, 9, 'IKEA LACK White Bookshelf', 'Simple white bookshelf with four shelves. Has visible wear on the edges, but still sturdy and functional. Great for storage in an office, bedroom, or student apartment.', 15.00, 1, 3, '2025-12-08 07:51:05'),
(83, 10, 'Acoustic Guitar Yamaha F310', 'Yamaha F310 acoustic guitar with warm, deep sound. A few scratches on the body from regular use but nothing that affects tone quality. Strings recently replaced. Ideal for beginners and hobby musicians.', 95.00, 8, 2, '2025-12-08 07:57:38'),
(84, 10, 'Mountain Bike Rockrider ST 540', '21-speed mountain bike with aluminum frame, front suspension, and ergonomic seat. Recently serviced: brakes adjusted, wheels trued, chain cleaned. Ready for trails or city riding.', 180.00, 8, 2, '2025-12-08 07:58:51'),
(86, 9, 'Digital Drawing Tablet (Medium Size)', 'A reliable drawing tablet perfect for beginners and intermediate artists. The surface has a natural texture that feels similar to paper. Comes with a pressure-sensitive pen, USB cable, and two replacement nibs. Works well with Photoshop, Krita, and other drawing programs. No scratches, fully functional.', 60.00, 3, 1, '2025-12-11 08:24:27'),
(87, 9, 'Adjustable Bookshelf (Wooden, 3 Shelves)', 'Sturdy wooden bookshelf with three adjustable shelves. Ideal for storing textbooks, notebooks, or decorative items. Light natural wood color fits most interior styles. Used for less than a year, has a few small marks on the back, not visible when placed against the wall.', 35.00, 1, 2, '2025-12-11 08:24:54'),
(88, 9, 'Bluetooth Headphones', 'Comfortable over-ear headphones with clean bass and clear sound. Battery lasts up to 18 hours on one charge. Includes charging cable. Soft ear pads, adjustable headband. Perfect for studying, commuting, or watching movies. Mild cosmetic wear on the band.', 28.00, 3, 2, '2025-12-11 08:25:16'),
(89, 9, 'Yoga Mat (Non-Slip, Thick)', 'High-quality yoga mat with a soft, shock-absorbing surface. Non-slip texture provides stability during stretching, workouts, or meditation. Easy to roll and store, lightweight to carry. Clean, no damage. Ideal for home workouts or gym use.', 14.00, 8, 1, '2025-12-11 08:25:42'),
(90, 9, 'Kitchen Blender', 'Compact blender with two speed modes. Perfect for smoothies, soups, sauces, and plant-based recipes. Stainless steel blades are sharp and durable. The container is easy to wash and dishwasher-safe. Used only a few times.', 20.00, 3, 3, '2025-12-11 08:26:11'),
(91, 9, 'Children’s Puzzle Set (Age 6+)', 'Colorful puzzle set with 500 pieces. Features a bright cartoon landscape illustration. All pieces included and clean. Great for developing attention, logic, and patience. Comes in original box with a reference picture.', 6.00, 5, 1, '2025-12-11 08:26:37'),
(92, 9, 'Fitness Dumbbells (2 x 3 kg)', 'A pair of neoprene-coated 3 kg dumbbells. Comfortable to hold, do not slip, even with sweaty hands. Suitable for strength training, pilates, home workouts, or physical therapy. Small signs of use on the coating, but fully functional.', 18.00, 8, 2, '2025-12-11 08:27:00'),
(93, 9, 'Stylish Table Clock', 'Minimalistic table clock with a silent mechanism — perfect for a study desk or bedside table. Matte black frame and clear white dial. Battery-powered (battery included). No scratches, works flawlessly', 10.00, 1, 1, '2025-12-11 08:27:31'),
(94, 9, 'Craft Beading Starter Kit', 'A complete beading set for creating bracelets, necklaces, or small accessories. Includes 15 colors of beads, elastic string, metal clasps, and a small organizer box. Ideal for beginners or hobby projects. Everything is unused and neatly packed.', 10.00, 8, 1, '2025-12-11 08:27:55'),
(96, 9, 'Portable Hard Drive (1 TB)', 'A compact 1 TB hard drive suitable for storing photos, videos, and project files. Compatible with PC, Mac, and laptops. USB 3.0 connection ensures fast transfer speeds. Outer case has a few tiny scratches, but the device works perfectly.', 42.00, 3, 2, '2025-12-11 08:28:46'),
(97, 10, 'Wireless Mechanical Keyboard (RGB Backlight)', 'A compact wireless mechanical keyboard with customizable RGB backlighting. Features blue switches that provide a tactile and clicky typing experience. Battery lasts up to 40 hours on a single charge. Minor signs of use on the spacebar.', 55.00, 3, 1, '2025-12-11 08:31:28'),
(98, 10, 'Vintage Leather Backpack', 'Stylish brown leather backpack with a large main compartment and two front pockets. Ideal for school, work, or daily use. Straps slightly worn but still strong. No tears or major damage.', 12.00, 2, 3, '2025-12-11 08:32:06'),
(99, 10, 'Acrylic Painting Set (24 Colors)', 'A full set of acrylic paints including 24 tubes, two brushes, and a mixing palette. Perfect for beginners and hobby artists. Only three colors lightly used; the rest are untouched.', 12.00, 8, 2, '2025-12-11 08:33:11'),
(100, 10, 'IKEA Bedside Table “HEMNES”', 'Classic white IKEA bedside table with one drawer and an open shelf. Sturdy wooden construction. Has a few light scratches on the surface but looks clean.', 20.00, 8, 2, '2025-12-11 08:34:12'),
(101, 10, 'HP OfficeJet Home Printer', 'Compact home printer capable of printing, scanning, and copying. Works via Wi-Fi or USB. Includes nearly full black and color cartridges. Shows slight yellowing on the plastic frame.', 35.00, 3, 3, '2025-12-11 08:35:00'),
(102, 10, 'Silver Necklace with Moon Pendant', 'Delicate silver chain with a small crescent moon pendant. Tarnish-free and hypoallergenic. Worn only a few times. Comes with a small jewelry pouch.', 15.00, 2, 1, '2025-12-11 08:35:39'),
(103, 10, 'Wooden Chess Set (Hand-Carved)', 'Beautiful wooden chess set with hand-carved pieces and a folding board. A few small dents on the board corners but no missing pieces. Ideal for collectors or casual play.', 30.00, 8, 1, '2025-12-11 08:36:26'),
(105, 10, 'xcvxcv', 'cdfhfgh', 34.00, 3, 2, '2025-12-11 08:53:16');

-- --------------------------------------------------------

--
-- Структура таблицы `product_condition`
--

CREATE TABLE `product_condition` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product_condition`
--

INSERT INTO `product_condition` (`id`, `name`) VALUES
(1, 'New'),
(2, 'Good'),
(3, 'Bad');

-- --------------------------------------------------------

--
-- Структура таблицы `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`) VALUES
(56, 78, '/backend/product_images/1765179889_5347a7f8-2565-4de3-a756-cc33ff156ee7.jpg'),
(57, 78, '/backend/product_images/1765179889_723f34fd-81c0-42ea-8c27-ebc715338ce3.jpg'),
(58, 79, '/backend/product_images/1765180066_5028f461-d2e7-46ca-ae39-2570472aaa57.jpg'),
(59, 79, '/backend/product_images/1765180066_f020b4c9-f91f-42f8-9001-250ff22f86ff.jpg'),
(62, 81, '/backend/product_images/1765180265_bb7671d3-730a-41bb-ba85-f5ff4360bf28.jpg'),
(63, 81, '/backend/product_images/1765180265_7c9ef767-e822-4031-9156-a810770bd17e.jpg'),
(67, 83, '/backend/product_images/1765180658_1ea8c4fd-6bd1-42fc-afed-56765f404bb9.jpg'),
(68, 83, '/backend/product_images/1765180658_77b7c04d-d276-445c-b500-b6780fc1bcc7.jpg'),
(69, 83, '/backend/product_images/1765180658_81f004a3-bb16-46ea-81af-49007b8f1e02.jpg'),
(70, 83, '/backend/product_images/1765180658_df10a353-2de8-4870-96c3-714334970c6a.jpg'),
(71, 84, '/backend/product_images/1765180731_14bdc401-94c2-41ea-a683-8b41e6837725.jpg'),
(72, 84, '/backend/product_images/1765180731_8d40581a-cd5a-475c-bd65-9c01e7c81039.jpg'),
(73, 84, '/backend/product_images/1765180731_ae0da575-7cae-4d11-92bc-1aca2a87bb16.jpg'),
(74, 84, '/backend/product_images/1765180731_2e1d3190-21f9-4909-9d54-b15a06cbece1.jpg'),
(78, 86, '/backend/product_images/1765441467_9f91af1f-e549-4770-a725-15acc9aba5ab.jpg'),
(79, 86, '/backend/product_images/1765441467_412c5f31-fece-46d1-a752-6100635edf36.jpg'),
(80, 87, '/backend/product_images/1765441494_885c5ea8-3f6b-4273-8fed-33b844523c7a.jpg'),
(81, 87, '/backend/product_images/1765441494_62641d86-8c0a-4eb5-afde-59a5289be582.jpg'),
(82, 88, '/backend/product_images/1765441516_a16003b1-3e56-4ba0-b475-0ea202cfed83.jpg'),
(83, 88, '/backend/product_images/1765441516_a4883a22-cfaa-4629-8806-9e5789fb35ef.jpg'),
(84, 89, '/backend/product_images/1765441542_87c760f1-8d43-4d48-bd97-a5afb3e719bf.jpg'),
(85, 89, '/backend/product_images/1765441542_38dac20d-ebb4-4201-a22a-16765b10f5db.jpg'),
(86, 90, '/backend/product_images/1765441571_c548a5ef-6cab-4532-8314-fff0aac4211a.jpg'),
(87, 90, '/backend/product_images/1765441571_d78f74fb-bf88-40b1-9056-9db6fc1ed838.jpg'),
(88, 91, '/backend/product_images/1765441597_67b7d8f1-1313-4ffc-a55a-57e2e315741a.jpg'),
(89, 91, '/backend/product_images/1765441597_e674101e-5a2d-4a7e-aea1-832b2abeb09f.jpg'),
(90, 92, '/backend/product_images/1765441620_6083cca9-6473-4512-baed-9d4205aa6fac.jpg'),
(91, 92, '/backend/product_images/1765441620_723a2b7a-0291-4b78-a97a-a658e19d7b5f.jpg'),
(92, 93, '/backend/product_images/1765441651_783bf39a-7de7-445b-ba85-9432a1a89f14.jpg'),
(93, 93, '/backend/product_images/1765441651_cf3d2d24-b8f2-49cf-aaf5-8b7c20ba0c7e.jpg'),
(94, 94, '/backend/product_images/1765441675_a7df778e-fe53-4be5-8a61-b48782abb5ff.jpg'),
(95, 94, '/backend/product_images/1765441675_096cc951-7ec6-4a31-8c47-4f0bd75b050b.jpg'),
(96, 96, '/backend/product_images/1765441726_59b247ef-d03e-4dc4-b48e-e22c817742a1.jpg'),
(97, 96, '/backend/product_images/1765441726_61b90527-a859-4498-a96c-1d6f6a9265f8.jpg'),
(98, 97, '/backend/product_images/1765441888_d121a649-352b-4ec8-9ac4-61c47bcb572e.jpg'),
(99, 97, '/backend/product_images/1765441888_ad87395e-57bb-44a1-9710-714c80bbcec4.jpg'),
(100, 98, '/backend/product_images/1765441926_d64c4130-3745-46e1-9efb-c9edb20c5f5b.jpg'),
(101, 98, '/backend/product_images/1765441926_509ba14e-65a2-4919-aed8-9054561b6196.jpg'),
(102, 99, '/backend/product_images/1765441991_f2359083-7a9c-49fb-a061-751b8659e0f0.jpg'),
(103, 99, '/backend/product_images/1765441991_925c21a9-d389-4513-961c-bdfa35842fba.jpg'),
(104, 100, '/backend/product_images/1765442052_c3acedc9-dcbb-4567-860d-5c11c17ff2f9.jpg'),
(105, 100, '/backend/product_images/1765442052_b8630459-33ab-4768-bacd-6674a2a4a165.jpg'),
(106, 101, '/backend/product_images/1765442100_ebda9033-e6a1-4e74-aabc-66b4cfba8910.jpg'),
(107, 101, '/backend/product_images/1765442100_193de6f1-15da-49f0-9123-2a2fbb7574a4.jpg'),
(108, 102, '/backend/product_images/1765442139_1e161ea3-3692-44a4-8517-4f668b1cdf6d.jpg'),
(109, 102, '/backend/product_images/1765442139_28290420-5bfc-4411-8634-e4d348e686bc.jpg'),
(110, 103, '/backend/product_images/1765442186_d0b380ec-6604-4ccc-b146-bd9f7ac80362.jpg'),
(111, 103, '/backend/product_images/1765442186_f5b380a1-c306-40f5-9cf1-11caaece7f4a.jpg'),
(114, 105, '/backend/product_images/1765443196_9a15b8ca-e332-4d4d-8d95-ea4181909bbd.jpg'),
(115, 105, '/backend/product_images/1765443196_c9a5f80d-0c1b-4a99-897e-65e94f225be5.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(9, 'SofiiaYesakova', 'sonjaslonja@gmail.com', '$2y$10$g7oCkQI43g552JWsBTUfWutTisxQ.Pv6wu0QhGx2JyFSlDQJXcMuO', '2025-12-08 07:40:15'),
(10, 'DanyloBykon', 'danylobykon@gmail.com', '$2y$10$EySlRnI3Vy9jab0hN5Nq3uzPDeUf9W8PbJAgLCeNaNZXQnVzqEHIe', '2025-12-08 07:55:42'),
(11, 'Ihor', 'ihor@gmail.com', '$2y$10$jxeeD8cOI0Rz1tI.UA17ZujUISvAKBFaTCJvOeRIF8JtU5pNPky.u', '2025-12-08 11:03:39');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_condition`
--
ALTER TABLE `product_condition`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT для таблицы `product_condition`
--
ALTER TABLE `product_condition`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=120;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
