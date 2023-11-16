import s from "./ImageUpload.module.scss";

import cx from "classnames";
import Dropzone from "../../../common/Dropzone/Dropzone";
import { ReactSVG } from "react-svg";

import uploadIcon from "../../../../assets/svg/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteSwatchImage, openImagePopup, showFinalStep, updateBackImage, updateCurrentImage, updateFrontImage } from "../../../../store/features/updateExpriment";
import Bottombar from "../../Bottombar/Bottombar";
import convertFileToBase64 from "../../../../helpers/convertFileToBase64";

import binIcon from "../../../../assets/svg/bin.svg";
import { bitesToMb } from "../../../../helpers";
import config from "../../../../config";
import Loader from "../../../common/Loader/Loader";
import FinalResult from "../FinalResult/FinalResult";
import { useEffect } from "react";

const { apiBaseUrl } = config || {};

export default function ImageUpload() {

    const dispatch = useDispatch();
    const frontImage = useSelector(state => state?.updateExperiment?.frontImage)
    const backImage = useSelector(state => state?.updateExperiment?.backImage)
    const activeSwatch = useSelector(state => state?.updateExperiment?.activeSwatch)
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const currentData = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const isAddSwatchLoading = useSelector(state => state?.updateExperiment?.isAddSwatchLoading)
    const showFinal = useSelector(state => state?.updateExperiment?.showFinal)


    const step = currentSwatchStatus?.steps;

    const onImageChange = async (f, from) => {
        const file = Object.assign(f[0], {
            preview: URL.createObjectURL(f[0])
        })
        // console.log("check this", from, f, file);
        // console.log(f[0],file,"line 35");
        dispatch(updateCurrentImage({ file: file?.preview, from }));
        dispatch(openImagePopup());
        //     const base64File = await convertFileToBase64(f[0]);
        //     console.log("ddddddddddddd", {
        //         preview: base64File.preview,
        //         name: base64File.name
        //     })
        //     if (from === "front")
        //         dispatch(updateFrontImage({
        //             preview: base64File.preview,
        //             name: base64File.name,
        //             size: base64File.size
        //         }))
        //     else
        //         dispatch(updateBackImage({
        //             preview: base64File.preview,
        //             name: base64File.name,
        //             size: base64File.size
        //         }));
    }

    const handleDelete = (type) => {
        dispatch(deleteSwatchImage(type))
    }




    return (
        <>
            {activeSwatch ? <div className={s.parent}>
                {/* {true ? <div className={s.parent}> */}
                <Loader show={isAddSwatchLoading}>
                    <div className={s.main}>
                        {((step != 4) && !showFinal) ? <>
                            {/* {false ? <> */}
                            <div className={cx(s.title12, "pb-3")}>{activeSwatch?.swatch_name}</div>
                            <div className="d-flex gap-5 pb-5">
                                <div>
                                    <div className={cx(s.title2, s.fw500, "pb-2")}>Front image</div>
                                    {(!frontImage?.preview && !currentSwatchStatus?.front_image_url?.includes("img")) ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "front")}>
                                        <ReactSVG src={uploadIcon} />
                                        <div>Upload image</div>
                                    </Dropzone> :
                                        <>
                                            <div className={s.imgContainer} >
                                                <img className={s.img} src={frontImage?.preview || `${apiBaseUrl}${currentSwatchStatus?.front_image_url}`} alt="Swatch Front Image" />
                                            </div>
                                            <div className="d-flex justify-content-between pt-2 pe-3">
                                                <div className={cx(s.text, s.fw500)}>{frontImage?.name}</div>
                                                <ReactSVG role="button" src={binIcon} onClick={() => handleDelete("front")} />
                                            </div>
                                            <div>{bitesToMb(frontImage?.size)}</div>
                                        </>}
                                </div>
                                <div className="ms-3">
                                    <div className={cx(s.title2, s.fw500, "pb-2")}>Back image</div>
                                    {(!backImage?.preview && !currentSwatchStatus?.back_image_url?.includes("img")) ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "back")}>
                                        <ReactSVG src={uploadIcon} />
                                        <div>Upload image</div>
                                    </Dropzone> : <>
                                        <div className={s.imgContainer} ><img className={s.img} src={backImage?.preview || `${apiBaseUrl}${currentSwatchStatus?.back_image_url}`} alt="Swatch Back Image" /></div>
                                        <div className="d-flex justify-content-between  pt-2 pe-3">
                                            <div className={cx(s.text, s.fw500)}>{backImage?.name}</div>
                                            <ReactSVG role="button" src={binIcon} onClick={() => handleDelete("back")} />
                                        </div>
                                        <div>{bitesToMb(backImage?.size)}</div>
                                    </>}
                                </div>
                            </div>
                            {currentData ? <div>
                                <table className={cx("table text-center")}>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th colSpan={3}>Front</th>
                                            <th colSpan={3}>Back</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th>L*</th>
                                            <th>A*</th>
                                            <th>B*</th>
                                            <th>L*</th>
                                            <th>A*</th>
                                            <th>B*</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{activeSwatch?.swatch_name}</td>
                                            <td>{currentData?.L_front}</td>
                                            <td>{currentData?.A_front}</td>
                                            <td>{currentData?.B_front}</td>
                                            <td>{currentData?.L_back}</td>
                                            <td>{currentData?.A_back}</td>
                                            <td>{currentData?.B_back}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div> : ""}
                            <div className={cx(s.title12, "pb-3")}>Swatch name 2 activities</div>
                            <div className={s.titleSmall1}>Swatch name 2 activities will be listed here...</div>
                        </> : <FinalResult />}
                    </div>
                </Loader>
                <Bottombar />
            </div> : ""}
        </>
    )
}
