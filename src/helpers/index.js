export function bitesToMb(bytes) {
    const kilobyte = 1024;
    const megabyte = kilobyte * 1024;

    if (bytes < kilobyte) {
        return bytes + ' B';
    } else if (bytes < megabyte) {
        return (bytes / kilobyte).toFixed(2) + ' KB';
    } else {
        return (bytes / megabyte).toFixed(2) + ' MB';
    }
}