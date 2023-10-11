import { Form } from 'react-bootstrap';

import s from "./Input.module.scss";

import cx from "classnames";
import PropTypes from 'prop-types';

export default function Inputs(props) {
    const { label, mutedText, validation = {}, type = "text", placeholder, register = () => ({}), name, inputClassName = "", inputGroupClassname = "" } = props || {};
    const additionalAttributes = {};
    if (type == "textarea") {
        additionalAttributes.as = "textarea";
        additionalAttributes.rows = 4;
    }
    return (
        <Form.Group className={cx(inputGroupClassname, s.input)} controlId="formBasicEmail">
            {label ? <Form.Label className={s.text}>{label}</Form.Label> : ""}
            <Form.Control className={inputClassName} type={type} {...additionalAttributes} placeholder={placeholder}  {...register(name, validation)} />
            {mutedText ? <Form.Text className="text-muted">{mutedText}</Form.Text> : ""}
        </Form.Group>
    )
}
