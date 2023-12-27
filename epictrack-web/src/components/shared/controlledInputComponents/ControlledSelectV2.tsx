import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TrackSelect from "../TrackSelect";

type IFormInputProps = {
  placeholder?: string;
  name: string;
  options: Array<any>;
  defaultValue?: string | number | undefined | number[];
  isMulti?: boolean;
  getOptionLabel: (option: any) => string;
  getOptionValue: (option: any) => string;
  helperText?: string | undefined;
  disabled?: boolean;
  onHandleChange?: (val: any) => void;
  // menuPortalTarget: HTMLElement | undefined;
};

const ControlledSelectV2: React.ForwardRefRenderFunction<
  HTMLDivElement,
  IFormInputProps
> = (
  {
    placeholder,
    name,
    options,
    getOptionLabel,
    getOptionValue,
    isMulti,
    disabled,
    helperText,
    onHandleChange,
    // menuPortalTarget,
    ...otherProps
  },
  ref
) => {
  const {
    control,
    formState: { errors, defaultValues },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValues?.[name] || ""}
      render={({ field }) => {
        const { onChange, value, ref } = field;
        return (
          <TrackSelect
            options={options}
            getOptionLabel={getOptionLabel}
            getOptionValue={getOptionValue}
            isMulti={isMulti}
            disabled={disabled}
            value={value}
            onChange={(val: any) => {
              let v;
              if (isMulti) v = val.map((v: any) => getOptionValue(v));
              else v = getOptionValue(val);
              if (onHandleChange !== undefined) onHandleChange(v);
              return onChange(v);
            }}
            error={!!errors[name]}
            helperText={String(errors[name]?.message || "")}
            {...otherProps}
          />
        );
      }}
    />
  );
};

export default React.forwardRef(ControlledSelectV2);
