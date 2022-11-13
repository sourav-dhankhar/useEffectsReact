import React, { forwardRef, useImperativeHandle, useRef } from "react";
import classes from "./Input.module.css";

const Input = (props, ref) => {
    const inputRef = useRef();

    const activateRef = function () {
        inputRef.current.focus();
    }
    useImperativeHandle(ref, () => {
        return {
            focus: activateRef
        }
    })

    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ''
                }`}
        >
            <label htmlFor={props.htmlfor}>{props.label}</label>
            <input ref={inputRef}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
            />
        </div>
    )
}

export default forwardRef(Input);