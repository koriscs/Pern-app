CREATE TABLE IF NOT EXISTS "customers" (
  "id" SERIAL PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "username" varchar,
  "password" varchar,
  "email" varchar UNIQUE,
  "is_admin" boolean
);

CREATE TABLE IF NOT EXISTS "address" (
  "id" SERIAL PRIMARY KEY,
  "customer_id" int,
  "zipcode" int,
  "country" varchar,
  "city" varchar,
  "street_name" varchar,
  "stree_number" varchar,
  "mobile_number" int
);

CREATE TABLE IF NOT EXISTS "products" (
  "id" SERIAL PRIMARY KEY,
  "item_name" varchar UNIQUE,
  "description" text,
  "image_url" varchar,
  "price" float
);

CREATE TABLE IF NOT EXISTS "Order" (
  "customer_id" int,
  "id" SERIAL PRIMARY KEY,
  "date_of_purchase" date,
  "total_price" int
);

CREATE TABLE IF NOT EXISTS "order_products" (
  "order_id" int,
  "product_id" int,
  "quantity" int,
  "total_price" int
);

CREATE TABLE IF NOT EXISTS "Cart" (
  "customer_id" int,
  "id" SERIAL PRIMARY KEY,
  "date_of_purchase" date,
  "total_price" int
);

CREATE TABLE IF NOT EXISTS "cart_products" (
  "cart_id" int,
  "product_id" int,
  "quantity" int,
  "total_price" int
);

ALTER TABLE "address" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "Order" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "Order" ADD FOREIGN KEY ("id") REFERENCES "order_products" ("order_id");

ALTER TABLE "order_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "Cart" ADD FOREIGN KEY ("customer_id") REFERENCES "customers" ("id");

ALTER TABLE "Cart" ADD FOREIGN KEY ("id") REFERENCES "cart_products" ("cart_id");

ALTER TABLE "cart_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");