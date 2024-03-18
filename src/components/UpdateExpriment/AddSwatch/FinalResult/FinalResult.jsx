import { useEffect } from 'react';
import s from './FinalResult.module.scss';
import cx from 'classnames';
import { getExpSummary } from '../../../../store/features/updateExpriment';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/Loader/Loader';

export default function FinalResult() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExpSummary());
    }, []);

    const finalResult = useSelector((state) => state?.updateExperiment?.finalResult);
    const noOfWashes = useSelector((state) => state?.updateExperiment?.washCount);

    // const colorDifferenceColSpan = noOfWashes * 2;
    // const percentChangeColSpan = noOfWashes *2;




    const swatches = Object.keys(finalResult !== null && finalResult?.del1976?.entries).map((item) => item);

    const isLoadingFinalResult = useSelector(
        (state) => state?.updateExperiment?.isLoadingFinalResult
    );

    return (
        <Loader show={isLoadingFinalResult}>
            {finalResult !== null ? (
                Object?.keys(finalResult)?.map((key) => {
                    const meanValues = finalResult[key]?.mean;
                    const stdValues = finalResult[key]?.std_dev;

                    const availableWashNumbers = Object.keys(finalResult)
                        .flatMap(key => Object.keys(finalResult[key]?.entries).map(entry => finalResult[key]?.entries[entry]))
                        .flatMap(entry => Object.keys(entry))
                        .filter(key => key.startsWith('wash'))
                        .map(key => key.match(/\d+/)[0])
                        .reduce((uniqueWashes, wash) => uniqueWashes.includes(wash) ? uniqueWashes : [...uniqueWashes, wash], [])
                        .sort((a, b) => parseInt(a) - parseInt(b));

                    const washHeaders = availableWashNumbers.map(washNumber => `Wash ${washNumber}`);

                    return (
                        <table className={cx('table', 'text-center')} key={key}>
                            <thead>
                                <tr >
                                    <th colSpan={washHeaders?.length + 2}>Color Difference {key}</th>
                                    <th colSpan={(washHeaders?.length + 2 ) * 2}>% Change</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <th>After Coloring</th>
                                    {washHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                    {washHeaders.map((header, index) => (
                                        <th key={index}>{`${header} % change`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody key={key}>
                                {swatches.map((id) => (
                                    <tr key={id}>
                                        <td className='fw-semibold'>{finalResult[key]?.entries[id]?.swatch_name}</td>
                                        <td>{finalResult[key]?.entries[id]?.after_coloring?.toFixed(2)}</td>
                                        {washHeaders.map((washHeader, index) => (
                                            <td key={index}>
                                                {finalResult[key]?.entries[id][`wash${availableWashNumbers[index]}`] !== undefined ?
                                                    finalResult[key]?.entries[id][`wash${availableWashNumbers[index]}`].toFixed(2) : "-"}
                                            </td>
                                        ))}
                                        {washHeaders.map((washHeader, index) => (
                                            <td key={index}>
                                                {finalResult[key]?.entries[id][`wash${availableWashNumbers[index]}percentage`] !== undefined ?
                                                    finalResult[key]?.entries[id][`wash${availableWashNumbers[index]}percentage`].toFixed(2) : "-"}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                <tr>
                                    <td className='fw-semibold'>Mean</td>
                                    <td>{meanValues?.after_coloring?.toFixed(2)}</td>
                                    {washHeaders.map((_, index) => (
                                        <td key={index}>{meanValues[`wash${availableWashNumbers[index]}`]?.toFixed(2)}</td>
                                    ))}
                                    {washHeaders.map((_, index) => (
                                        <td key={index}>{meanValues[`wash${availableWashNumbers[index]}percentage`]?.toFixed(2)}</td>
                                    ))}

                                </tr>
                                <tr>
                                    <td className='fw-semibold'>STD</td>
                                    <td>{stdValues?.after_coloring?.toFixed(2)}</td>
                                    {washHeaders.map((_, index) => (
                                        <td key={index}>{stdValues[`wash${availableWashNumbers[index]}`]?.toFixed(2)}</td>
                                    ))}
                                    {washHeaders.map((_, index) => (
                                        <td key={index}>{stdValues[`wash${availableWashNumbers[index]}percentage`]?.toFixed(2)}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    );
                })
            ) : ""
            }
        </Loader>
    );
}
