CREATE TABLE `saved_itineraries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shareId` varchar(32) NOT NULL,
	`title` varchar(255) NOT NULL,
	`itineraryJson` text NOT NULL,
	`preferencesJson` text NOT NULL,
	`userId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_itineraries_id` PRIMARY KEY(`id`),
	CONSTRAINT `saved_itineraries_shareId_unique` UNIQUE(`shareId`)
);
