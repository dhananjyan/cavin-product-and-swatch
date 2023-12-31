import cx from "classnames";
import s from "./AddContributors.module.scss";
import { ReactSVG } from "react-svg";
import addUserIcon from "../../assets/svg/addUser.svg";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchInput from "../common/SearchInput/SearchInput";
import { getContributorsList } from "../../store/features/products";
import UserAvatar from "../common/UserAvatar/UserAvatar";

export default function AddContributors(props) {
    const { onChange, contributors } = props;
    const [addContributors, setAddContributors] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedContributors, setSelectedContributors] = useState([]);
    const [showContributors, setShowContributors] = useState(false)
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
    }, []);
    const contributorsData = useSelector((state) => state.products.contributorsData);

    function getInitials(fullName) {
        const name = fullName?.split(" ");
        if (name.length >= 2) {
            return name[0][0].toUpperCase() + name[1][0].toUpperCase();
        } else if (name.length === 1) {
            return name[0][0].toUpperCase();
        } else {
            return "";
        }
    }

    const filteredContributors = contributorsData.filter((item) =>
        item.contributor_name?.toLowerCase()?.includes(search.toLowerCase())
    );

    const handleCheckboxChange = (contributorId) => {
        setSelectedContributors((prevSelected) => {
            if (prevSelected.includes(contributorId)) {
                return prevSelected.filter((id) => id !== contributorId);
            } else {
                return [...prevSelected, contributorId];
            }
        });
        // setShowContributors(false);
    };

    const selectedContributorNames = contributorsData
        .filter(item => contributors.includes(item?.contributor_id))
        .map(selected => getInitials(selected.contributor_name));

    const handleApplyClick = () => {
        onChange(selectedContributors)
        setAddContributors(false);
    };

    return (
        <div className="mb-5">
            <div className={cx(s.title2, "pt-5")}>Contributors</div>
            {/* <p className={cx(s.text, "pt-2")}>Placeholder text comes here....</p> */}
            <div className={cx("d-flex gap-2 align-items-center", s.popupText)}>
                <ReactSVG src={addUserIcon} />
                <span className={s.linkTextPrimary} onClick={() => setAddContributors(true)}>
                    Add contributors
                </span>

                {addContributors && (
                    <div className={cx(s.popup, s.addContributorPopup)} ref={popupRef}>
                        <div>
                            <div className={cx(s.addConText)}>Add Contributor</div>
                            <div className={cx("px-2")}>
                                <SearchInput
                                    placeholder="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto">
                            {filteredContributors?.length > 0 &&
                                filteredContributors?.map((item) => (
                                    <div key={item.id} className="d-flex pt-3 ps-2 align-items-center">
                                        <div>
                                            <input
                                                type="checkbox"
                                                className={cx(s.contributorCheckbox, "mx-2")}
                                                onChange={() => handleCheckboxChange(item.contributor_id)}
                                                checked={selectedContributors.includes(item.contributor_id)}
                                            />
                                        </div>
                                        <div className={cx(s.userNameAvatar, "mx-2")}>
                                            {getInitials(item.contributor_name)}
                                        </div>
                                        <div className={s.contributorName}>{item.contributor_name}</div>
                                    </div>
                                ))}
                        </div>
                        <div className={s.buttons}>
                            <button onClick={(() => setSelectedContributors([]))}>Clear</button>
                            <button type="submit" className="text-white" onClick={handleApplyClick}>
                                Apply
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {contributors && <div className="mt-3">
                <UserAvatar item={selectedContributorNames} />
            </div>}
        </div>
    );
}
