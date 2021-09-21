import React, { useState, useEffect } from "react";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

const MultiSelectAll = ({ options, setColunms }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    setSelectedOptions([{ label: "All", value: "*" }, ...options]);
    setColunms(options)
  }, []);

  function getDropdownButtonLabel({ placeholderButtonLabel, value }) {
    if (value && value.some((o) => o.value === "*")) {
      return `${placeholderButtonLabel}: All`;
    } else {
      return `${placeholderButtonLabel}: ${value.length} selecionado(s)`;
    }
  }

  function onChange(value, event) {  
    if (event.action === "select-option" && event.option.value === "*") {      
      this.setState(this.options);
      setColunms(this.options.filter((o) => o.value !== "*"))
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
      ) {   
      this.setState([]);
      setColunms([])
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
      setColunms(value.filter((o) => o.value !== "*"))
    } else if (value.length === this.options.length - 1) {      
      this.setState(this.options);
      setColunms(this.options.filter((o) => o.value !== "*"))
    } else {      
      this.setState(value);
      setColunms(value)
    }    
  }

  return (
    <ReactMultiSelectCheckboxes
      options={[{ label: "All", value: "*" }, ...options]}
      placeholderButtonLabel="Colunas"
      getDropdownButtonLabel={getDropdownButtonLabel}
      value={selectedOptions}
      onChange={onChange}
      setState={setSelectedOptions}
    />
  );
};

export default MultiSelectAll;
