export const getIconForMimeType = (mimeType: string): string => {
    switch (mimeType) {
        case 'text/plain':
            return '📄'; // Text file icon
        case 'text/html':
            return '🌐'; // HTML file icon
        case 'application/json':
            return '📋'; // JSON file icon
        case 'application/xml':
            return '🗃️'; // XML file icon
        case 'image/jpeg':
        case 'image/png':
            return '🖼️'; // Image file icon
        case 'audio/mpeg':
            return '🎵'; // Audio file icon
        case 'video/mp4':
            return '🎥'; // Video file icon
        case 'application/pdf':
            return '📎'; // PDF file icon
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return '📃'; // Word document icon
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            return '📊'; // Excel spreadsheet icon
        default:
            return '❓'; // Default icon for unknown MIME types
    }
}