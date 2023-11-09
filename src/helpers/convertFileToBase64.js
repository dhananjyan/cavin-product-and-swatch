export default (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result;
            const fileWithBase64 = Object.assign(file, {
                preview: base64String,
            });

            // Now you can use fileWithBase64 as needed
            console.log(fileWithBase64);

            resolve(fileWithBase64)
        };

        reader.readAsDataURL(file);
    })
}