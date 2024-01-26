enum FileIcon {
    DEFAULT = '/other.png',
    TXT = '/TXT.png',
    DOC = "/DOC.png",
    PDF = "/PDF.png",
    JPG = "/JPG.png",
    PNG = "/PNG.png",
    XSLX = "/XSL.png",
    MP4 = "/MP4.png",
    SVG = "/SVG.png",
    HTML = "/HTML.png",
    MP3 = "/MP3.png",
    ZIP = "/ZIP.png",
    JS = "/JS.png",
    EXE = "/EXE.png",
    JSON = "/JSON.png",
    PPT = "/PPT.png",

}

const getFileExtension = (fileName: string): string | undefined => {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === fileName.length - 1) {
        return undefined; // No extension found or dot is at the end of the filename
    }
    return fileName.slice(dotIndex + 1).toLowerCase();
}

export const getExtensionIcon = (fileName: string): FileIcon => {
    const extension = getFileExtension(fileName);
    switch (extension) {
        case 'pdf':
            return FileIcon.PDF;
        case 'doc':
        case 'docx':
            return FileIcon.DOC;
        case 'jpg':
        case 'jpeg':
            return FileIcon.JPG;
        case 'png':
            return FileIcon.PNG;
        case 'txt':
            return FileIcon.TXT;
        default:
            return FileIcon.DEFAULT;
    }
}

// export const getExtensionIcon = (mimeType: string): string => {
//     switch (mimeType) {
//         case 'application/json':
//             return '/JAVA.png';
//         case 'application/xml':
//             return '/XML.png';
//         case 'application/zip':
//             return '/ZIP.png';
//         case 'image/jpeg':
//         case 'image/png':
//             return '/JPG.png';
//         case 'image/svg+xml':
//             return '/SVG.png';
//         case 'audio/mpeg':
//             return '/MPEG.png';
//         case 'video/mp4':
//             return '/MP4.png';
//         case 'application/pdf':
//             return '/PDF.png';
//         case 'application/msword':
//         case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
//             return '/DOC.png';
//         case 'application/vnd.ms-excel':
//         case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
//             return '/XSL.png';
//         case 'text/x-python-script':
//             return '';
//         default:
//             return '/other.png';
//     }
// }