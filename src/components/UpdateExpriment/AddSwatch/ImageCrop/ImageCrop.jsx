import { useDispatch, useSelector } from 'react-redux';
import Topbar from '../../Topbar/Topbar';
import s from './ImageCrop.module.scss';
import { closeImageModal, updateBackImage, updateCurrentImage, updateFrontImage } from '../../../../store/features/updateExpriment';
import 'react-image-crop/src/ReactCrop.scss'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { useRef, useState } from 'react';

import cx from "classnames";
import { ReactSVG } from 'react-svg';

import cropIcon from "../../../../assets/svg/crop.svg";

import rightArrowIcon from "../../../../assets/svg/rightArrow.svg"
import convertFileToBase64, { dataURLtoFile } from '../../../../helpers/convertFileToBase64';


// function centerAspectCrop(
//     mediaWidth: number,
//     mediaHeight: number,
//     aspect: number,
//   ) {
//     return centerCrop(
//       makeAspectCrop(
//         {
//           unit: '%',
//           width: 90,
//         },
//         aspect,
//         mediaWidth,
//         mediaHeight,
//       ),
//       mediaWidth,
//       mediaHeight,
//     )
//   }

export default function ImageCrop() {
    const [crop, setCrop] = useState({});

    const imgRef = useRef();

    const [aspectRatio, setAspectRatio] = useState(undefined)
    const [croppedImage, setCroppedImage] = useState(null);
    // const [imageRef, setImageRef] = useState(null);

    const file = useSelector(state => state?.updateExperiment?.currentImage);
    const currentImageType = useSelector(state => state?.updateExperiment?.currentImageType);

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeImageModal())
    }

    const handleCropChange = (c, percentCrop) => {
        setCrop(c)
    }

    const handleContinue = async () => {
        console.log("crop", crop, imgRef)
        if (imgRef?.current && crop.width && crop.height) {
            const croppedImageUrl = await getCroppedImg(
                imgRef?.current,
                crop,
                "newFile.jpeg"
            );
            console.log("croppedImageUrl", croppedImageUrl)
            const croppedImage = new Image;
            croppedImage.src = croppedImageUrl;
            // cn
            const base64File = await convertFileToBase64(dataURLtoFile(croppedImageUrl));
            console.log("base64File", base64File, croppedImage, croppedImageUrl);
            // dispatch(updateCurrentImage(croppedImageUrl));
            // this.setState({ croppedImageUrl });
            if (currentImageType === "front")
                dispatch(updateFrontImage({
                    preview: base64File?.preview,
                    name: "asdfas",
                    // size: base64File.size
                }))
            else
                dispatch(updateBackImage({
                    preview: base64File?.preview,
                    name: "asdfas",
                    // size: base64File.size
                }))
        }
        dispatch(closeImageModal());
        console.log(croppedImage, "croppedImage");
    }

    const getCroppedImg = (image, crop, fileName) => {
        const canvas = document.createElement("canvas");

        // console.log("dddddddddddddddd", image, image.naturalHeight, image?.height);
        // console.table({
        //     height: image.height,
        //     width: image.width,
        //     naturalHeight: image.naturalHeight,
        //     naturalWidth: image.naturalWidth
        // })
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        return new Promise((resolve, reject) => {
            const base64Image = canvas.toDataURL('image/jpeg');
            console.log("base64", base64Image)

            resolve(base64Image)
            // let fileUrl;
            // canvas.toBlob(blob => {
            //     if (!blob) {
            //         //reject(new Error('Canvas is empty'));
            //         console.error("Canvas is empty");
            //         return;
            //     }
            //     blob.name = fileName;
            //     window.URL.revokeObjectURL(fileUrl);
            //     fileUrl = window.URL.createObjectURL(blob);
            //     resolve(fileUrl);
            // }, "image/jpeg");

            console.log(fileUrl, "fileUrl");
        });
    }


    // const handleContinue = () => {
    //     if (crop.width && crop.height) {
    //         const image = new Image();
    //         image.src = file.preview;

    //         const scaleX = image.naturalWidth / image.width;
    //         const scaleY = image.naturalHeight / image.height;

    //         const canvas = document.createElement('canvas');
    //         canvas.width = crop.width;
    //         canvas.height = crop.height;

    //         const ctx = canvas.getContext('2d');

    //         ctx.drawImage(
    //             image,
    //             crop.x, // * scaleX,
    //             crop.y, // * scaleY,
    //             crop.width, // * scaleX,
    //             crop.height, // * scaleY,
    //             0,
    //             0,
    //             crop.width,
    //             crop.height
    //         );

    //         const croppedDataUrl = canvas.toDataURL('image/jpeg'); // You can change the format if needed (e.g., 'image/png')

    //         console.log('Cropped image data URL:', croppedDataUrl);
    //         setCroppedImage(croppedDataUrl);
    //     }
    // };


    function onImageLoad(e) {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget

        const crop = centerCrop(
            makeAspectCrop(
                {
                    // You don't need to pass a complete crop into
                    // makeAspectCrop or centerCrop.
                    unit: '%',
                    width: 80,
                },
                aspectRatio || 16 / 9,
                width,
                height
            ),
            width,
            height
        )

        setCrop(crop)
    }

    const updateAspectRatio = (aspectRatio) => {
        setAspectRatio(aspectRatio)
        if (!aspectRatio) {
            setAspectRatio(undefined)
            setCrop({});
            return;
        }


        const { naturalWidth: width, naturalHeight: height } = imgRef.current;

        let newCrop;

        // const crop = centerCrop(
        //     makeAspectCrop(
        //         {
        //             // You don't need to pass a complete crop into
        //             // makeAspectCrop or centerCrop.
        //             unit: '%',
        //             width: 60,
        //         },
        //         aspectRatio || 4 / 3,
        //         width,
        //         height
        //     ),
        //     width,
        //     height
        // )

        // setCrop(crop)
        if (aspectRatio) {
            let x, y, newWidth, newHeight;

            if (width / height > aspectRatio) {
                newHeight = height;
                newWidth = height * aspectRatio;
                x = (width - newWidth) / 2;
                y = 0;
            } else {
                newWidth = width;
                newHeight = width / aspectRatio;
                x = 0;
                y = (height - newHeight) / 2;
            }

            newCrop = {

                unit: 'px',
                aspect: aspectRatio,
                width: newWidth,
                height: newHeight,
                x,
                y,
            };
        }

        setCrop(newCrop || {});
    }

    return (
        <>
            <Topbar onClose={handleClose} />
            <div className={s.cropSection}>
                <div className={cx(s.cropContainer, "p-5")}>
                    <div className={cx(s.title3, s["text-white"])}>Hair wig sample 587451.jpg</div>
                    <div className={cx("text-center mt-4")}>
                        <ReactCrop
                            keepSelection={aspectRatio}
                            aspect={aspectRatio}
                            crop={crop}
                            // onImageLoaded={onCropImageLoaded}
                            onChange={handleCropChange}
                            minHeight={50}
                            minWidth={50}
                            ruleOfThirds
                        >
                            <img src={file} onLoad={onImageLoad} ref={imgRef} />
                        </ReactCrop>
                    </div>
                </div>
                <div className={s.settingSection}>
                    <div className={cx(s.title1, s["text-white"], "py-5")}>Crop image</div>
                    <div className={cx("d-flex justify-content-center flex-column align-items-center pb-5")}>
                        <div className={cx(s.title3, s["text-white"], "pb-2")}>Manual</div>
                        <button onClick={() => updateAspectRatio(undefined)} className={cx(s.btnDark, s.buttonStyle)}><ReactSVG src={cropIcon} />Manual crop</button>
                    </div>
                    <div className={cx("d-flex justify-content-center flex-column align-items-center")}>
                        <div className={cx(s.title3, s["text-white"], "pb-2")}>Predefined crop settings</div>
                        <button onClick={() => updateAspectRatio(4 / 3)} className={cx(s.btnDark, s.buttonStyle, "mb-2")}><div className={s.square} />4:3 ratio</button>
                        <button onClick={() => updateAspectRatio(16 / 9)} className={cx(s.btnDark, s.buttonStyle, "mb-2")}> <div className={s.rectangle} />16:9 ratio</button>
                        <button onClick={() => updateAspectRatio(2 / 39 / 1)} className={cx(s.btnDark, s.buttonStyle, "mb-2")}> <div className={s.rectangle1} />2.39:1 ratio</button>
                        <button onClick={() => updateAspectRatio(1 / 85 / 1)} className={cx(s.btnDark, s.buttonStyle, "mb-2")}> <div className={s.rectangle2} />1:85:1 ratio</button>
                    </div>
                </div>
                <div className={s.bottomBar}>
                    <button className={s.btnSecondary} onClick={handleClose}>Cancel</button>
                    <button className={s.btnPrimary} onClick={handleContinue}>Continue <ReactSVG src={rightArrowIcon} /></button>
                </div>
            </div>
            <div style={{ height: '100%' }}>
                {croppedImage && <img style={{ width: "100px", height: "100%" }} src={croppedImage} alt="Cropped Image" />}
            </div>

        </>
    )
}
