enum FileIcon {
    DEFAULT = '/other.png',
    AI = '/AI.png',
    AVI = '/AVI.png',
    BMP = '/BMP.png',
    CRD = '/CRD.png',
    CSV = '/CSV.png',
    CSS = '/CSS.png',
    DLL = '/DLL.png',
    DOC = '/DOC.png',
    DOCX = '/DOCX.png',
    DWG = '/DWG.png',
    EPS = '/EPS.png',
    EXE = '/EXE.png',
    FLV = '/FLV.png',
    GIF = '/GIFF.png',
    HTML = '/HTML.png',
    ISO = '/ISO.png',
    JPG = '/JPG.png',
    JS = '/JS.png',
    JSON = '/JSON.png',
    JSX = '/JSX.png',
    MDB = '/MDB.png',
    MID = '/MID.png',
    MOV = '/MOV.png',
    MP3 = '/MP3.png',
    MP4 = '/MP4.png',
    MPEG = '/MPEG.png',
    PDF = '/PDF.png',
    PHP = '/PHP.png',
    PNG = '/PNG.png',
    PPT = '/PPT.png',
    PS = '/PS.png',
    PSD = '/PSD.png',
    PUB = '/PUB.png',
    PY = '/PY.png',
    RAR = '/RAR.png',
    RAW = '/RAW.png',
    RSS = '/RSS.png',
    SVG = '/SVG.png',
    TIFF = '/TIFF.png',
    TS = '/TS.png',
    TSX = '/TSX.png',
    TXT = '/TXT.png',
    WAV = '/WAV.png',
    WMA = '/WMA.png',
    XML = '/XML.png',
    XSL = '/XSL.png',
    ZIP = '/ZIP.png',
}

const getFileExtension = (fileName: string): string | undefined => {
    const dotIndex = fileName.lastIndexOf('.');
    if (dotIndex === -1 || dotIndex === fileName.length - 1) {
        return undefined;
    }
    return fileName.slice(dotIndex + 1).toLowerCase();
}

export const getExtensionIcon = (fileName: string): FileIcon => {
    const extension = getFileExtension(fileName);
    switch (extension) {
        case 'ai':
            return FileIcon.AI;
        case 'avi':
            return FileIcon.AVI;
        case 'bmp':
            return FileIcon.BMP;
        case 'crd':
            return FileIcon.CRD;
        case 'csv':
            return FileIcon.CSV;
        case 'css':
            return FileIcon.CSS;
        case 'dll':
            return FileIcon.DLL;
        case 'doc':
            return FileIcon.DOC;
        case 'docx':
            return FileIcon.DOCX;
        case 'dwg':
            return FileIcon.DWG;
        case 'eps':
            return FileIcon.EPS;
        case 'exe':
            return FileIcon.EXE;
        case 'flv':
            return FileIcon.FLV;
        case 'gif':
            return FileIcon.GIF;
        case 'html':
            return FileIcon.HTML;
        case 'iso':
            return FileIcon.ISO;
        case 'jpg':
        case 'jpeg':
            return FileIcon.JPG;
        case 'js':
            return FileIcon.JS;
        case 'jsx':
            return FileIcon.JSX;
        case 'json':
            return FileIcon.JSON;
        case 'mdb':
            return FileIcon.MDB;
        case 'mid':
            return FileIcon.MID;
        case 'mov':
            return FileIcon.MOV;
        case 'mp3':
            return FileIcon.MP3;
        case 'mp4':
            return FileIcon.MP4;
        case 'mpeg':
            return FileIcon.MPEG;
        case 'pdf':
            return FileIcon.PDF;
        case 'png':
            return FileIcon.PNG;
        case 'php':
            return FileIcon.PHP;
        case 'ppt':
        case 'pptx':
            return FileIcon.PPT;
        case 'ps':
            return FileIcon.PS;
        case 'psd':
            return FileIcon.PSD;
        case 'pub':
            return FileIcon.PUB;
        case 'py':
            return FileIcon.PY;
        case 'rar':
            return FileIcon.RAR;
        case 'raw':
            return FileIcon.RAW;
        case 'rss':
            return FileIcon.RSS;
        case 'svg':
            return FileIcon.SVG;
        case 'tiff':
            return FileIcon.TIFF;
        case 'ts':
            return FileIcon.TS;
        case 'tsx':
            return FileIcon.TSX;
        case 'txt':
            return FileIcon.TXT;
        case 'wav':
            return FileIcon.WAV;
        case 'wma':
            return FileIcon.WMA;
        case 'xml':
            return FileIcon.XML;
        case 'xsl':
            return FileIcon.XSL;
        case 'zip':
            return FileIcon.ZIP;
        default:
            return FileIcon.DEFAULT;
    }
}