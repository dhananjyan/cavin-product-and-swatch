import { useDispatch, useSelector } from "react-redux";
import s from "./GroupsSideBar.module.scss";
import cx from "classnames";
import { deleteGroup, editGroup, getExperimentsByGroupId, updateGroupName, updateSelectedGroupName } from "../../../store/features/products";
import AddGroup from "./AddGroup/AddGroup";
import Loader from "../../common/Loader/Loader";
import DropDownMenu from "../../common/DropDownMenu/DropDownMenu";
import { useState } from "react";
import { ReactSVG } from "react-svg";
import tickIcon from "../../../assets/svg/tickIcon.svg"
import closeIcon from "../../../assets/svg/close.svg"

export default function GroupsSideBar() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state?.products?.groupList);
    const selectedGroup = useSelector(state => state?.products?.selectedGroup);
    const addFormStatus = useSelector(state => state?.products?.isAddGroup);
    const isGroupDataLoading = useSelector((state) => state.products.isGroupDataLoading);
    const selectedGroupId = useSelector((state) => state?.products?.selectedGroup);

    const handleGroupClick = ({ id, groupName }) => {
        dispatch(getExperimentsByGroupId(id));
        dispatch(updateSelectedGroupName(groupName));
    }

    console.log("addFormStatus", addFormStatus)

    const [editingGroupId, setEditingGroupId] = useState(null);



    const handleGroupSave = (groupId, newGroupName) => {
        dispatch(editGroup({ groupId, groupName: newGroupName }));
        setEditingGroupId(null);
    };

    const handleGroupDelete = (groupId) => {
        dispatch(deleteGroup(groupId));
    }

    return (
        <div className={s.verticalScroll}>
            {addFormStatus ? <div className={s.item}>
                <AddGroup />
            </div> : ""}
            <Loader show={isGroupDataLoading}>
                {list.map((item, index) => {
                    return (
                        <>
                            <div className={cx(s.item, { [s.active]: selectedGroup === item?.group_id }, "d-flex ")} key={index}>
                                <div role="button" className="flex-grow-1" onClick={() => handleGroupClick({ id: item?.group_id, groupName: item?.group_name })}  >
                                    {editingGroupId === item?.group_id ? (
                                        <div className={s.groupEdit}>
                                            <input
                                                className={cx()}
                                                type="text"
                                                value={item?.group_name}
                                                onChange={(e) => dispatch(updateGroupName({ groupId: item?.group_id, newName: e.target.value }))}
                                            />
                                            {/* <button >Save</button> */}
                                        </div>

                                    ) : (<div className={cx(s.titleBold, "pb-2 text-capitalize")}>{item.group_name}</div>)}
                                    <div className={cx(s.titleSmall1, "py-1")}>
                                        Total no. of experiments&nbsp;&nbsp;<b>{item?.total_experiments}</b>
                                    </div>
                                    <div className={cx("d-flex align-items-center gap-2")}>
                                        <div className={cx(s.avatar, "text-uppercase")}>{item?.user_name?.[0]}</div>
                                        <div className={cx(s.smallText, "text-capitalize")}>{item?.user_name}</div>
                                    </div>

                                </div>

                                <div>
                                    {editingGroupId === item?.group_id ?
                                        <div className={cx(s.actionIcons,)}>
                                            <ReactSVG src={tickIcon} onClick={() => handleGroupSave(item.group_id, item.group_name)} 
                                             className={cx(s.icon,{[s.selected] : selectedGroup === editingGroupId})} />
                                            <ReactSVG src={closeIcon} onClick={() => setEditingGroupId(null)} 
                                             className={cx(s.icon,s.closeIcon, {[s.selected] : selectedGroup === editingGroupId})} />
                                        </div> 
                                        : 
                                        <DropDownMenu
                                            deleteHandle={() => handleGroupDelete(item?.group_id)}
                                            editHandle={() => setEditingGroupId(item?.group_id)}
                                        />}
                                </div>
                            </div>

                        </>

                    );
                })}
            </Loader>
        </div>
    );
}
