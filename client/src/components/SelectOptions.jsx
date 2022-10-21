// react select import
import Select from "react-select";

// SelectOptions renders a select component to filter api results based on the media selection.
const SelectOptions = ({ options, selectHandleChange, media }) => {
  return (
    <>
      <Select
        options={options}
        onChange={selectHandleChange}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        placeholder={media ? { media } : "Select Filter"}
        className="select"
      />
    </>
  );
};

export default SelectOptions;
