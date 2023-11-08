import s from "./ImageUpload.module.scss";

import cx from "classnames";
import Dropzone from "../../../common/Dropzone/Dropzone";
import { ReactSVG } from "react-svg";

import uploadIcon from "../../../../assets/svg/upload.svg";
import { useDispatch } from "react-redux";
import { openImagePopup, updateCurrentImage } from "../../../../store/features/updateExpriment";
import Bottombar from "../../Bottombar/Bottombar";

export default function ImageUpload() {

    const dispatch = useDispatch();

    const onImageChange = (f, from) => {
        const file = Object.assign(f[0], {
            preview: URL.createObjectURL(f[0])
        })
        console.log("check this", from, f, file);
        dispatch(updateCurrentImage(file));
        dispatch(openImagePopup());
    }

    return (
        <>
        <div className={s.parent}>
            <div className={cx(s.title12, "pb-3")}>Swatch name 2</div>
            <div className="d-flex gap-5 pb-5">
                <div>
                    <div className={cx(s.title2, s.fw500, "pb-2")}>Front image</div>
                    <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "front")}>
                        <ReactSVG src={uploadIcon} />
                        <div>Upload image</div>
                    </Dropzone>
                </div>
                <div className="ms-3">
                    <div className={cx(s.title2, s.fw500, "pb-2")}>Back image</div>
                    <Dropzone className={s.dropzone}>
                        <ReactSVG src={uploadIcon} />
                        <div>Upload image</div>
                    </Dropzone>
                </div>
            </div>
            <div className={cx(s.title12, "pb-3")}>Swatch name 2 activities</div>
            <div className={s.titleSmall1}>Swatch name 2 activities will be listed here...</div>
        </div>
          <Bottombar/>
        </>
    )
}
