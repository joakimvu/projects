/*
  Warnings:

  - You are about to drop the column `Name` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `name` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("id", "rules") SELECT "id", "rules" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
