
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );



-- the databade is called " end_in_mind"
CREATE TABLE "events"
(
    "id" int PRIMARY KEY,
    "event_name" varchar,
    "expected_attendees" int,
    "event_date" date,
    "start_time" time,
    "end_time" time,
    "location" varchar,
    "description" varchar,
    "contact_name" varchar,
    "contact_email" varchar,
    "contact_phone" varchar,
    "created_at" varchar,
    "community_id" int,
    "author_user_id" int,
    "follow_up_complete" boolean,
    "follow_up_date" date,
    "follow_up_comments" varchar,
    "archived" boolean
);

CREATE TABLE "files"
(
    "id" int PRIMARY KEY,
    "title" varchar,
    "description" varchar,
    "upload_date" date,
    "author_user_id" int,
    "community_id" int,
    "event_id" int,
    "is_global" boolean,
    "url" varchar
);

CREATE TABLE "attendees_events"
(
    "id" int PRIMARY KEY,
    "event_id" int,
    "attendee_id" int
);

CREATE TABLE "communities"
(
    "id" int PRIMARY KEY,
    "name" varchar,
    "description" varchar,
    "created_at" varchar,
    "archived" boolean
);

CREATE TABLE "users"
(
    "id" int PRIMARY KEY,
    "full_name" varchar,
    "email" varchar UNIQUE,
    "created_at" varchar,
    "is_super_admin" boolean,
    "is_community_admin" boolean,
    "archived" boolean
);

CREATE TABLE "attendees"
(
    "id" int PRIMARY KEY,
    "name" varchar,
    "dob" date,
    "sex" varchar,
    "race" varchar,
    "household_income" int,
    "email" varchar,
    "archived" boolean
);

ALTER TABLE "files" ADD FOREIGN KEY ("author_user_id") REFERENCES "users" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("community_id") REFERENCES "communities" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "attendees_events" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "attendees_events" ADD FOREIGN KEY ("attendee_id") REFERENCES "attendees" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("community_id") REFERENCES "communities" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("author_user_id") REFERENCES "users" ("id");


SELECT * FROM "events";
SELECT * FROM "files";
SELECT * FROM "attendees_events";
SELECT * FROM "communities";
SELECT * FROM "users";
SELECT * FROM "attendees";