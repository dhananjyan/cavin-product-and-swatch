import cx from "classnames";
import s from "./AddContributors.module.scss";
import { ReactSVG } from "react-svg";
import addUserIcon from "../../assets/svg/addUser.svg";
import { useState, useRef, useEffect } from "react";
import SearchInput from "../common/SearchInput/SearchInput";

export default function AddContributors() {
    const [addContributors, setAddContributors] = useState(false);
    const popupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setAddContributors(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="mb-5">
            <div className={cx(s.title2, "pt-5")}>Contributors</div>
            <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p>
            <div
                className={cx("d-flex gap-2 align-items-center", s.linkTextPrimary)}
                onClick={() => setAddContributors(true)}
            >
                <ReactSVG src={addUserIcon} />
                Add contributors
            </div>
            {addContributors && (
                <div className={cx(s.addContributorPopup)} ref={popupRef}>
                    <span className={cx(s.addConText)}>Add Contributor</span>
                    <div className={cx("pt-3 px-2")}>
                    <SearchInput placeholder="Search" />
                </div>
                </div>
                
            )}
        </div>
    );
}
