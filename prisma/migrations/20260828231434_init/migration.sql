-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT,
    "passwordHash" TEXT,
    "displayName" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'PLAYER',
    "isGuest" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "footballPower" INTEGER NOT NULL DEFAULT 3
);

-- CreateTable
CREATE TABLE "League" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tier" INTEGER NOT NULL,
    "matchesPerSeason" INTEGER NOT NULL,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "League_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Club" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "reputation" INTEGER NOT NULL,
    "primaryColor" TEXT NOT NULL,
    "leagueId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    CONSTRAINT "Club_leagueId_fkey" FOREIGN KEY ("leagueId") REFERENCES "League" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Club_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerCareer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "jerseyNumber" INTEGER NOT NULL,
    "foot" TEXT NOT NULL,
    "nationalityId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "age" INTEGER NOT NULL DEFAULT 16,
    "seasonIndex" INTEGER NOT NULL DEFAULT 0,
    "currentClubId" TEXT,
    "onLoanFromId" TEXT,
    "marketValueEUR" INTEGER NOT NULL DEFAULT 50000,
    "pace" INTEGER NOT NULL DEFAULT 40,
    "shooting" INTEGER NOT NULL DEFAULT 40,
    "passing" INTEGER NOT NULL DEFAULT 40,
    "defense" INTEGER NOT NULL DEFAULT 40,
    "physical" INTEGER NOT NULL DEFAULT 40,
    "mentality" INTEGER NOT NULL DEFAULT 40,
    "overall" INTEGER NOT NULL DEFAULT 40,
    "morale" INTEGER NOT NULL DEFAULT 70,
    "fitness" INTEGER NOT NULL DEFAULT 100,
    "reputation" INTEGER NOT NULL DEFAULT 0,
    "starterShare" REAL NOT NULL DEFAULT 0.6,
    "ntCaps" INTEGER NOT NULL DEFAULT 0,
    "ntGoals" INTEGER NOT NULL DEFAULT 0,
    "ntAssists" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlayerCareer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_currentClubId_fkey" FOREIGN KEY ("currentClubId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_onLoanFromId_fkey" FOREIGN KEY ("onLoanFromId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SeasonLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "careerId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "clubId" TEXT,
    "onLoan" BOOLEAN NOT NULL DEFAULT false,
    "overall" INTEGER NOT NULL,
    "matches" INTEGER NOT NULL DEFAULT 0,
    "goals" INTEGER NOT NULL DEFAULT 0,
    "assists" INTEGER NOT NULL DEFAULT 0,
    "avgRating" REAL NOT NULL DEFAULT 6.0,
    "leagueResult" TEXT,
    "cupResult" TEXT,
    "continentalResult" TEXT,
    "ntCallUp" BOOLEAN NOT NULL DEFAULT false,
    "ntCaps" INTEGER NOT NULL DEFAULT 0,
    "ntGoals" INTEGER NOT NULL DEFAULT 0,
    "ntAssists" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SeasonLog_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "PlayerCareer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SeasonLog_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CareerEventLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "careerId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "eventKey" TEXT NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "optionKey" TEXT NOT NULL,
    "optionLabel" TEXT NOT NULL,
    "outcomeSummary" TEXT NOT NULL,
    "statDeltaJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CareerEventLog_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "PlayerCareer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trophy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "careerId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "tier" TEXT NOT NULL,
    "clubId" TEXT,
    "isNationalTeam" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Trophy_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "PlayerCareer" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Trophy_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PendingEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "careerId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "eventKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "optionsJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PendingEvent_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "PlayerCareer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PendingClubOffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "careerId" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "kind" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "optionsJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PendingClubOffer_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "PlayerCareer" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "League_key_key" ON "League"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Club_key_key" ON "Club"("key");

-- CreateIndex
CREATE INDEX "Club_leagueId_idx" ON "Club"("leagueId");

-- CreateIndex
CREATE INDEX "Club_countryId_idx" ON "Club"("countryId");

-- CreateIndex
CREATE INDEX "PlayerCareer_userId_idx" ON "PlayerCareer"("userId");

-- CreateIndex
CREATE INDEX "SeasonLog_careerId_idx" ON "SeasonLog"("careerId");

-- CreateIndex
CREATE INDEX "CareerEventLog_careerId_idx" ON "CareerEventLog"("careerId");

-- CreateIndex
CREATE INDEX "Trophy_careerId_idx" ON "Trophy"("careerId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingEvent_careerId_key" ON "PendingEvent"("careerId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingClubOffer_careerId_key" ON "PendingClubOffer"("careerId");
