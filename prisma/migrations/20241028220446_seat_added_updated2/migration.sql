BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Seat] ADD CONSTRAINT [Seat_status_df] DEFAULT 0 FOR [status];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
