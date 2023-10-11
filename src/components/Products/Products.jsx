import cx from "classnames";
import s from "./Products.module.scss";
import Filters from "./Filters/Filters";
import Pagination from "../common/Pagination/Pagination";

import binIcon from "../../assets/svg/bin.svg";
import eyeIcon from "../../assets/svg/eye.svg";
import pencilIcon from "../../assets/svg/pencil.svg";
import { ReactSVG } from "react-svg";
import GroupsSideBar from "./GroupsSideBar/GroupsSideBar";
import ActivitiesSidebar from "./ActivitiesSidebar/ActivitiesSidebar";

export default function Products() {
    return (
        <div className={s.productSection}>
            {/* <Filters /> */}
            {/* <Pagination /> */}
            <GroupsSideBar />
            {/* <table className={cx("table table-responsive", s.table)}>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th></th>
                        <th></th>
                        <th>Status</th>
                        <th>Last updated</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Meera herbal shampoo 50 ml</td>
                        <td>MHS-Swatch 1</td>
                        <td>MHS-SW0098789</td>
                        <td>Pre-measurement</td>
                        <td>Fri,15 Sep 2023 , 10:23 Am</td>
                        <td>
                            <div className="d-flex gap-4">
                                <ReactSVG src={eyeIcon} />
                                <ReactSVG src={pencilIcon} />
                                <ReactSVG src={binIcon} />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table> */}
            <ActivitiesSidebar />

        </div>
    )
}
