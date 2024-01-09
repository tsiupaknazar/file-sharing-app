export const getPageName = (page: string) => {
    switch (page) {
        case '/dashboard':
            return 'Dashboard'
        case '/upload':
            return 'Upload Files'
        case '/shared':
            return 'Shared Files'
        case '/trash':
                return 'Trash'
        default:
            return ''
    }
}