const fs = require('fs');

export class DeleteFiles {
    static async deleteFileFromStorage(cleanVideoPath, cleanGifPath) {
        try {
            fs.unlinkSync(cleanVideoPath);
            if (cleanGifPath !== undefined) {
                fs.unlinkSync(cleanGifPath);
            }
        } catch (err) {
            console.log(`Error deleting the file ${err.message}`);
        }
    }
}
