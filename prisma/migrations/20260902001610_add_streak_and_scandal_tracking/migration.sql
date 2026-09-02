-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerCareer" (
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
    "pendingMatchPenalty" INTEGER NOT NULL DEFAULT 0,
    "ntCaps" INTEGER NOT NULL DEFAULT 0,
    "ntGoals" INTEGER NOT NULL DEFAULT 0,
    "ntAssists" INTEGER NOT NULL DEFAULT 0,
    "positiveDecisionStreak" INTEGER NOT NULL DEFAULT 0,
    "pendingScandalKey" TEXT,
    "pendingScandalSeasonsLeft" INTEGER,
    "celebrationJson" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlayerCareer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_nationalityId_fkey" FOREIGN KEY ("nationalityId") REFERENCES "Country" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_currentClubId_fkey" FOREIGN KEY ("currentClubId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "PlayerCareer_onLoanFromId_fkey" FOREIGN KEY ("onLoanFromId") REFERENCES "Club" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlayerCareer" ("age", "celebrationJson", "createdAt", "currentClubId", "defense", "difficulty", "fitness", "foot", "id", "jerseyNumber", "lastName", "marketValueEUR", "mentality", "morale", "nationalityId", "ntAssists", "ntCaps", "ntGoals", "onLoanFromId", "overall", "pace", "passing", "pendingMatchPenalty", "physical", "position", "reputation", "seasonIndex", "shooting", "starterShare", "status", "updatedAt", "userId") SELECT "age", "celebrationJson", "createdAt", "currentClubId", "defense", "difficulty", "fitness", "foot", "id", "jerseyNumber", "lastName", "marketValueEUR", "mentality", "morale", "nationalityId", "ntAssists", "ntCaps", "ntGoals", "onLoanFromId", "overall", "pace", "passing", "pendingMatchPenalty", "physical", "position", "reputation", "seasonIndex", "shooting", "starterShare", "status", "updatedAt", "userId" FROM "PlayerCareer";
DROP TABLE "PlayerCareer";
ALTER TABLE "new_PlayerCareer" RENAME TO "PlayerCareer";
CREATE INDEX "PlayerCareer_userId_idx" ON "PlayerCareer"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
