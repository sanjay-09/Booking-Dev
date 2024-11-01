/*
  Warnings:

  - You are about to drop the column `custId` on the `Seat` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Seat] DROP COLUMN [custId];

-- CreateTable
CREATE TABLE [dbo].[UserSeat] (
    [id] INT NOT NULL IDENTITY(1,1),
    [custId] INT NOT NULL,
    [seatId] INT NOT NULL,
    CONSTRAINT [UserSeat_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserSeat] ADD CONSTRAINT [UserSeat_custId_fkey] FOREIGN KEY ([custId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserSeat] ADD CONSTRAINT [UserSeat_seatId_fkey] FOREIGN KEY ([seatId]) REFERENCES [dbo].[Seat]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
