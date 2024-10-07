"use client";

import React from "react";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import { E164Number } from "libphonenumber-js/core";
import PhoneInput from "react-phone-number-input";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disable?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-dark-400 bg-dark-400'>
          {iconSrc && (
            <Image
              src={iconSrc}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
              className='ml-2'
            />
          )}

          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={(value) => field.onChange(value)}
            className='input-phone'
          />
        </FormControl>
      );
    
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded md border border-dark-500 bg-dark-400">
          <Image 
            src={"/assets/icons/calendar.svg"}
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <DatePicker selected={field.value} onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
              
            />
          </FormControl>
          </div>
      )
    default:
      break;
    
    case FormFieldType.SKELETON: 
      return (
        renderSkeleton ? renderSkeleton(field) : null

      )
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />

          <FormMessage className='shad-error' />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
