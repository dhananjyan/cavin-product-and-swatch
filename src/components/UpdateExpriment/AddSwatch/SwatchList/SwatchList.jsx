import { ReactSVG } from "react-svg";
import addFileIcon from "../../../../assets/svg/addFile.svg";
import s from "./SwatchList.module.scss";
import cx from "classnames"
import Draggable from "react-draggable";
import { useState } from "react";
import AddSwatch from "./AddSwatch/AddSwatch";
export default function SwatchList() {
    const [todos, setTodos] = useState([
        { id: 1, text: 'Swatch 1', priority: 1, currentPosition: 5 },
        { id: 2, text: 'Swatch 2', priority: 2, currentPosition: 2 },
        { id: 3, text: 'Swatch 3', priority: 3, currentPosition: 3 },
        { id: 4, text: 'Swatch 4', priority: 4, currentPosition: 4 },
        { id: 5, text: 'Swatch 5', priority: 5, currentPosition: 1 },
    ]);

    const handleDrag = (index, newPriority) => {
        const updatedTodos = [...todos];

        let existingDataIndex = updatedTodos.findIndex(d => d.currentPosition === newPriority)
        updatedTodos[existingDataIndex].currentPosition = updatedTodos[index].currentPosition;
        updatedTodos[index].currentPosition = newPriority;

        setTodos(updatedTodos);
    }
    const getVerticalPos = (todo) => {
        // console.table(todo)
        // alert(`${todo.currentPosition} ${todo.priority}`)

        if (+todo.priority == +todo.currentPosition)
            return 0;

        let dd = todo.currentPosition - todo.priority;

        return dd * 50;
    }

    return (
        <div className={s.parent}>
            <div className={cx("d-flex justify-content-between gap-5 py-3 px-4", s.titleBatch)}>
                <div className={s.title2}>Swatches</div>
                <div className={s.linkTextPrimary}><ReactSVG src={addFileIcon} />New swatch</div>
            </div>
            <div>
                <AddSwatch />
            </div>
            <div className={s.dragContainer} style={{ position: 'relative', overflow: 'hidden', padding: '0', height: `${(todos.length * 50) + 1}px` }}>
                {todos.map((todo, index) => {
                    // console.table(todo);
                    const y = getVerticalPos(todo);
                    return <Draggable
                        key={todo.id}
                        axis="y"
                        defaultPosition={{ x: 0, y: 0 }}
                        position={{ x: 0, y }}
                        bounds="parent"
                        onStop={(e, ui) => {
                            // let pos = (ui.y >= 0) ? ui.y : 0
                            const newPriority = todo.priority + Math.round(ui.y / 50); // Adjust the division based on your layout
                            // alert(`${pos} ${ui.y} ${newPriority}`)
                            // console.log(ui.y, newPriority)
                            handleDrag(index, newPriority);
                        }}
                    >
                        <div className={s.swatchItem}>{todo.text}</div>
                    </Draggable>
                })}
            </div>
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