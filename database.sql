 
 DROP TABLE "attendees" CASCADE;
 DROP TABLE "attendees_events" CASCADE;
 DROP TABLE "communities" CASCADE;
 DROP TABLE "events" CASCADE;
 DROP TABLE "files" CASCADE;
 DROP TABLE "users" CASCADE;
 
 -- IMPORTANT! Some of the table rows have changed to include defaults or to have the correct data type.
 -- you should drop all your tables before running the below queries.
 
CREATE TABLE "events" (
  "id" SERIAL PRIMARY KEY,
  "event_name" varchar,
  "event_type" VARCHAR,
  "expected_attendees" varchar,
  "start_time" timestamp,
  "end_time" timestamp,
  "location" varchar,
  "description" varchar,
  "contact_name" varchar,
  "contact_email" varchar,
  "contact_phone" varchar,
  "created_at" timestamp default now(),
  "community_id" int,
  "author_user_id" int,
  "follow_up_complete" boolean,
  "follow_up_comments" varchar,
  "archived" boolean default false
);


CREATE TABLE "files" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar,
  "description" varchar,
  "upload_date" timestamp default now(),
  "author_user_id" int,
  "community_id" int,
  "event_id" int,
  "is_global" boolean default false,
  "url" varchar,
  "key" varchar
 
);

CREATE TABLE "attendees_events" (
  "id" SERIAL PRIMARY KEY,
  "event_id" int,
  "attendee_id" int
);

CREATE TABLE "communities" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar,
  "description" varchar,
  "created_at" timestamp default now(),
  "archived" boolean default false
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "username" varchar UNIQUE not null,
  "password" varchar UNIQUE not null,
  "email" varchar UNIQUE,
  "created_at" timestamp default now(),
  "is_super_admin" boolean,
  "is_community_admin" boolean,
  "community_id" INT REFERENCES "communities",
  "archived" boolean default false,
  "phone_number" VARCHAR,
  "files_id" INT,
  "approved" BOOLEAN default false
);

CREATE TABLE "attendees" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "dob" date,
  "sex" varchar,
  "race" varchar,
  "household_income" int,
  "email" varchar,
  "phone" varchar,
  "archived" boolean default false
);


ALTER TABLE "files" ADD FOREIGN KEY ("author_user_id") REFERENCES "users" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("community_id") REFERENCES "communities" ("id");

ALTER TABLE "files" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "attendees_events" ADD FOREIGN KEY ("event_id") REFERENCES "events" ("id");

ALTER TABLE "attendees_events" ADD FOREIGN KEY ("attendee_id") REFERENCES "attendees" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("community_id") REFERENCES "communities" ("id");

ALTER TABLE "events" ADD FOREIGN KEY ("author_user_id") REFERENCES "users" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("files_id") REFERENCES "files" ("id");

-- Mock data for attendees
INSERT INTO "attendees" ("first_name", "last_name", "dob", "sex", "race", "email", "household_income", "phone") VALUES
('Kathy', 'Steward', '2-21-64', 'Female', 'White', 'kathy@comcast.net', 55000, '348-242-2573'),
('Stacey', 'Smith', '4-3-88', 'Female', 'White', 'kathy@comcast.net', 55000, '348-242-2573'),
('Arin', 'Kewlard', null, 'Male', 'White', 'kathy@comcast.net', 55000, '348-242-2573'),
('Craig', '', '6-24-45', 'Male', 'White', 'kathy@comcast.net', 55000, '348-242-2573'),
('John', 'Jognson', '5-5-75', 'Male', 'White', 'kathy@comcast.net', 75000, '348-242-2573'),
('Jose', 'Conseco', '3-12-65', 'Male', 'White', 'kathy@comcast.net', 55000, '348-242-2573'),
('Kim', 'Wiggins', '7-8-71', 'Female', 'White', 'kathy@comcast.net', 95000, '348-242-2573'),
('Sara', 'Cheng', null, 'Female', 'Asian', 'kathy@comcast.net', 50000, '348-242-2573'),
('Mike', 'Gregson', '7-30-64', 'Male', 'White', 'kathy@comcast.net', 45000, '348-242-2573'),
('Michael', 'Steward', '2-21-89', 'Male', 'White', 'kathy@comcast.net', 100000, '348-242-2573'),
('Pam', 'Beesly', null, 'Female', 'White', 'pam@dundermifflin.com', 37000, '348-242-2573'),
('Jim', 'Halpert', '9-1-92', 'Male', 'White', 'jim@dundermifflin.com', 37000, '348-242-2573');

-- Mock data for communities
INSERT INTO "communities" ("name", "description") values 
('St Cloud', ''),
('Duluth', ''),
('St Paul', '');

-- Mock data for events
INSERT INTO "events" ("event_name", "expected_attendees", "start_time", 
"end_time", "location", "description", "contact_name", "contact_email", "community_id", "author_user_id") VALUES
('The Death You Want', 45, '17:00 may 12 2019', '18:00 may 12 2019', 'St Cloud Church', '“Have you given any thought to how you want your end of life to go?” I gently asked my nearly-94-year-old grandma that question one afternoon as we talked about her younger brother who had died two years earlier.', 'Christy Moe-Marek', 'christy@aol.com', 1, null),

('Dancing with Life and Death', 100, '17:00 may 12 2019', '18:00 may 12 2019', 'St Cloud Church', '“Have you given any thought to how you want your end of life to go?” I gently asked my nearly-94-year-old grandma that question one afternoon as we talked about her younger brother who had died two years earlier.', 'Christy Moe-Marek', 'christy@aol.com', 1, null),

('Give the gift of "I love you"', 65, '17:00 may 16 2019', '18:00 may 16 2019', 'St Cloud Church', '“Have you given any thought to how you want your end of life to go?” I gently asked my nearly-94-year-old grandma that question one afternoon as we talked about her younger brother who had died two years earlier.', 'Christy Moe-Marek', 'christy@aol.com', 2, null),

('The Healing Experience', 50, '17:00 may 8 2019', '18:00 may 8 2019', 'The Salty Snail', 'I remember the day my friend Bruce Kramer said something that puzzled me but in the years since his death have come to appreciate. ', 'Cathy Wurzer', '', 2, null),

('Grief and Gratitude', 25, '17:00 may 19 2019', '18:00 may 19 2019', 'Applebees', 'This is a blog post by our friend Christy Moe Marek. A certified death doula who asks the question: “Can we be grateful for our grief?” In this time of Thanksgiving, it is a question I’m trying to answer in the wake of my beloved…', 'Christy Moe-Marek', 'christy@aol.com', 2, null),

('Keeping the End in Mind', 15, '17:00 may 26 2019', '18:00 may 26 2019', 'YMCA', '((This is from our good friend Michael Bischoff of the Health Story Collaborative. Michael is living with a brain tumor. He was gracious in taking the time to join us at our recent End in Mind Shakopee event)) ', 'Michael Bischoff', 'Michael@aol.com', 3, null),

('Reminders of Impermanence', 30, '17:00 may 29 2019', '18:00 may 29 2019', 'St Cloud Church', 'Reminders of Impermanence By Christy Moe Marek “I’m in an ambulance on my way to the hospital,” my husband told me as I rubbed the sleep out of my eyes. “Wait. You’re what?” was all I could think of to say. ', 'Greg', 'greg@hotmail.com', 3, null),

('Death Cafe', 25, '17:00 may 2 2019', '18:00 may 2 2019', 'EIM Headquarters', 'We will meet up and have a discussion about death over coffee.', 'Christy', 'christy@aol.com', 3, null);


