import s from "./ActivityList.module.scss"
import cx from "classnames";
export default function ActivityList() {
    return (
        <div className={s.parent}>
            <div className={cx("px-3 pt-3 mx-1", s.item)}>
                <div className={cx(s.titleSmall1, "pb-1", s.content)}><span className={s.fw600}>Ashok kumar</span> uploaded the <span className={s.fw600}>washing</span> step for product <span className={s.fw600}>Meera herbal shampoo 50ml</span></div>
                <div className={cx(s.smallText, "pb-1")}>Fri,15 Sep 2023 , 10:23 AM</div>
            </div>
            <div className={cx("px-3 pt-3 mx-1", s.item)}>
                <div className={cx(s.titleSmall1, "pb-1", s.content)}><span className={s.fw600}>Ashok kumar</span> uploaded the <span className={s.fw600}>washing</span> step for product <span className={s.fw600}>Meera herbal shampoo 50ml</span></div>
                <div className={cx(s.smallText, "pb-1")}>Fri,15 Sep 2023 , 10:23 AM</div>
            </div>
            <div className={cx("px-3 pt-3 mx-1", s.item)}>
                <div className={cx(s.titleSmall1, "pb-1", s.content)}><span className={s.fw600}>Ashok kumar</span> uploaded the <span className={s.fw600}>washing</span> step for product <span className={s.fw600}>Meera herbal shampoo 50ml</span></div>
                <div className={cx(s.smallText, "pb-1")}>Fri,15 Sep 2023 , 10:23 AM</div>
            </div>
            <div className={cx("px-3 pt-3 mx-1", s.item)}>
                <div className={cx(s.titleSmall1, "pb-1", s.content)}><span className={s.fw600}>Ashok kumar</span> uploaded the <span className={s.fw600}>washing</span> step for product <span className={s.fw600}>Meera herbal shampoo 50ml</span></div>
                <div className={cx(s.smallText, "pb-1")}>Fri,15 Sep 2023 , 10:23 AM</div>
            </div>
        </div>
    )
}
