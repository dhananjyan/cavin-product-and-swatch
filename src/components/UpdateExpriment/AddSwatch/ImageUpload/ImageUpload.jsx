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
        console.log("check this", from, f, file);
        console.log(f[0],file,"line 35");
        dispatch(updateCurrentImage(file));
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

    const finalResult = {
        "experiment_id": 1,
        "experiment_name": "skincare",
        "group_id": 1,
        "group_name": "Group 1",
        "product_name": "chick",
        "swatches": [
            {
                "4": [
                    {
                        "row_id": 8,
                        "steps": 1,
                        "swatch_name": "Swatch 4",
                        "wash_count": 0
                    },
                    {
                        "back": {
                            "DE_after_coloring": 17
                        },
                        "front": {
                            "DE_after_coloring": 12
                        },
                        "row_id": 9,
                        "steps": 2,
                        "swatch_name": "Swatch 4",
                        "wash_count": 0
                    },
                    {
                        "back": {
                            "wash_1": 14,
                            "wash_1_percentage": 81
                        },
                        "front": {
                            "wash_1": 6,
                            "wash_1_percentage": 53
                        },
                        "row_id": 10,
                        "steps": 3,
                        "swatch_name": "Swatch 4",
                        "wash_count": 1
                    },
                    {
                        "back": {
                            "wash_2": 20,
                            "wash_2_percentage": 117
                        },
                        "front": {
                            "wash_2": 5,
                            "wash_2_percentage": 40
                        },
                        "row_id": 11,
                        "steps": 3,
                        "swatch_name": "Swatch 4",
                        "wash_count": 2
                    },
                    {
                        "back": {
                            "wash_3": 15,
                            "wash_3_percentage": 87
                        },
                        "front": {
                            "wash_3": 20,
                            "wash_3_percentage": 163
                        },
                        "row_id": 12,
                        "steps": 3,
                        "swatch_name": "Swatch 4",
                        "wash_count": 3
                    },
                    {
                        "back": {
                            "wash_4": 18,
                            "wash_4_percentage": 109
                        },
                        "front": {
                            "wash_4": 19,
                            "wash_4_percentage": 159
                        },
                        "row_id": 13,
                        "steps": 3,
                        "swatch_name": "Swatch 4",
                        "wash_count": 4
                    },
                    {
                        "back": {
                            "wash_5": 18,
                            "wash_5_percentage": 108
                        },
                        "front": {
                            "wash_5": 19,
                            "wash_5_percentage": 158
                        },
                        "row_id": 14,
                        "steps": 3,
                        "swatch_name": "Swatch 4",
                        "wash_count": 5
                    }
                ],
                "5": [
                    {
                        "row_id": 15,
                        "steps": 1,
                        "swatch_name": "Swatch 5",
                        "wash_count": 0
                    },
                    {
                        "back": {
                            "DE_after_coloring": 13
                        },
                        "front": {
                            "DE_after_coloring": 18
                        },
                        "row_id": 16,
                        "steps": 2,
                        "swatch_name": "Swatch 5",
                        "wash_count": 0
                    },
                    {
                        "back": {
                            "wash_1": 5,
                            "wash_1_percentage": 40
                        },
                        "front": {
                            "wash_1": 0,
                            "wash_1_percentage": 0
                        },
                        "row_id": 17,
                        "steps": 3,
                        "swatch_name": "Swatch 5",
                        "wash_count": 1
                    },
                    {
                        "back": {
                            "wash_2": 14,
                            "wash_2_percentage": 104
                        },
                        "front": {
                            "wash_2": 18,
                            "wash_2_percentage": 100
                        },
                        "row_id": 18,
                        "steps": 3,
                        "swatch_name": "Swatch 5",
                        "wash_count": 2
                    }
                ]
            }
        ],
        "swatches_avg_stdev": [
            {
                "Avg": {
                    "DE_after_coloring": {
                        "back": 15,
                        "front": 15
                    },
                    "wash_1": {
                        "back": 9,
                        "front": 3
                    },
                    "wash_1_percentage": {
                        "back": 61,
                        "front": 26
                    },
                    "wash_2": {
                        "back": 17,
                        "front": 11
                    },
                    "wash_2_percentage": {

                        "back": 111,
                        "front": 70
                    },
                    "wash_3": {
                        "back": 15,
                        "front": 20
                    },
                    "wash_3_percentage": {
                        "back": 87,
                        "front": 163
                    },
                    "wash_4": {
                        "back": 18,
                        "front": 19
                    },
                    "wash_4_percentage": {
                        "back": 109,
                        "front": 159
                    },
                    "wash_5": {
                        "back": 18,
                        "front": 19
                    },
                    "wash_5_percentage": {
                        "back": 108,
                        "front": 158
                    }
                },
                "Stdev": {
                    "DE_after_coloring": {
                        "back": 3,
                        "front": 4
                    },
                    "wash_1": {
                        "back": 6,
                        "front": 4
                    },
                    "wash_1_percentage": {
                        "back": 29,
                        "front": 37
                    },
                    "wash_2": {
                        "back": 4,
                        "front": 9
                    },
                    "wash_2_percentage": {
                        "back": 9,
                        "front": 42
                    },
                    "wash_3": {
                        "back": 0,
                        "front": 0
                    },
                    "wash_3_percentage": {
                        "back": 0,
                        "front": 0
                    },
                    "wash_4": {
                        "back": 0,
                        "front": 0
                    },
                    "wash_4_percentage": {
                        "back": 0,
                        "front": 0
                    },
                    "wash_5": {
                        "back": 0,
                        "front": 0
                    },
                    "wash_5_percentage": {
                        "back": 0,
                        "front": 0
                    }
                }
            }
        ]
    }

    const headerList = Object.keys(finalResult?.swatches?.[0])?.map(item => finalResult?.swatches?.[0]?.[item]?.length)
    const longIndex = headerList.find(item => item == Math.max(...headerList));
    let crtIndex = Object.keys(finalResult?.swatches?.[0])?.[headerList.findIndex(item => item == longIndex)]
    const longHeaderList = finalResult?.swatches?.[0]?.[crtIndex]
    console.log("asdlkfjlkajsdfkjakdf", longHeaderList)

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
                                    {(!frontImage?.preview && !activeSwatch?.front_image_url) ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "front")}>
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
                                    {(!backImage?.preview && !activeSwatch?.back_image_url) ? <Dropzone className={s.dropzone} onChange={f => onImageChange(f, "back")}>
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
                        </> : <div>
                            {
                                finalResult?.swatches?.length ? <>
                                    <h4>Front</h4>
                                    <table className={cx("table text-center")}>
                                        <thead>
                                            <tr>
                                                <th>Tress No</th>
                                                <th>DE after coloring</th>
                                                {longHeaderList?.map((item, i) => {
                                                    if (item?.steps == 3)
                                                        return <>
                                                            <th key={`front_DYNAMIC_HEADER_ITEM_${i}_wash`}>DE Wash {item?.wash_count}</th>
                                                            <th key={`front_DYNAMIC_HEADER_ITEM_${i}_percent`}>% Change</th>
                                                        </>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(finalResult?.swatches?.[0])?.map((item, i) => {
                                                return <tr>
                                                    <td>{finalResult?.swatches?.[0]?.[item]?.[0]?.swatch_name}</td>
                                                    <td>{finalResult?.swatches?.[0]?.[item]?.[1]?.front?.DE_after_coloring}</td>
                                                    {longHeaderList?.map((headItem, ind) => {
                                                        if (headItem?.steps == 3) {
                                                            let data = finalResult?.swatches?.[0]?.[item]?.find(item => item?.wash_count == headItem?.wash_count)
                                                            return <>
                                                                <td key={`front_DYNAMIC_HEADER_ITEM_${i}_wash_value_${ind}`}>{data?.front?.[`wash_${headItem?.wash_count}`]}</td>
                                                                <td key={`front_DYNAMIC_HEADER_ITEM_${i}_percent_value_${ind}`}>{data?.front?.[`wash_${headItem?.wash_count}_percentage`]}</td>
                                                            </>
                                                        }
                                                    })}
                                                </tr>
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>AVG</th>
                                                {Object.keys(finalResult?.swatches_avg_stdev?.[0]?.Avg)?.map((item, i) => {
                                                    return <th key={`FRONT_FOOTER_ITEM_${i}`}>{finalResult?.swatches_avg_stdev?.[0]?.Avg?.[item]?.front}</th>
                                                })}
                                            </tr>
                                            <tr>
                                                <th>SD</th>
                                                {Object.keys(finalResult?.swatches_avg_stdev?.[0]?.Stdev)?.map((item, i) => {
                                                    return <th key={`FRONT_FOOTER_ITEM_${i}`}>{finalResult?.swatches_avg_stdev?.[0]?.Stdev?.[item]?.front}</th>
                                                })}
                                            </tr>
                                        </tfoot>
                                    </table>

                                    <h4>Back</h4>
                                    <table className={cx("table text-center")}>
                                        <thead>
                                            <tr>
                                                <th>Tress No</th>
                                                <th>DE after coloring</th>
                                                {longHeaderList?.map((item, i) => {
                                                    if (item?.steps == 3)
                                                        return <>
                                                            <th key={`back_DYNAMIC_HEADER_ITEM_${i}_wash`}>DE Wash {item?.wash_count}</th>
                                                            <th key={`back_DYNAMIC_HEADER_ITEM_${i}_percent`}>% Change</th>
                                                        </>
                                                })}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(finalResult?.swatches?.[0])?.map((item, i) => {
                                                return <tr>
                                                    <td>{finalResult?.swatches?.[0]?.[item]?.[0]?.swatch_name}</td>
                                                    <td>{finalResult?.swatches?.[0]?.[item]?.[1]?.back?.DE_after_coloring}</td>
                                                    {longHeaderList?.map((headItem, ind) => {
                                                        if (headItem?.steps == 3) {
                                                            let data = finalResult?.swatches?.[0]?.[item]?.find(item => item?.wash_count == headItem?.wash_count)
                                                            return <>
                                                                <td key={`back_DYNAMIC_HEADER_ITEM_${i}_wash_value_${ind}`}>{data?.back?.[`wash_${headItem?.wash_count}`]}</td>
                                                                <td key={`back_DYNAMIC_HEADER_ITEM_${i}_percent_value_${ind}`}>{data?.back?.[`wash_${headItem?.wash_count}_percentage`]}</td>
                                                            </>
                                                        }
                                                    })}
                                                </tr>
                                            })}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <th>AVG</th>
                                                {Object.keys(finalResult?.swatches_avg_stdev?.[0]?.Avg)?.map((item, i) => {
                                                    return <th key={`BACK_FOOTER_ITEM_${i}`}>{finalResult?.swatches_avg_stdev?.[0]?.Avg?.[item]?.back}</th>
                                                })}
                                            </tr>
                                            <tr>
                                                <th>SD</th>
                                                {Object.keys(finalResult?.swatches_avg_stdev?.[0]?.Avg)?.map((item, i) => {
                                                    return <th key={`BACK_FOOTER_ITEM_${i}`}>{finalResult?.swatches_avg_stdev?.[0]?.Stdev?.[item]?.back}</th>
                                                })}
                                            </tr>
                                        </tfoot>
                                    </table>
                                </>
                                    : ""
                            }
                        </div>}
                    </div>
                </Loader>
                <Bottombar />
            </div> : ""}
        </>
    )
}
