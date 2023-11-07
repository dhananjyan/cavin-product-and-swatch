import cx from "classnames";
import s from "./AddContributors.module.scss";
import { ReactSVG } from "react-svg";
import addUserIcon from "../../assets/svg/addUser.svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../common/SearchInput/SearchInput";
import { getContributorsList } from "../../store/features/products";

export default function AddContributors() {
    const [addContributors, setAddContributors] = useState(false);
    const popupRef = useRef(null);

    const dispatch = useDispatch();

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

    useEffect(() => {
        dispatch(getContributorsList());
    }, [])

    const contributorsData = useSelector((state) => state.products.contributorsData);
    console.log(contributorsData, "contributorsData");


    function getInitials(fullName) {
        const name = fullName.split(' ');
        if (name.length >= 2) {
            return name[0][0] + name[1][0];
        } else if (name.length === 1) {
            return name[0][0];
        } else {
            return '';
        }
    }

    return (
        <div className="mb-5">
            <div className={cx(s.title2, "pt-5")}>Contributors</div>
            <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p>
            <div
                className={cx("d-flex gap-2 align-items-center", s.linkTextPrimary, s.popupText)}
                onClick={() => setAddContributors(!addContributors)}
            >
                <ReactSVG src={addUserIcon} />
                Add contributors

                {addContributors && (
                    <div className={cx(s.popup, s.addContributorPopup)} ref={popupRef}>
                        <div>
                            <div className={cx(s.addConText)}>Add Contributor</div>
                            <div className={cx("px-2")}>
                                <SearchInput placeholder="Search" />
                            </div>
                        </div>
                        <div className="overflow-y-auto">
                            {contributorsData?.length > 0 && contributorsData.map((item) => (
                                <>
                                    <div className="d-flex pt-3 ps-2 align-items-center">
                                        <div><input type="checkbox" className={cx(s.contributorCheckbox, "mx-2")} /></div>
                                        <div className={cx(s.userNameAvatar, "mx-2")}>{getInitials(item.contributor_name)}</div>
                                        <div>{item.contributor_name}</div>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className={s.buttons}>
                            <button>Clear</button>
                            <button type="submit" className="text-white">Apply</button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}