import cx from "classnames";
import s from "./Products.module.scss";
import plusIcon from "../../assets/svg/plus.svg";
import { ReactSVG } from "react-svg";
import GroupsSideBar from "./GroupsSideBar/GroupsSideBar";
import SearchInput from "../common/SearchInput/SearchInput";
import ActivityList from "./ActivityList/ActivityList";
import NavLinkSideBar from "./NavLinkSideBar/NavLinkSideBar";
import { useEffect } from "react";
import { initializeProductPage, updateAddGroupPopupStatus } from "../../store/features/products";
import { useDispatch, useSelector } from "react-redux";
import { openAddPopup } from "../../store/features/expriment";

import filterIcon from "../../assets/svg/filter.svg";

export default function Products() {
    const dispatch = useDispatch();

    const isModalOpen = useSelector(state => state.expriment.isModalOpen);

    useEffect(() => {
        dispatch(initializeProductPage());
    });

    const totalGroups = useSelector((state) => state?.products?.totalGroup);

    const openModal = () => dispatch(openAddPopup())

    const handleAddNewGroup = () => {
        dispatch(updateAddGroupPopupStatus(true))
    }

    return (
        <div className={s.productSection}>
            {/* <Filters /> */}
            {/* <Pagination /> */}
            <div className={s.navLinkSidebar}>
                <NavLinkSideBar />
            </div>
            <div className={s.sideHeader}>
                <div className={cx(s.title4, "pb-2 d-flex align-items-center gap-4")}>
                    <div>Total groups {totalGroups}</div>
                    <div className={cx("d-flex", s.blueText)} role="button" onClick={handleAddNewGroup}><ReactSVG src={plusIcon} /> New group</div>
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
                <div className={cx("d-flex align-items-center justify-content-between pb-3")}>
                    <div className={cx(s.title3, " d-flex align-items-center")}>Group name 3</div>
                    <div className={cx("d-flex align-items-center gap-3")}>
                        <div role="button" onClick={openModal} className={cx({ [s.disabled]: isModalOpen }, s.newExpBtn, s.btnPrimary)}>
                            <ReactSVG src={plusIcon} />
                            New experiment
                        </div>
                        <div><ReactSVG src={filterIcon} /></div>
                    </div>
                </div>
                <div className="d-flex gap-3 w-100">
                    <SearchInput placeholder="Search experiment name, experiment ID, product name, status...." />
                    {/* <SelectBox placeholder="Filters" className={s.filterSelect} /> */}
                </div>
            </div>
            <div className={s.sideHeader}>
                <div className={cx(s.title4, "pb-4")}>Recent activities</div>
                <div className={cx("pt-3")}>
                    <SearchInput placeholder="Search activity name" />
                </div>
            </div>
            <GroupsSideBar />
            <div className={cx(s.main)}>
                <table className={cx("table table-responsive", s.table)}>
                    <thead>
                        <tr>
                            <th>Experiment name</th>
                            <th>Experiment ID</th>
                            <th>Product name</th>
                            <th>Contributor</th>
                            <th>Status</th>
                            <th>Last updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Experiment name 1</td>
                            <td>EXP58924587</td>
                            <td>Meera herbal shampoo 50ml</td>
                            <td>
                                <div className="d-flex gap-1 align-items-center">
                                    <div className={s.userAvatarList}>
                                        <div className={s.item} data="AD" />
                                        <div className={s.item} data="AD" />
                                        <div className={s.item} data="AD" />
                                        <div className={s.item} data="AD" />
                                    </div>
                                    <div>+2</div>
                                </div>
                            </td>
                            <td>Washing</td>
                            <td>15 Sep 2023,10:23 AM</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ActivityList />
        </div>
    );
}
