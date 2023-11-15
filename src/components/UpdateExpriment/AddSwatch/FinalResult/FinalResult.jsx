import s from './FinalResult.module.scss';

import cx from "classnames"


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

export default function FinalResult() {
    return (
        <div>
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
        </div>
    )
}
