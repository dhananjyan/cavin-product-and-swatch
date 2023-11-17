import cx from "classnames";
import s from "./Products.module.scss";
import plusIcon from "../../assets/svg/plus.svg";
import { ReactSVG } from "react-svg";
import GroupsSideBar from "./GroupsSideBar/GroupsSideBar";
import SearchInput from "../common/SearchInput/SearchInput";
import ActivityList from "./ActivityList/ActivityList";
import NavLinkSideBar from "./NavLinkSideBar/NavLinkSideBar";
import { useEffect } from "react";
import {
    deleteExpirement,
    initializeProductPage,
    updateAddGroupPopupStatus,
} from "../../store/features/products";
import { useDispatch, useSelector } from "react-redux";
import { openAddPopup } from "../../store/features/expriment";
import filterIcon from "../../assets/svg/filter.svg";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DropDownMenu from "../common/DropDownMenu/DropDownMenu";
import Loader from "../common/Loader/Loader";

export default function Products() {
    const dispatch = useDispatch();

    const isModalOpen = useSelector((state) => state.experiment.isModalOpen);
    const isExperimentLoading = useSelector((state) => state.products.isExperimentLoading);
    const groupName = useSelector(state => state?.products?.selectedGroupName)


    const navigate = useNavigate();

    useEffect(() => {
        dispatch(initializeProductPage());
    }, []);


    const totalGroups = useSelector((state) => state?.products?.totalGroup);
    const experimentData = useSelector((state) => state.products.experimentData);

    const openModal = () => dispatch(openAddPopup());

    const handleAddNewGroup = () => {
        dispatch(updateAddGroupPopupStatus(true));
    };

    const handleExpEdit = (data) => {
        console.log("datadata", data)
        navigate(`/experiment/${data?.id ? data?.id : data}`)
    }

    const handleExpDelete = (expId) => {
        dispatch(deleteExpirement(expId));
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            day: "2-digit",
            month: "short",
            year: "numeric",
            // hour: "2-digit",
            // minute: "2-digit",
            // hour12: true,
        };

        return date.toLocaleString("en-US", options);
    }

    function getInitials(fullName) {
        const name = fullName.split(" ");
        if (name.length >= 2) {
            return name[0][0].toUpperCase() + name[1][0].toUpperCase();
        } else if (name.length === 1) {
            return name[0][0].toUpperCase();
        } else {
            return "";
        }
    }

    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }
    

    return (
        <div className={s.productSection}>
            {/* <Filters /> */}
            {/* <Pagination /> */}
            <div className={s.navLinkSidebar}>
                <NavLinkSideBar />
            </div>
            <div className={cx(s.sideHeader)}>
                <div className={cx(s.title4, "pb-2 d-flex align-items-center gap-4")}>
                    <div>Total groups {totalGroups}</div>
                    <div
                        className={cx("d-flex", s.blueText)}
                        role="button"
                        onClick={handleAddNewGroup}
                    >
                        <ReactSVG src={plusIcon} /> New group
                    </div>
                </div>
                <div className={cx("pt-3")}>
                    <SearchInput placeholder="Search group name" />
                </div>
            </div>
            <div
                className={cx(
                    "h-100 d-flex justify-content-center flex-column w-100",
                    s.mainHeader
                )}
            >
                <div
                    className={cx(
                        "d-flex align-items-center justify-content-between pb-3"
                    )}
                >
                    <div className={cx(s.title3, " d-flex align-items-center")}>
                        {groupName}
                    </div>
                    <div className={cx("d-flex align-items-center gap-3")}>
                        <div
                            role="button"
                            onClick={openModal}
                            className={cx(
                                { [s.disabled]: isModalOpen },
                                s.newExpBtn,
                                s.btnPrimary
                            )}
                        >
                            <ReactSVG src={plusIcon} />
                            New experiment
                        </div>
                        <div>
                            {/* <ReactSVG src={filterIcon} /> */}
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-3 w-100">
                    <SearchInput placeholder="Search experiment name, experiment ID, product name, status...."
                    />
                    {/* <SelectBox placeholder="Filters" className={s.filterSelect} /> */}
                </div>
            </div>
            <div className={cx(s.sideHeader, "p-0")}>
                {/* <div className={cx(s.title4, "pb-4")}>Recent activities</div>
                <div className={cx("pt-3")}>
                    <SearchInput placeholder="Search activity name" />
                </div> */}
            </div>
            <GroupsSideBar />
            <div className={cx(s.main)}>
                <Loader show={isExperimentLoading}>
                    <table className={cx("table table-responsive", s.table)}>
                        <thead>
                            <tr>
                                <th>Experiment name</th>
                                <th>Experiment ID</th>
                                <th>Product name</th>
                                <th>Contributor</th>
                                <th>Status</th>
                                <th>Last updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {experimentData && experimentData.length > 0 ?
                                (experimentData?.map((item, i) => (
                                    <tr key={`experiment_item_${i}`} role="button" >
                                        <td onClick={() => handleExpEdit(item.id)}>{item.experiment_name}</td>
                                        <td onClick={() => handleExpEdit(item.id)}>{item.experiment_id}</td>
                                        <td onClick={() => handleExpEdit(item.id)}>{item.product_name}</td>
                                        <td onClick={() => handleExpEdit(item.id)}>
                                            <div className="d-flex gap-1 align-items-center">
                                                <div className={s.userAvatarList}>
                                                    {item?.contributors && item?.contributors?.length > 0 ? (
                                                        <div className={s.userAvatarList}>
                                                            {item?.contributors.slice(0, 3).map((id, index) => (
                                                                <div key={index} className={s.item}  style={{ backgroundColor: getRandomColor() }} data={getInitials(id.cont_name)} />
                                                            ))}
                                                            {item.contributors.length > 3 && (
                                                                <div className="ms-1 mt-1">{`+${item.contributors.length - 3}`}</div>
                                                            )}
                                                        </div>
                                                    ) : ""}

                                                </div>
                                            </div>
                                        </td>
                                        <td onClick={() => handleExpEdit(item.id)}>Washing</td>
                                        <td className="text-center" onClick={() => handleExpEdit(item.id)}>{item?.latest_updated ? formatDate(item.latest_updated) : '-'}</td>
                                        <td >
                                            <DropDownMenu
                                                editHandle={() => handleExpEdit(item)}
                                                deleteHandle={() => handleExpDelete(item.id)}
                                            />
                                        </td>
                                    </tr>
                                ))) :
                                (<tr>
                                    <td colSpan={8} className="text-center">No Data</td>
                                </tr>)}
                        </tbody>
                    </table>
                </Loader>
            </div>
            {/* <ActivityList /> */}
        </div>
    );
}
