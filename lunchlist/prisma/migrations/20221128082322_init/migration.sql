/*
  Warnings:

  - The primary key for the `Employee` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `employeeId` on the `Day` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);
INSERT INTO "new_Employee" ("Name", "id", "rules") SELECT "Name", "id", "rules" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_Name_key" ON "Employee"("Name");
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Day_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Day" ("employeeId", "id", "name", "weekId") SELECT "employeeId", "id", "name", "weekId" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
