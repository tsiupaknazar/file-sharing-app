export const getIconForMimeType = (mimeType: string): string => {
    switch (mimeType) {
        case 'text/plain':
            return '/TXT.png';
        case 'text/html':
            return '/HTML.png';
        case 'application/json':
            return '/JAVA.png';
        case 'application/xml':
            return '/XML.png';
        case 'image/jpeg':
        case 'image/png':
            return '/JPG.png';
        case 'audio/mpeg':
            return '/MPEG.png';
        case 'video/mp4':
            return '/MP4.png';
        case 'application/pdf':
            return '/PDF.png';
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return '/DOC.png';
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '/XSL.png';
        default:
            return '/other.png';
    }
}