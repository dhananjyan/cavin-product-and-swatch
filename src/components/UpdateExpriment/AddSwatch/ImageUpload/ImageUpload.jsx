import s from "./ImageUpload.module.scss";

import cx from "classnames";
import Dropzone from "../../../common/Dropzone/Dropzone";
import { ReactSVG } from "react-svg";

import uploadIcon from "../../../../assets/svg/upload.svg";
import { useDispatch, useSelector } from "react-redux";
import { deleteSwatchImage, openImagePopup, showFinalStep, updateBackImage, updateCurrentImage, updateCurrentSwatch, updateCurrentSwatchStatus, updateFrontImage, updateWashCount } from "../../../../store/features/updateExpriment";
import Bottombar from "../../Bottombar/Bottombar";
import convertFileToBase64 from "../../../../helpers/convertFileToBase64";

import binIcon from "../../../../assets/svg/bin.svg";
import { bitesToMb } from "../../../../helpers";
import config from "../../../../config";
import Loader from "../../../common/Loader/Loader";
import FinalResult from "../FinalResult/FinalResult";

const { apiBaseUrl } = config || {};

export default function ImageUpload() {

    const dispatch = useDispatch();
    const frontImage = useSelector(state => state?.updateExperiment?.frontImage)
    const backImage = useSelector(state => state?.updateExperiment?.backImage)
    const activeSwatch = useSelector(state => state?.updateExperiment?.activeSwatch)
    const currentSwatchStatus = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const currentData = useSelector(state => state?.updateExperiment?.currentSwatchStatus)
    const isAddSwatchLoading = useSelector(state => state?.updateExperiment?.isAddSwatchLoading)
    const currentStep = useSelector(state => state?.updateExperiment?.currentStep)
    const swatchList = useSelector(state => state?.updateExperiment?.swatchList)

    const step = currentStep;

    const onImageChange = async (f, from) => {
        const file = Object.assign(f[0], {
            preview: URL.createObjectURL(f[0])
        })
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

    const updateCurrentWash = (item) => {
        dispatch(updateCurrentSwatchStatus(item))
        dispatch(updateWashCount(item?.wash_count));
    }

    return (
        <>
            {activeSwatch ? <div className={s.parent}>
                {/* {true ? <div className={s.parent}> */}
                <Loader show={isAddSwatchLoading}>
                    <div className={(s.main)}>
                        {(step != 4) ? <>
                            {/* {false ? <> */}
                            <div className={cx(s.title12, "pb-3 text-capitalize")}>{activeSwatch?.swatch_name}</div>
                            <div className="d-flex gap-5 pb-5 ">
                                <div className="flex-grow-1">
                                    <div className={cx(s.title2, s.fw500, "pb-2")}>Front image</div>
                                    {/* */}
                                    {((!frontImage?.preview && !currentSwatchStatus?.front_image_url?.includes("img"))) ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "front")}>
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
                                <div className="ms-3 flex-grow-1">
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
                            {step == 3 ? <div >
                                {/* <h6>Wash - {item?.wash_count}</h6> */}
                                <table className={cx("table table-responsive text-center", s.table)}>
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
                                        {swatchList?.map((item, i) => {
                                            if (item?.steps == 3)
                                                return <tr key={`TABLE_wash_${i}_row`}>
                                                    <td className={cx("text-capitalize fw-bold")}><div role="button" className={cx({ [s.activeWash]: (currentSwatchStatus?.wash_count === item?.wash_count) })} onClick={() => updateCurrentWash(item)}>Wash - {item?.wash_count}</div></td>
                                                    <td>{item?.L_front?.toFixed(2)}</td>
                                                    <td>{item?.A_front?.toFixed(2)}</td>
                                                    <td>{item?.B_front?.toFixed(2)}</td>
                                                    <td>{item?.L_back?.toFixed(2)}</td>
                                                    <td>{item?.A_back?.toFixed(2)}</td>
                                                    <td>{item?.B_back?.toFixed(2)}</td>
                                                </tr>
                                        })}
                                    </tbody>
                                </table>
                            </div>
                                : currentData ? <div>
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
                                                <td>{currentData?.L_front?.toFixed(2)}</td>
                                                <td>{currentData?.A_front?.toFixed(2)}</td>
                                                <td>{currentData?.B_front?.toFixed(2)}</td>
                                                <td>{currentData?.L_back?.toFixed(2)}</td>
                                                <td>{currentData?.A_back?.toFixed(2)}</td>
                                                <td>{currentData?.B_back?.toFixed(2)}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div> : ""}
                            {/* <div className={cx(s.title12, "pb-3")}>Swatch name 2 activities</div>
                            <div className={s.titleSmall1}>Swatch name 2 activities will be listed here...</div> */}
                        </> : <FinalResult />}
                    </div>
                </Loader>
                {/* <Bottombar /> */}
            </div> : ""}
        </>
    )
}
