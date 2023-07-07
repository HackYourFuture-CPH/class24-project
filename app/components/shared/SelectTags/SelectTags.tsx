/** @format */
import React, { ChangeEvent, useState } from "react";
import Select, {
  components,
  MultiValueRemoveProps,
  IndicatorSeparatorProps,
} from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { customFormStyles } from "./styles";
import styles from "../../snippets/snipetForm/styles.module.css";

type Option = {
  label: string;
  value: string | any;
};

interface SelectTagProps {
  placeholder?: string;
  options: Option[];
  value: Option[] | any;
  isMulti: boolean;
  onChange: (value: Option[] | null | any) => void;
}

const DropdownIndicator: React.FC<any> = (
  props: MultiValueRemoveProps | any
) => {
  return (
    <>
      <components.DropdownIndicator {...props}>
        <FontAwesomeIcon icon={faChevronDown} style={{ color: "#000000" }} />
      </components.DropdownIndicator>
      <components.MultiValueRemove {...props}>
        <FontAwesomeIcon icon={faXmark} style={{ color: "#ffffff" }} />
      </components.MultiValueRemove>
    </>
  );
};

export default function SelectTags(props: SelectTagProps): JSX.Element {
  return (
    <div className={styles.inputWrapper}>
      <label className={styles.span}>Tags</label>
      <Select
        placeholder={props.placeholder}
        options={props.options}
        value={props.value}
        onChange={props.onChange}
        isSearchable={true}
        isMulti={props.isMulti}
        styles={customFormStyles}
        components={{ DropdownIndicator }}
      />
    </div>
  );
}
