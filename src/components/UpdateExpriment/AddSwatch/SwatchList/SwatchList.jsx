import { ReactSVG } from "react-svg";
import addFileIcon from "../../../../assets/svg/addFile.svg";
import s from "./SwatchList.module.scss";
import cx from "classnames"
import Draggable from "react-draggable";
import { useState } from "react";
import AddSwatch from "./AddSwatch/AddSwatch";
import { updateCurrentSwatch, updateSwatchAdd, updateSwatchPosition, deleteSwatch, updateSwatches, updateSwatch } from "../../../../store/features/updateExpriment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader"
import DropDownMenu from "../../../common/DropDownMenu/DropDownMenu";
export default function SwatchList() {


    const dispatch = useDispatch();

    const isAddingSwatch = useSelector(state => state?.updateExperiment?.isAddingNewSwatch)
    const swatches = useSelector(state => state?.updateExperiment?.swatches)
    const isSwatchesLoading = useSelector((state) => state?.updateExperiment?.isSwatchesLoading);
    const activeSwatch = useSelector((state) => state?.updateExperiment?.activeSwatch?.swatch_id);


    const handleDrag = (index, newPriority) => {
        dispatch(updateSwatchPosition({ index, newPriority }))
        // const updatedSwatches = [...swatches];
        // console.log("ddddddddddddd", updateSwatches)

        // let existingDataIndex = updatedSwatches.findIndex(d => d.currentPosition === newPriority)
        // updatedSwatches[existingDataIndex].currentPosition = updatedSwatches[index].currentPosition;
        // updatedSwatches[index].currentPosition = newPriority;

        // dispatch(updateSwatches(updatedSwatches));
    }

    const getVerticalPos = (todo) => {
        // console.table(todo)
        // alert(`${todo.currentPosition} ${todo.priority}`)

        if (+todo.priority == +todo.currentPosition)
            return 0;

        let dd = todo.currentPosition - todo.priority;

        return dd * 50;
    }

    const handleNewSwatchClick = () => {
        dispatch(updateSwatchAdd(true))
    }

    const handleSwatchDelete = ( swatchId ) => {
        dispatch(deleteSwatch(swatchId));
    }


    const handleSwatchClick = (swatch) => {
        dispatch(updateSwatch(swatch));
    }

    return (
        <div className={s.parent}>
            <div className={cx("d-flex justify-content-between gap-5 py-3 px-4", s.titleBatch)}>
                <div className={s.title2}>Swatches</div>
                <div className={s.linkTextPrimary} onClick={handleNewSwatchClick} role="button"><ReactSVG src={addFileIcon} />New swatch</div>
            </div>
            {isAddingSwatch ? <div>
                <AddSwatch />
            </div> : ""}
            <Loader show={isSwatchesLoading}>
                <div className={s.dragContainer} style={{ position: 'relative', padding: '0', height: `${(swatches.length * 50) + 1}px` }}>
                    {swatches.map((swatch, index) => {
                        // console.table(swatch);
                        const y = getVerticalPos({ ...swatch });
                        return <Draggable
                            key={swatch.priority}
                            axis="y" 
                            defaultPosition={{ x: 0, y: 0 }}
                            position={{ x: 0, y }}
                            bounds="parent"
                            onStop={(e, ui) => {
                                // let pos = (ui.y >= 0) ? ui.y : 0
                                const newPriority = swatch.priority + Math.round(ui.y / 50); // Adjust the division based on your layout
                                // alert(`${pos} ${ui.y} ${newPriority}`)
                                // console.log(ui.y, newPriority)
                                handleDrag(index, newPriority);
                            }}
                        >
                            <div 
                             className={cx(s.swatchItem, { [s.active]: activeSwatch === swatch?.swatch_id })}
                                onClick={() => handleSwatchClick(swatch)}
                            >
                                {swatch.swatch_name}
                                {console.log(swatch, "swatch data")}
                                <DropDownMenu
                                    deleteHandle={() => handleSwatchDelete( swatch?.swatch_id)}
                                />
                            </div>
                        </Draggable>
                    })}
                </div>
            </Loader>
            {/* <div className="box" style={{ position: 'relative', overflow: 'auto', padding: '0' }}>
                {/* <div style={{ height: '1000px', width: '1000px', padding: '10px' }}> */}
            {/* <Draggable
                axis="y"
                // defaultPosition={{ x: 0, y: 10 }}
                position={{ x: 0, y: 0 }}
                scale={1}
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
                bounds="parent"
            >

                <div className={s.swatchItem}>I can now be moved around!</div>
            </Draggable>
            <Draggable
                axis="y"
                bounds="parent"
                // defaultPosition={{ x: 0, y: 10 }}
                // position={{ x: 0, y: 0 }}
                scale={1}
                onStart={handleStart}
                onDrag={handleDrag}
                onStop={handleStop}
            >

                <div className={s.swatchItem}>I can now be moved around!</div>
            </Draggable> */}
            {/* </div> */}
            {/* </div> */}
        </div >
    )
}