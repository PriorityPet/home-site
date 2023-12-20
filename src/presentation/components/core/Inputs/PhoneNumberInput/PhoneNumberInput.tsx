import { useState, useEffect, ChangeEvent } from "react";
import CountriesCodeJson from "@/presentation/assets/json/countriesCodeJson.json";
import PhoneNumberCountrySelector from "./PhoneNumberCountrySelector";
import {
  ErrorValidatorType,
  validatedPhoneNumber,
} from "./Validators/Validators";
import { twMerge } from "tailwind-merge";

interface IPhoneNumberInputProps {
  preferredCountries?: string[] | null;
  defaultSelectedCountry?: string | null;
  defaultSelectedCountryCode?: string | null;
  defaultValue?: string;
  onPhoneNumberChange: (obj: {
    phoneCode: string;
    phoneNumber: string;
    fullPhoneNumber: string;
    code: string;
    validator: ErrorValidatorType | null;
  }) => void;
  isDark?: boolean;
  height?: string | number;
  showErrorMessage?: boolean;
}

export interface CountryISO {
  nameEN: string;
  nameES: string;
  dialCode: string;
  code: string;
  placeholder: string;
}

export default function PhoneNumberInput({
  preferredCountries,
  defaultSelectedCountry,
  defaultSelectedCountryCode,
  onPhoneNumberChange,
  isDark = false,
  height = "44px",
  defaultValue = "",
  showErrorMessage = true,
}: IPhoneNumberInputProps) {
  const [countries, setCountries] = useState<CountryISO[]>([]);
  const [values, setValues] = useState<{
    phoneCode: string;
    phoneNumber: string;
    fullPhoneNumber: string;
    code: string;
    validator: ErrorValidatorType | null;
  }>({
    phoneCode: "",
    phoneNumber: "",
    fullPhoneNumber: "",
    code: "",
    validator: null,
  });
  const [focus, setFocus] = useState(false);

  const setDefaultCountryByCountry = (countriesListIso: CountryISO[]) => {
    const country = countriesListIso.find(
      (element) => element.code === defaultSelectedCountry?.toLowerCase()
    );

    if (country?.code && country?.code?.length > 0) {
      setValues({
        ...values,
        phoneCode: country.dialCode,
        phoneNumber: defaultValue.trim(),
        fullPhoneNumber: `${country.dialCode}${defaultValue.trim()}`,
        code: country.code,
      });
    } else {
      setValues({
        ...values,
        phoneCode: countriesListIso[0].dialCode,
        phoneNumber: defaultValue.trim(),
        fullPhoneNumber: `${
          countriesListIso[0].dialCode
        }${defaultValue.trim()}`,
        code: countriesListIso[0].code,
      });
    }
  };

  const setDefaultCountryByCountryCode = (countriesListIso: CountryISO[]) => {
    const country = countriesListIso.find(
      (element) =>
        element.dialCode === defaultSelectedCountryCode?.toLowerCase()
    );

    if (country?.dialCode && country?.dialCode?.length > 0) {
      setValues({
        ...values,
        phoneCode: country.dialCode,
        phoneNumber: defaultValue.trim(),
        fullPhoneNumber: `${country.dialCode}${defaultValue.trim()}`,
        code: country.code,
      });
    } else {
      setValues({
        ...values,
        phoneCode: countriesListIso[0].dialCode,
        phoneNumber: defaultValue.trim(),
        fullPhoneNumber: `${
          countriesListIso[0].dialCode
        }${defaultValue.trim()}`,
        code: countriesListIso[0].code,
      });
    }
  };

  const setCountriesDialCodes = () => {
    const countriesListIso: CountryISO[] = [];

    CountriesCodeJson.countries.forEach((country) => {
      let countryIso: CountryISO = {} as CountryISO;

      if (
        preferredCountries &&
        preferredCountries.length > 0 &&
        preferredCountries.indexOf(country.code.toLowerCase()) >= 0
      ) {
        countryIso = {
          nameEN: country.name_en,
          nameES: country.name_es,
          dialCode: country.dial_code,
          code: country.code.toLowerCase(),
          placeholder: country?.placeholder ?? "",
        };
      } else if (!preferredCountries) {
        countryIso = {
          nameEN: country.name_en,
          nameES: country.name_es,
          dialCode: country.dial_code,
          code: country.code.toLowerCase(),
          placeholder: country?.placeholder ?? "",
        };
      }

      if (countryIso.code?.length > 0) countriesListIso.push(countryIso);

      if (countriesListIso.length > 0 && defaultSelectedCountryCode) {
        setDefaultCountryByCountryCode(countriesListIso);
        return;
      }

      if (countriesListIso.length > 0 && defaultSelectedCountry) {
        setDefaultCountryByCountry(countriesListIso);
        return;
      }

      if (countriesListIso.length > 0 && !defaultSelectedCountry) {
        setValues({
          ...values,
          phoneCode: countriesListIso[0].dialCode,
          phoneNumber: defaultValue.trim(),
          fullPhoneNumber: `${
            countriesListIso[0].dialCode
          }${defaultValue.trim()}`,
          code: countriesListIso[0].code,
        });
      }
    });

    setCountries(countriesListIso);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const validator: ErrorValidatorType | null = validatedPhoneNumber({
      countryCode: values.code,
      phoneNumber: value,
    });

    setValues({
      ...values,
      phoneNumber: value.trim(),
      fullPhoneNumber: `${values.phoneCode}${value.trim()}`,
      validator: validator,
    });
  };

  const onChangeCountry = (country: CountryISO) => {
    const validator: ErrorValidatorType | null = validatedPhoneNumber({
      countryCode: country.code,
      phoneNumber: values.phoneNumber.trim(),
    });

    setValues({
      ...values,
      phoneCode: country.dialCode,
      code: country.code,
      fullPhoneNumber: `${country.dialCode}${values.phoneNumber.trim()}`,
      validator: validator,
    });
  };

  const getPlaceHolder = (code: string) => {
    if (countries.length === 0) return "";

    const country = countries.find((element) => element.code === code);

    if (country) return country.placeholder;

    return "";
  };

  useEffect(() => {
    setCountriesDialCodes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onPhoneNumberChange(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <div>
      <div className="flex w-full relative">
        <div>
          <PhoneNumberCountrySelector
            values={values}
            onChangeCountry={onChangeCountry}
            countries={countries}
            focus={focus}
            height={height}
          />
        </div>

        <div className="w-full relative flex">
          <div
            style={{ height: height }}
            className={twMerge([
              isDark ? "bg-gray-100" : "bg-white",
              focus
                ? "border ring-0 border-t-1 border-r-0 border-l-1 border-b-1 border-slate-300"
                : "border ring-0 border-t-1 border-r-0 border-l-1 border-b-1 border-slate-300",
            ])}
          >
            <div className="px-2 h-full flex items-center">
              <p className="text-xs">{values.phoneCode}</p>
            </div>
          </div>

          <input
            type="text"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            style={{ height: height }}
            className={twMerge([
              "w-full py-3 pl-0 pr-10 rounded-tr-md rounded-br-md text-gray-900 placeholder:text-gray-400/90 text-sm",
              isDark ? "bg-gray-100" : "bg-white",
              focus
                ? "focus:ring-0 focus:border-t-4 focus:border-r-4 focus:border-l-0 focus:border-b-4 focus:border-opacity-20 focus:border-slate-300"
                : "border ring-0 border-t-1 border-r-1 border-l-0 border-b-1 border-slate-300",
            ])}
            placeholder={getPlaceHolder(values.code)}
            value={values.phoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
          />
        </div>
      </div>

      {values.validator?.error && (
        <div className="mt-1">
          <span className="text-xs text-red-700 font-medium">
            {values.validator.error.es}
          </span>
        </div>
      )}
    </div>
  );
}
