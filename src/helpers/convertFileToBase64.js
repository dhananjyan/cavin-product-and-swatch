export default (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            const fileWithBase64 = Object.assign(file, {
                preview: base64String,
            });

            // Now you can use fileWithBase64 as needed
            // console.log(fileWithBase64);

            resolve(fileWithBase64)
        };

        reader.readAsDataURL(file);
    })
}

export function dataURLtoFile(dataurl, filename = "image") {
    const arr = dataurl?.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}