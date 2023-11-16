import cx from "classnames";
import s from "./ManageContributors.module.scss";
import { deleteContributor, getContributorsList, updateCloseEdit, updateNavigateTo, updateOpenEdit } from '../../store/features/products';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import plusIcon from "../../assets/svg/plus.svg";
import filterIcon from "../../assets/svg/filter.svg"
import SearchInput from "../common/SearchInput/SearchInput";
import DropDownMenu from "../common/DropDownMenu/DropDownMenu";
import AddEditContributor from "../AddEditContributors/AddEditContributors";



const ManageContributors = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getContributorsList());
    }, [])

    const contributorsData = useSelector((state) => state.products.contributorsData);
    const isEditContributor = useSelector((state) => state?.products?.isEditContributor)

    console.log(isEditContributor, "isEditContributor");

    const handleContDelete = (contId) => {
        dispatch(deleteContributor(contId));
    }

    const handleContEdit = (contId) => {
        // updateNavigateTo(`/manage-contributors/${contId}`)
        openModal()
    }

    const handleEditSave = () => {
        // closeMoadal()
    }

    const openModal = () => dispatch(updateOpenEdit());
    const closeMoadal = () => dispatch(updateCloseEdit());

    return (
        <div>
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
                        Manage Contributors
                    </div>
                    <div className={cx("d-flex align-items-center gap-3")}>
                        <div
                            role="button"
                            onClick={openModal}
                            className={cx(
                                // { [s.disabled]: isModalOpen },
                                s.newExpBtn,
                                s.btnPrimary
                            )}
                        >
                            <ReactSVG src={plusIcon} />
                            New Contributor
                        </div>
                        <div>
                            <ReactSVG src={filterIcon} />
                        </div>
                    </div>
                </div>
                <div className="d-flex gap-3 w-100">
                    <SearchInput placeholder="Search contributor name, contributor ID, email ID...."
                    />
                    {/* <SelectBox placeholder="Filters" className={s.filterSelect} /> */}
                </div>
            </div>
            <table className={cx("table table-responsive", s.table)} >
                <thead>
                    <tr>
                        <th>Group ID</th>
                        <th>Contributor ID</th>
                        <th>Contributor Name</th>
                        <th>Email ID</th>
                        <th>Last updated</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {contributorsData && contributorsData.length > 0 ?
                        contributorsData.map((item, index) => (
                            <tr key={index}>
                                <th>{item?.added_by}</th>
                                <td>{item?.contributor_id}</td>
                                <td>{item?.contributor_name}</td>
                                <td>{item?.email_id}</td>
                                <td>{item?.date_modified ? item?.date_modified : '-'}</td>
                                <td>
                                    <DropDownMenu
                                        editHandle={() => handleContEdit(item?.contributor_id)}
                                        deleteHandle={() => handleContDelete(item?.contributor_id)}
                                    />
                                </td>
                            </tr>
                        )) :
                        (<tr>
                            <td colSpan={8} className="text-center">No Data</td>
                        </tr>)
                    }

                </tbody>
            </table>
            {isEditContributor && <>
                <AddEditContributor/>
            </>
            }
        </div>
    )
}

export default ManageContributors
