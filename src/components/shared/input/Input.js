import React from "react";
import classNames from "classnames";
import styles from "./input.module.sass";

function Input({ name, label, type, error, ...props }) {
  const htmlFor = `text-${Math.random()}`;
  const {errMsg, ...attrs} = props
  return (
    <div className={classNames(styles.input__wrapper)}>
      <input
        {...attrs}
        name={name}
        id={htmlFor}
        className={classNames(styles.input, { [styles.input_error]: error })}
        type={type}
      />
      <label className={styles.input__label} htmlFor={htmlFor}>
        {label}
      </label>
      {errMsg&&<span>{errMsg}</span>}
    </div>
  );
}
Input.defaultProps = {
  type: "text",
  error: false,
};

export default Input;
