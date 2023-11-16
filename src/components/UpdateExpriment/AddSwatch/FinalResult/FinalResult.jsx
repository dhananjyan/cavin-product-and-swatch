import { useEffect } from 'react';
import s from './FinalResult.module.scss';

import cx from "classnames"
import { getFinalResult } from '../../../../store/features/updateExpriment';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import LineChart from '../../../common/LineChart/LineChart';

export default function FinalResult() {

    const [headerList, setHeaderList] = useState([]);

    const [back, setBack] = useState({
        x: [],
        y: []
    });

    const [front, setFront] = useState({
        x: [],
        y: []
    });

    const dispatch = useDispatch();

    const finalResult = useSelector(state => state?.updateExperiment?.finalResult);

    useEffect(() => {
        dispatch(getFinalResult())
    }, [])

    useEffect(() => {
        if (finalResult) {
            const headerList = Object.keys(finalResult?.swatches?.[0])?.map(item => finalResult?.swatches?.[0]?.[item]?.length)
            const longIndex = headerList.find(item => item == Math.max(...headerList));
            let crtIndex = Object.keys(finalResult?.swatches?.[0])?.[headerList.findIndex(item => item == longIndex)]
            const longHeaderList = finalResult?.swatches?.[0]?.[crtIndex];

            console.log("longHeaderList", longHeaderList)

            const back = {
                x: [],
                y: []
            };
            const front = {
                x: [],
                y: []
            }
            Object.keys(finalResult?.swatches_avg_stdev?.[0]?.Avg)?.flatMap((item, i) => {
                if (item?.includes("wash") && !item?.includes("percentage")) {
                    let washCount = item?.split("_")?.[1];
                    console.log("item", item, washCount, finalResult?.swatches_avg_stdev?.[0]?.Avg?.[`${item}_percentage`])

                    back.x.push(+washCount)
                    front.x.push(+washCount)

                    back.y.push(+finalResult?.swatches_avg_stdev?.[0]?.Avg?.[`${item}_percentage`]?.back)
                    front.y.push(+finalResult?.swatches_avg_stdev?.[0]?.Avg?.[`${item}_percentage`]?.front)
                }
            });
            setBack(back);
            setFront(front);
            console.log(back, front)
            setHeaderList(longHeaderList)
        }
    }, [finalResult])



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
                                {headerList?.map((item, i) => {
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
                                    {headerList?.map((headItem, ind) => {
                                        if (headItem?.steps == 3) {
                                            let data = finalResult?.swatches?.[0]?.[item]?.find(item => item?.wash_count == headItem?.wash_count)
                                            console.log("finalResult", data)
                                            console.table({
                                                item,
                                                washCount: headItem?.wash_count
                                            })
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
                    {front?.x ? <LineChart x={front.x} y={front.y} /> : ""}

                    <h4>Back</h4>
                    <table className={cx("table text-center")}>
                        <thead>
                            <tr>
                                <th>Tress No</th>
                                <th>DE after coloring</th>
                                {headerList?.map((item, i) => {
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
                                    {headerList?.map((headItem, ind) => {
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
                    {(back?.x && back?.y) ? <LineChart x={back.x} y={back.y} /> : ""}
                </>
                    : ""
            }
        </div>
    )
}
