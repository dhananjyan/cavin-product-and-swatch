import cx from "classnames";
import s from "./ManageContributors.module.scss";
import { getContributorsList } from '../../store/features/products';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


const ManageContributors = () => {

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getContributorsList());
    },[])
    
    const contributorsData = useSelector((state) => state.products.contributorsData);

    return (
        <div>
            <table className={cx("table table-responsive", s.table)} >
                <thead>
                    <tr>
                        <th>Group ID</th>
                        <th>Contributor ID</th>
                        <th>Contributor Name</th>
                        <th>Email ID</th>
                        <th>Last updated</th>

                    </tr>
                </thead>
                <tbody>

                    {contributorsData && contributorsData.length > 0 ? 
                    contributorsData.map((item, index)=>(
                        <tr key={index}>
                        <th>{item?.added_by}</th>
                        <td>{item?.contributor_id}</td>
                        <td>{item?.contributor_name}</td>
                        <td>{item?.email_id}</td>
                        <td>{item?.date_modified}</td>
                    </tr>
                    )) :
                    (<tr>
                        <td colSpan={8} className="text-center">No Data</td>
                    </tr>)
                    }

                </tbody>
            </table>
        </div>
    )
}

export default ManageContributors
