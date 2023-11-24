import React, { useState } from 'react';
import s from './Popover.module.css'; // Import your styles or use inline styles

const Popover = ({ triggerText, content }) => {
    const [isPopoverVisible, setPopoverVisible] = useState(false);

    const handleMouseEnter = () => {
        setPopoverVisible(true);
    };

    const handleMouseLeave = () => {
        setPopoverVisible(false);
    };

    return (
        <div className={s.popoverContainer}>
            <div
                className={s.popoverTrigger}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {triggerText}
            </div>
            {isPopoverVisible && (
                <div className={s.popoverContent}>
                    {content}
                </div>
            )}
        </div>
    );
};

export default Popover;