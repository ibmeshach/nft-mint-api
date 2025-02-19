-- CreateTable
CREATE TABLE "nfts" (
    "id" SERIAL NOT NULL,
    "nftId" INTEGER NOT NULL,
    "nftName" TEXT NOT NULL,
    "nftDescription" TEXT NOT NULL,
    "nftLogoUrl" TEXT NOT NULL,
    "nftOwnerAddress" TEXT NOT NULL,

    CONSTRAINT "nfts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "nfts_nftId_key" ON "nfts"("nftId");
