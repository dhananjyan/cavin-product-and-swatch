import { useDispatch, useSelector } from "react-redux";
import s from "./GroupsSideBar.module.scss";
import cx from "classnames";
import { getExperimentsByGroupId, updateSelectedGroupName } from "../../../store/features/products";
import AddGroup from "./AddGroup/AddGroup";
import Loader from "../../common/Loader/Loader";

export default function GroupsSideBar() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state?.products?.groupList);
    const selectedGroup = useSelector(state => state?.products?.selectedGroup);
    const addFormStatus = useSelector(state => state?.products?.isAddGroup);

    const handleGroupClick = ({id, groupName}) => {
        dispatch(getExperimentsByGroupId(id));
        dispatch(updateSelectedGroupName(groupName));
    }

    console.log("addFormStatus", addFormStatus)

    const isGroupDataLoading = useSelector((state) => state.products.isGroupDataLoading);

    return (
        <div className={s.verticalScroll}>
            {addFormStatus ? <div className={s.item}>
                <AddGroup />
            </div> : ""}
            <Loader show={isGroupDataLoading}>
            {list.map((item, index) => {
                return (
                     <div role="button" onClick={() => handleGroupClick({id: item?.group_id, groupName:item?.group_name})} className={cx(s.item, { [s.active]: selectedGroup === item?.group_id })} key={index}>
                        <div className={cx(s.titleBold, "pb-2")}>{item.group_name}</div>
                        <div className={cx(s.titleSmall1, "pb-1")}>
                            Total no. of experiments&nbsp;&nbsp;<b>{item?.total_experiments}</b>
                        </div>
                        <div className={cx("d-flex align-items-center gap-2")}>
                            <div className={s.avatar}>AH</div>
                            <div className={s.smallText}>Allison Herwitz</div>
                        </div>
                    </div>
                );
            })}
            </Loader>
        </div>
    );
}
