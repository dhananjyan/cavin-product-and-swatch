import { Dropdown } from 'react-bootstrap';
import s from './ProfileMenu.module.scss';
import { ReactSVG } from 'react-svg';

import dotMenuIcon from "../../../assets/svg/dotsMenu.svg";
import pencilIcon from "../../../assets/svg/pencil.svg";
import binIcon from "../../../assets/svg/bin.svg";
import avatarSvg from "../../../assets/svg/avatar.svg"

export default function ProfileMenu(props) {
    const { editHandle, handleContributors } = props;
    return (
        <Dropdown className={s.dropdown}>
            <Dropdown.Toggle variant="" >
                <ReactSVG role="button" src={avatarSvg} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={editHandle} className={"d-flex gap-2 align-items-center"}>
                    <ReactSVG src={pencilIcon} />
                    Edit
                </Dropdown.Item>
                <Dropdown.Item onClick={handleContributors} className={"d-flex gap-2 align-items-center"}>
                    Manage Contributors
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}
