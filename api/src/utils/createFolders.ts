import fs from 'fs';
import path from 'path';

class CheckFoldersExists {
    private pathFromRoot = process.cwd() + '/public';

    foldersAreExists = () => {
        this.makeFolderIfNotExist('/images/studentImage');
        this.makeFolderIfNotExist('/reports/class');
        this.makeFolderIfNotExist('/reports/teacher');
    };

    private makeFolderIfNotExist = (folderPath: string) => {
        const splitFoldersName = folderPath.split('/');

        splitFoldersName.map((folderName: string, idx: number) => {
            const pathCheck =
                this.pathFromRoot +
                `${splitFoldersName.slice(0, idx).join('/')}/${folderName}`;
            !fs.existsSync(pathCheck) && fs.mkdirSync(path.join(pathCheck));
        });
    };
}

export default CheckFoldersExists;
