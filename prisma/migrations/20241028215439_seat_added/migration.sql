BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Seat] (
    [id] INT NOT NULL IDENTITY(1,1),
    [status] BIT NOT NULL,
    [custId] INT NOT NULL,
    CONSTRAINT [Seat_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Seat] ADD CONSTRAINT [Seat_custId_fkey] FOREIGN KEY ([custId]) REFERENCES [dbo].[Customer]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH