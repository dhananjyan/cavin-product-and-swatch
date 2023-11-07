import { useEffect, useRef, useState } from "react";
import { ReactSVG } from 'react-svg';

import cx from "classnames";
import s from "./SelectBox.module.scss";

import downArrow from "../../../assets/svg/downArrow.svg";
import searchIcon from "../../../assets/svg/search.svg";
import useDebounce from "../../../hooks/useDebounce";

export default function SelectBox(props) {
    const { options = [], placeholder, className, value: selectedList = [], onOpen = () => { }, onChange = () => { }, name, isMultiSelect = false, onClose = () => { }, zIndex = "10001" } = props;
    const popupRef = useRef();
    const selectRef = useRef();
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isOpen, setIsOpen] = useState(false);
    const [filterValue, setFilterValue] = useDebounce(null, 300);

    function handleSelectBoxClick(e) {
        if (popupRef.current && popupRef.current.contains(e.target)) {
        } else {
            setIsOpen(v => {
                if (v) {
                    onClose()
                    setFilterValue(null)
                } else {
                    setTimeout(() => {
                        onOpen();
                    }, 100);
                }
                return !v
            })
        }
    }

    useEffect(() => {
        setFilteredOptions(options)
    }, [JSON.stringify(options)])


    useEffect(() => {
        if (filterValue && String(filterValue)?.trim()) {
            setFilteredOptions(options?.filter(item => String(item.label)?.toLowerCase()?.includes(String(filterValue)?.toLowerCase())))
        } else {
            setFilteredOptions(options)
        }
    }, [filterValue])

    function handleInputChange(e) {
        setFilterValue(e.target.value)
    }

    const handleCheckboxChange = (item) => {
        // let sortedSelectedList = [...selectedList]?.sort();
        // let sortedUpdatedList = [...selectedList, item].sort();
        // setSelectedList(list => {
        let newValue = [...selectedList];
        if (!isMultiSelect)
            newValue = [item?.value];
        else if (!selectedList?.includes(item?.value))
            newValue.push(item?.value);
        else
            newValue = newValue.filter(data => data != item?.value)
        if (typeof onChange == "function") onChange({ field: name, value: newValue, item })
        // return newValue;
        // })
        if (!isMultiSelect) {
            setIsOpen(false);
            setFilteredOptions(options)
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target)
            ) {
                if (!selectRef.current || !selectRef.current.contains(event.target)) {
                    setIsOpen(false);
                    if (typeof onClose === "function") {
                        onClose();
                        setFilterValue(null)
                    }
                }
            }
        };
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    return (
        <div className={cx(s.selectBox, { [s.isOpen]: isOpen }, className)} tabIndex="0" ref={selectRef} onClick={handleSelectBoxClick} >

            {!selectedList?.length ?
                <div>{placeholder ? placeholder : "Please Select..."}</div> :
                <div className={s.placeholder}>{selectedList?.map((item, i) => {
                    return i == 0 ? item : `, ${item}`
                })}</div>}

            <ReactSVG className={s.dropdownArrow} src={downArrow} />
            {
                isOpen ? <div className={s.popup} style={{ zIndex }} ref={popupRef} >
                    <div className={s.searchInputContainer}>
                        <ReactSVG src={searchIcon} />
                        <input placeholder="Search" onChange={handleInputChange} />
                    </div>

                    {filteredOptions?.length ? filteredOptions.map((item, i) => {
                        return (<div key={`FILTERED_OPTION_ITEM_${i}`} className={s.multiSelectField}>
                            <input type="checkbox" onChange={e => handleCheckboxChange(item)} checked={selectedList?.includes(item?.value)} className={s.checkbox} />
                            <div onClick={() => handleCheckboxChange(item)}>{item.label}</div>
                        </div>);
                    }) : <div className="text-center py-2">No match</div>}

                </div> : ""
            }
        </div >
    )
}
