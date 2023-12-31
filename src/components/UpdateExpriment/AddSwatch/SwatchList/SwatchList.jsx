import { ReactSVG } from "react-svg";
import addFileIcon from "../../../../assets/svg/addFile.svg";
import s from "./SwatchList.module.scss";
import cx from "classnames"
import Draggable from "react-draggable";
import { useState } from "react";
import AddSwatch from "./AddSwatch/AddSwatch";
import { updateCurrentSwatch, updateSwatchAdd, updateSwatchPosition, deleteSwatch, updateSwatches, updateSwatch, editSwatch, updateSwatchName, updateCurrentStep, updateIsAddSwatchLoading } from "../../../../store/features/updateExpriment";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../common/Loader/Loader"
import DropDownMenu from "../../../common/DropDownMenu/DropDownMenu";
import TickIcon from "../../../../assets/svg/tickIcon.svg"
import closeIcon from "../../../../assets/svg/close.svg"
export default function SwatchList() {

    const dispatch = useDispatch();

    const isAddingSwatch = useSelector(state => state?.updateExperiment?.isAddingNewSwatch)
    const swatches = useSelector(state => state?.updateExperiment?.swatches)
    const isSwatchesLoading = useSelector((state) => state?.updateExperiment?.isSwatchesLoading);
    const activeSwatch = useSelector((state) => state?.updateExperiment?.activeSwatch?.swatch_id);

    const [editingSwatchId, setEditingSwatchId] = useState(null);

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

    const handleSwatchDelete = (swatchId) => {
        dispatch(deleteSwatch(swatchId));
    }


    const handleSwatchClick = async (swatch) => {
        dispatch(updateIsAddSwatchLoading(true))
        const result = await dispatch(updateSwatch(swatch));
        await dispatch(updateCurrentStep(+result?.[result?.length - 1]?.steps || 1))
        dispatch(updateIsAddSwatchLoading(false))

    }

    const handleSwatchSave = (swatchId, newSwatchName) => {
        dispatch(editSwatch({ swatchId, swatchName: newSwatchName }));
        setEditingSwatchId(null);
    };

    return (
        <div className={s.parent}>
            <div className={cx("d-flex justify-content-between gap-5 py-3 px-4", s.titleBatch)}>
                <div className={s.title2}>Swatches</div>
                <div className={s.linkTextPrimary} onClick={handleNewSwatchClick} role="button"><ReactSVG src={addFileIcon} />New swatch</div>
            </div>
            {isAddingSwatch ? <div className={s.AddswatchItem}>
                <AddSwatch />
            </div> : ""}
            <Loader show={isSwatchesLoading}>
                <div className={s.dragContainer} style={{ position: 'relative', padding: '0', height: `${(swatches.length * 50) + 1}px` }}>
                    {swatches.map((swatch, index) => {
                        // console.table(swatch);
                        const y = getVerticalPos({ ...swatch });
                        return (
                            <Draggable
                                key={swatch.priority}
                                axis="y"
                                defaultPosition={{ x: 0, y: 0 }}
                                position={{ x: 0, y: getVerticalPos({ ...swatch }) }}
                                bounds="parent"
                                onStop={(e, ui) => {
                                    const newPriority = swatch.priority + Math.round(ui.y / 50);
                                    handleDrag(index, newPriority);
                                }}
                            >
                                <div
                                    className={cx(s.swatchItem, { [s.active]: activeSwatch === swatch?.swatch_id })}

                                >
                                    {editingSwatchId === swatch.swatch_id ? (
                                        <div className={s.swatchEdit}>
                                            <input
                                                className={cx()}
                                                type="text"
                                                value={swatch.swatch_name}
                                                onChange={(e) => dispatch(updateSwatchName({ swatchId: swatch.swatch_id, newName: e.target.value }))}
                                            />
                                            <button onClick={() => handleSwatchSave(swatch.swatch_id, swatch.swatch_name)}>Save</button>
                                            {/* <ReactSVG src={TickIcon}  onClick={() => handleSwatchSave(swatch.swatch_id, swatch.swatch_name)} />
                                            <ReactSVG src={closeIcon} onClick={()=>setEditingSwatchId(null)}/> */}
                                        </div>

                                    ) : (
                                        <>
                                            <div role="button" className={cx(s.swatchName, "flex-fill")} onClick={() => handleSwatchClick(swatch)}>{swatch.swatch_name}</div>
                                            <DropDownMenu
                                                className={s.swatchMenu}
                                                deleteHandle={() => handleSwatchDelete(swatch?.swatch_id)}
                                                editHandle={() => setEditingSwatchId(swatch?.swatch_id)}
                                            />
                                        </>
                                    )}
                                </div>
                            </Draggable>

                        )
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