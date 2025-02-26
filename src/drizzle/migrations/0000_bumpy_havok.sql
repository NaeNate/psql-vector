CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"vector" vector(384) NOT NULL,
	"created" timestamp DEFAULT now() NOT NULL
);
