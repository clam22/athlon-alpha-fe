import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };
  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Langages</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
