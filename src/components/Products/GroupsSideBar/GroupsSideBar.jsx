import { useDispatch, useSelector } from "react-redux";
import s from "./GroupsSideBar.module.scss";
import cx from "classnames";
import { updateSelectedGroup } from "../../../store/features/products";

export default function GroupsSideBar() {
    const dispatch = useDispatch();
    const list = useSelector((state) => state?.products?.groupList);
    const selectedGroup = useSelector(state => state?.products?.selectedGroup);

    const handleGroupClick = (id) => {
        dispatch(updateSelectedGroup(id));
    }

    return (
        <div>
            {list.map((item, index) => {
                return (
                    <div role="button" onClick={() => handleGroupClick(item?.group_id)} className={cx(s.item, { [s.active]: selectedGroup === item?.group_id })} key={index}>
                        <div className={cx(s.titleBold, "pb-2")}>{item.group_name}</div>
                        <div className={cx(s.titleSmall1, "pb-1")}>
                            Total no. of experiments&nbsp;&nbsp;<b>0</b>
                        </div>
                        <div className={cx("d-flex align-items-center gap-2")}>
                            <div className={s.avatar}>AH</div>
                            <div className={s.smallText}>Allison Herwitz</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
