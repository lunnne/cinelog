/*
  Warnings:

  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `friend` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `movieId` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `movieId` on the `user_movie_statuses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_movieId_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_movie_statuses" DROP CONSTRAINT "user_movie_statuses_movieId_fkey";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "friend" TEXT NOT NULL,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "replies" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_movie_statuses" DROP COLUMN "movieId",
ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "provider" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "public"."movies";

-- CreateTable
CREATE TABLE "Movie" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "originalTitle" TEXT,
    "overview" TEXT,
    "tagline" TEXT,
    "posterUrl" TEXT,
    "backdropUrl" TEXT,
    "releaseDate" TEXT,
    "runtime" INTEGER,
    "voteAverage" DOUBLE PRECISION,
    "genres" TEXT[],
    "productionCompanies" TEXT[],
    "productionCountries" TEXT[],
    "spokenLanguages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_userId_movieId_key" ON "reviews"("userId", "movieId");

-- CreateIndex
CREATE UNIQUE INDEX "user_movie_statuses_userId_movieId_key" ON "user_movie_statuses"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_movie_statuses" ADD CONSTRAINT "user_movie_statuses_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
