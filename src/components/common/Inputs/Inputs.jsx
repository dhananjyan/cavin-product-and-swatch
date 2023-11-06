import { Form } from 'react-bootstrap';

import s from "./Input.module.scss";

import cx from "classnames";
import PropTypes from 'prop-types';

export default function Inputs(props) {
    const { label, mutedText, error, showError = false, validation = {}, type = "text", placeholder, register = () => ({}), name, inputClassName = "", inputGroupClassname = "", autofocus } = props || {};
    const additionalAttributes = {};
    if (type == "textarea") {
        additionalAttributes.as = "textarea";
        additionalAttributes.rows = 4;
    }
    return (
        <Form.Group className={cx(inputGroupClassname, s.input)} controlId="formBasicEmail">
            {label ? <Form.Label className={s.text}>{label}</Form.Label> : ""}
            <Form.Control autoFocus={autofocus} className={inputClassName} type={type} {...additionalAttributes} placeholder={placeholder}  {...register(name, validation)} />
            {mutedText ? <Form.Text className="text-muted">{mutedText}</Form.Text> : ""}
            {(showError && error) ? <div className={s.errorText}>{error}</div> : ""}
        </Form.Group>
    )
}
