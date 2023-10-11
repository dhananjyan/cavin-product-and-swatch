import { ReactSVG } from "react-svg";
import SelectBox from "../../common/SelectBox/SelectBox";
import s from "./Filters.module.scss";
import cx from "classnames";

import plusIcon from "../../../assets/svg/plus.svg";

export default function Filters() {
    return (
        <div className={s.filteresSection}>
            <div>
                <h4 className={s.tableHeading}>Table Heading</h4>
            </div>
            <div className={s.filters}>
                <SelectBox
                    options={[
                        { label: "Label", value: "value" }
                    ]}
                    onChange={console.log}
                />
                <input className={s.filterInput} />
                <button className={s.button} ><ReactSVG src={plusIcon} /> Add new product</button>
            </div>
        </div>
    )
}
