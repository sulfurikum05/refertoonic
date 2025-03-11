const fs = require('fs');

export class DeleteFiles {
    static async deleteFileFromStorage(filePath){        
        try {
            fs.unlinkSync(filePath);
            console.log("Файл успешно удалён");
             
        } catch (err) {
            console.log(`Ошибка при удалении файла: ${err.message}`);
        }

    }
}
