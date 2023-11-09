import s from "./ImageUpload.module.scss";

import cx from "classnames";
import Dropzone from "../../../common/Dropzone/Dropzone";
import { ReactSVG } from "react-svg";

import uploadIcon from "../../../../assets/svg/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { openImagePopup, updateBackImage, updateCurrentImage, updateFrontImage } from "../../../../store/features/updateExpriment";
import Bottombar from "../../Bottombar/Bottombar";
import convertFileToBase64 from "../../../../helpers/convertFileToBase64";

export default function ImageUpload() {

    const dispatch = useDispatch();
    const frontImage = useSelector(state => state?.updateExperiment?.frontImage)
    const backImage = useSelector(state => state?.updateExperiment?.backImage)

    const onImageChange = async (f, from) => {
        // const file = Object.assign(f[0], {
        //     preview: URL.createObjectURL(f[0])
        // })
        // console.log("check this", from, f, file);

        // dispatch(updateCurrentImage(file));
        // dispatch(openImagePopup());
        const base64File = await convertFileToBase64(f[0]);
        console.log("ddddddddddddd", {
            preview: base64File.preview,
            name: base64File.name
        })
        if (from === "front")
            dispatch(updateFrontImage({
                preview: base64File.preview,
                name: base64File.name
            }))
        else
            dispatch(updateBackImage({
                preview: base64File.preview,
                name: base64File.name
            }));
    }

    return (
        <>
            <div className={s.parent}>
                <div className={s.main}>
                    <div className={cx(s.title12, "pb-3")}>Swatch name 2</div>
                    <div className="d-flex gap-5 pb-5">
                        <div>
                            <div className={cx(s.title2, s.fw500, "pb-2")}>Front image</div>
                            {!frontImage ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "front")}>
                                <ReactSVG src={uploadIcon} />
                                <div>Upload image</div>
                            </Dropzone> : <div className={s.imgContainer} ><img className={s.img} src={frontImage.preview} alt="Swatch Front Image" /></div>}
                        </div>
                        <div className="ms-3">
                            <div className={cx(s.title2, s.fw500, "pb-2")}>Back image</div>
                            {!backImage ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "back")}>
                                <ReactSVG src={uploadIcon} />
                                <div>Upload image</div>
                            </Dropzone> : <div className={s.imgContainer} ><img className={s.img} src={frontImage.preview} alt="Swatch Back Image" /></div>}
                        </div>
                    </div>
                    <div className={cx(s.title12, "pb-3")}>Swatch name 2 activities</div>
                    <div className={s.titleSmall1}>Swatch name 2 activities will be listed here...</div>
                </div>
                <Bottombar />
            </div>
        </>
    )
}
