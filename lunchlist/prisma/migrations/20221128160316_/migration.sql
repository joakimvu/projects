-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "employeeId" INTEGER,
    "weekId" TEXT,
    CONSTRAINT "Day_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Day" ("employeeId", "id", "name", "weekId") SELECT "employeeId", "id", "name", "weekId" FROM "Day";
DROP TABLE "Day";
ALTER TABLE "new_Day" RENAME TO "Day";
CREATE TABLE "new_Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week" INTEGER NOT NULL,
    "lunchId" TEXT,
    CONSTRAINT "Week_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Lunch" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Week" ("id", "lunchId", "week") SELECT "id", "lunchId", "week" FROM "Week";
DROP TABLE "Week";
ALTER TABLE "new_Week" RENAME TO "Week";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
