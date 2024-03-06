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
import React from "react";

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
    const noOfWashes = useSelector((state) => state?.updateExperiment?.washCount);


    const step = currentStep;

    const backMean = currentData?.back?.mean;
    const frontMean = currentData?.front?.mean

    const backStd = currentData?.back?.std;
    const frontStd = currentData?.front?.std;

    const averageData = currentData?.average;

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
                                            <th colSpan={6}>Front</th>
                                            <th colSpan={6}>Back</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>L*</th>
                                            <th>a*</th>
                                            <th>b*</th>
                                            <th>C*</th>
                                            <th>Hue</th>
                                            <th>L*</th>
                                            <th>a*</th>
                                            <th>b*</th>
                                            <th>C*</th>
                                            <th>Hue</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {swatchList?.map((item, i) => {
                                            if (item?.steps == 3 && item.wash_count == noOfWashes)
                                                return <React.Fragment key={`TABLE_wash_${i}_row`}>
                                                    <tr>
                                                        <td className={cx("text-capitalize fw-bold text-center align-middle border-end")} rowSpan={3}><div role="button" className={cx({ [s.activeWash]: (currentSwatchStatus?.wash_count === item?.wash_count) })} onClick={() => updateCurrentWash(item)}>Wash - {item?.wash_count}</div></td>
                                                    </tr>
                                                    <tr >
                                                        <td className={cx("text-capitalize fw-bold")}><div role="button" className={cx({ [s.activeWash]: (currentSwatchStatus?.wash_count === item?.wash_count) })}>Mean</div></td>
                                                        <td>{item?.front?.mean?.L?.toFixed(2)}</td>
                                                        <td>{item?.front?.mean?.A?.toFixed(2)}</td>
                                                        <td>{item?.front?.mean?.B?.toFixed(2)}</td>
                                                        <td>{item?.front?.mean?.Chroma_c ? item?.front?.mean?.Chroma_c?.toFixed(2) : "-"}</td>
                                                        <td>{item?.front?.mean?.Hue_angle ? item?.front?.mean?.Hue_angle?.toFixed(2) : "-"}</td>
                                                        <td>{item?.back?.mean?.L?.toFixed(2)}</td>
                                                        <td>{item?.back?.mean?.A?.toFixed(2)}</td>
                                                        <td>{item?.back?.mean?.B?.toFixed(2)}</td>
                                                        <td>{item?.back?.mean?.Chroma_c?.toFixed(2)}</td>
                                                        <td>{item?.back?.mean?.Hue_angle?.toFixed(2)}</td>

                                                    </tr>
                                                    <tr>
                                                        <td className={cx("text-capitalize fw-bold")}><div role="button" className={cx({ [s.activeWash]: (currentSwatchStatus?.wash_count === item?.wash_count) })}>STD</div></td>
                                                        <td>{item?.front?.std?.L?.toFixed(2)}</td>
                                                        <td>{item?.front?.std?.A?.toFixed(2)}</td>
                                                        <td>{item?.front?.std?.B?.toFixed(2)}</td>
                                                        <td>{item?.front?.std?.Chroma_c ? item?.front?.std?.Chroma_c?.toFixed(2) : "-"}</td>
                                                        <td>{item?.front?.std?.Hue_angle ? item?.front?.std?.Hue_angle?.toFixed(2) : "-"}</td>
                                                        <td>{item?.back?.std?.L?.toFixed(2)}</td>
                                                        <td>{item?.back?.std?.A?.toFixed(2)}</td>
                                                        <td>{item?.back?.std?.B?.toFixed(2)}</td>
                                                        <td>{item?.back?.std?.Chroma_c ? item?.back?.std?.Chroma_c?.toFixed(2) : "-"}</td>
                                                        <td>{item?.back?.std?.Hue_angle ? item?.back?.std?.Hue_angle?.toFixed(2) : "-"}</td>
                                                    </tr>
                                                </React.Fragment>
                                        })}
                                    </tbody>
                                </table>
                                <table className={cx("table table-responsive text-center", s.table)}>
                                    <thead>
                                        <tr>
                                            <th colSpan={12}>Average</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>L*</th>
                                            <th>a*</th>
                                            <th>b*</th>
                                            <th>C*</th>
                                            <th>Hue</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {swatchList?.map((item, i) => {
                                            if (item?.steps == 3 && item.wash_count == noOfWashes)
                                                return <tr key={`TABLE_wash_${i}_row`}>
                                                    <td className={cx("text-capitalize fw-bold")}><div role="button" className={cx({ [s.activeWash]: (currentSwatchStatus?.wash_count === item?.wash_count) })} onClick={() => updateCurrentWash(item)}>Wash - {item?.wash_count}</div></td>
                                                    <td></td>
                                                    <td>{item?.average?.L?.toFixed(2)}</td>
                                                    <td>{item?.average?.A?.toFixed(2)}</td>
                                                    <td>{item?.average?.B?.toFixed(2)}</td>
                                                    <td>{item?.average?.Chroma_c?.toFixed(2)}</td>
                                                    <td>{item?.average?.Hue_angle?.toFixed(2)}</td>
                                                    <td></td>
                                                    <td></td>
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
                                                <th colSpan={6}>Front</th>
                                                <th colSpan={6}>Back</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>L*</th>
                                                <th>a*</th>
                                                <th>b*</th>
                                                <th>C*</th>
                                                <th>Hue</th>
                                                <th>L*</th>
                                                <th>a*</th>
                                                <th>b*</th>
                                                <th>C*</th>
                                                <th>Hue</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={3} className="text-center align-middle fw-bold border-end ">{activeSwatch?.swatch_name}</td>
                                            </tr>
                                            <tr>

                                                <td className="fw-semibold">Mean</td>
                                                <td>{frontMean?.L?.toFixed(2)}</td>
                                                <td>{frontMean?.A?.toFixed(2)}</td>
                                                <td>{frontMean?.B?.toFixed(2)}</td>
                                                <td>{frontMean?.Chroma_c !== null ? frontMean?.Chroma_c?.toFixed(2) : "-"}</td>
                                                <td>{frontMean?.Hue_angle !== null ? frontMean?.Hue_angle?.toFixed(2) : "-"}</td>
                                                <td>{backMean?.L?.toFixed(2)}</td>
                                                <td>{backMean?.A?.toFixed(2)}</td>
                                                <td>{backMean?.B?.toFixed(2)}</td>
                                                <td>{backMean?.Chroma_c?.toFixed(2)}</td>
                                                <td>{backMean?.Hue_angle !== null ? backMean?.Hue_angle?.toFixed(2) : "-"}</td>

                                            </tr>
                                            <tr>

                                                <td className="fw-semibold">STD</td>
                                                <td>{frontStd?.L?.toFixed(2)}</td>
                                                <td>{frontStd?.A?.toFixed(2)}</td>
                                                <td>{frontStd?.B?.toFixed(2)}</td>
                                                <td>{frontStd?.Chroma_c !== null ? frontStd?.Chroma_c?.toFixed(2) : "-"}</td>
                                                <td>{frontStd?.Chroma_c !== null ? frontStd?.Chroma_c?.toFixed(2) : "-"}</td>
                                                <td>{backStd?.L?.toFixed(2)}</td>
                                                <td>{backStd?.A?.toFixed(2)}</td>
                                                <td>{backStd?.B?.toFixed(2)}</td>
                                                <td>{backStd?.Chroma_c !== null ? backStd?.Chroma_c?.toFixed(2) : '-'}</td>
                                                <td>{backStd?.Chroma_c !== null ? backStd?.Chroma_c?.toFixed(2) : "-"}</td>
                                            </tr>


                                        </tbody>
                                    </table>
                                    <table className={cx("table text-center mt-5")}>
                                        <thead>
                                            <tr>
                                                <th colSpan={12}>Average</th>

                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th></th>
                                                <th>L*</th>
                                                <th>a*</th>
                                                <th>b*</th>
                                                <th>C*</th>
                                                <th>Hue</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowSpan={2} className="text-center align-middle fw-bold  ">{activeSwatch?.swatch_name}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td>{averageData?.L?.toFixed(2)}</td>
                                                <td>{averageData?.A?.toFixed(2)}</td>
                                                <td>{averageData?.B?.toFixed(2)}</td>
                                                <td>{averageData?.Chroma_c?.toFixed(2)}</td>
                                                <td>{averageData?.Hue_angle?.toFixed(2)}</td>
                                                <td></td>
                                                <td></td>
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
