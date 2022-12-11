-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL,
    "rules" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Day" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "weekId" TEXT NOT NULL,
    CONSTRAINT "Day_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Day_weekId_fkey" FOREIGN KEY ("weekId") REFERENCES "Week" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Week" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "week" INTEGER NOT NULL,
    "lunchId" TEXT NOT NULL,
    CONSTRAINT "Week_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Lunch" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lunch" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_Name_key" ON "Employee"("Name");
