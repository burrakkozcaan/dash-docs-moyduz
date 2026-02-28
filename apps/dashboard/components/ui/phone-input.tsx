"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDown, Phone } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "@repo/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { cn } from "@/lib/utils";
import CustomInput from "@/components/custom-input";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

type CountryEntry = {
  label: string;
  value: RPNInput.Country | undefined;
};

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const PhoneInputComponent: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<
    React.ElementRef<typeof RPNInput.default>,
    PhoneInputProps
  >(
    (
      {
        className,
        onChange,
        value,
        defaultCountry = "TR",
        placeholder,
        ...props
      },
      ref
    ) => {
      const [detectedCountry, setDetectedCountry] = React.useState<
        RPNInput.Country | undefined
      >(defaultCountry);

      React.useEffect(() => {
        if (value && typeof value === "string" && value.length > 0) {
          try {
            const phoneNumber = parsePhoneNumber(value);
            if (phoneNumber?.country) {
              setDetectedCountry(phoneNumber.country);
            }
          } catch {
            // Invalid phone number, keep current country
          }
        }
      }, [value]);

      const CountrySelectWrapper = React.useCallback(
        (countrySelectProps: CountrySelectProps) => {
          return (
            <CountrySelect
              {...countrySelectProps}
              onChange={(country) => {
                setDetectedCountry(country);
                countrySelectProps.onChange(country);
              }}
            />
          );
        },
        []
      );

      React.useEffect(() => {
        if (!value && !defaultCountry) {
          const detectCountry = () => {
            try {
              const timezone =
                Intl.DateTimeFormat().resolvedOptions().timeZone;
              const timezoneToCountry: Record<string, RPNInput.Country> = {
                "Europe/Istanbul": "TR",
                "America/New_York": "US",
                "America/Los_Angeles": "US",
                "Europe/London": "GB",
                "Europe/Berlin": "DE",
                "Europe/Paris": "FR",
                "Asia/Tokyo": "JP",
                "Australia/Sydney": "AU",
              };

              const countryFromTimezone = timezoneToCountry[timezone];
              if (countryFromTimezone) {
                setDetectedCountry(countryFromTimezone);
                return;
              }

              const locale = navigator.language || "en-US";
              const countryCode = locale.split("-")[1]?.toUpperCase();
              const validCountries = [
                "TR", "US", "GB", "DE", "FR", "JP", "AU", "CA",
                "IT", "ES", "NL", "SE", "NO", "DK", "FI",
              ];

              if (countryCode && validCountries.includes(countryCode)) {
                setDetectedCountry(countryCode as RPNInput.Country);
                return;
              }
            } catch {
              // Could not detect country
            }
            setDetectedCountry("TR");
          };
          detectCountry();
        } else if (!value && defaultCountry) {
          setDetectedCountry(defaultCountry);
        }
      }, [value, defaultCountry]);

      const currentCountry = detectedCountry || defaultCountry;

      return (
        <RPNInput.default
          ref={ref}
          className={cn("flex", className)}
          flagComponent={FlagComponent}
          countrySelectComponent={CountrySelectWrapper}
          inputComponent={InputComponent}
          smartCaret={false}
          value={value || undefined}
          defaultCountry={defaultCountry}
          country={currentCountry}
          onChange={(val) => {
            onChange?.(val || ("" as RPNInput.Value));
          }}
          placeholder={placeholder || undefined}
          {...props}
        />
      );
    }
  );

PhoneInputComponent.displayName = "PhoneInput";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ placeholder, ...props }, ref) => {
  return (
    <CustomInput
      icon={<Phone size={18} className="text-muted-foreground/70" />}
      className={cn(
        "h-10 w-full min-w-0 rounded-l-none rounded-r-[10px] border-l-0",
        "text-sm leading-5 font-normal tracking-normal"
      )}
      placeholder={placeholder || ""}
      {...props}
      ref={ref}
    />
  );
});

InputComponent.displayName = "InputComponent";

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-10 w-[120px] min-w-0",
            "flex items-center justify-start gap-2",
            "rounded-l-[10px] border border-zinc-950/10 border-r-0 bg-white",
            "px-3 text-sm leading-5 font-normal text-foreground",
            "hover:bg-zinc-950/5",
            "dark:border-white/10 dark:bg-zinc-950 dark:text-foreground dark:hover:bg-white/5"
          )}
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
          <ChevronsUpDown
            className={cn(
              "ml-auto h-4 w-4 opacity-50",
              "hover:opacity-50 focus:opacity-50 active:opacity-50",
              "transition-none",
              disabled ? "hidden" : "opacity-100"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] border border-[#d1d1d1] bg-white p-0 dark:border-[#313131] dark:bg-zinc-950">
        <Command className="bg-white text-black dark:bg-zinc-950 dark:text-white">
          <CommandInput
            className="relative z-20 bg-white text-black placeholder:text-[#777] dark:bg-zinc-950 dark:text-white dark:placeholder:text-[#999]"
            value={searchValue}
            onValueChange={(val) => {
              setSearchValue(val);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  scrollAreaRef.current.scrollTop = 0;
                }
              }, 0);
            }}
            placeholder="Search country..."
          />
          <CommandList
            ref={scrollAreaRef}
            className="h-72 bg-white text-black dark:bg-zinc-950 dark:text-white"
          >
            <CommandEmpty className="text-[#777] dark:text-[#999]">
              No country found.
            </CommandEmpty>
            <CommandGroup className="bg-white text-black dark:bg-zinc-950 dark:text-white">
              {countryList.map(({ value, label }) =>
                value ? (
                  <CountrySelectOption
                    key={value}
                    country={value}
                    countryName={label}
                    selectedCountry={selectedCountry}
                    onChange={onChange}
                    onSelectComplete={() => setIsOpen(false)}
                  />
                ) : null
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    onChange(country);
    onSelectComplete();
  };

  return (
    <CommandItem
      className="gap-2 text-white hover:bg-[#313131] focus:bg-[#313131] data-[selected=true]:bg-[#eeeeee] dark:text-black dark:data-[selected=true]:bg-[#313131]"
      onSelect={handleSelect}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm text-black dark:text-white">
        {countryName}
      </span>
      <span className="text-sm text-[#999999]">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 text-white dark:text-black ${country === selectedCountry ? "opacity-100" : "opacity-0"}`}
      />
    </CommandItem>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];
  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInputComponent as PhoneInput };
