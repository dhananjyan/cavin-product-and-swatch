import { useSelector } from "react-redux";
import s from "./GroupsSideBar.module.scss";
import cx from "classnames";

export default function GroupsSideBar() {
  const list = useSelector((state) => state?.products?.groupList);
  const selectedGroup = useSelector(state => state?.products?.selectedGroup)

  return (
    <div>
      {list.map((item, index) => {
        return (
          <div className={cx(s.item, { [s.active]: selectedGroup === item?.group_id })} key={index}>
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
