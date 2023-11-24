import ReactPaginate from 'react-paginate';


import cx from "classnames";
import s from "./Pagination.module.scss";
import { useState } from 'react';

import leftArrowIcon from "../../../assets/svg/leftArrow.svg";
import rightArrowIcon from "../../../assets/svg/rightArrow.svg";
import { ReactSVG } from 'react-svg';

export default function Pagination({ itemsPerPage = 3, itemsLength = 100 }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    const pageCount = Math.ceil(itemsLength / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % itemsLength;
        setItemOffset(newOffset);
    };

    return (
        <div className={s.paginationSection}>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ReactSVG src={rightArrowIcon} />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel={<ReactSVG src={leftArrowIcon} />}
                renderOnZeroPageCount={null}
                className={cx(s.pagination)}
            />
        </div>
    );
}
