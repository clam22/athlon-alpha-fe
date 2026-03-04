import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select onValueChange={handleLanguageChange}>
      <SelectTrigger>
        <SelectValue
          placeholder={
            <div>
              <Globe className="text-white block md:hidden" />
              <div className="hidden md:block">Select language</div>
            </div>
          }
        />
      </SelectTrigger>
      <SelectContent position="popper">
        <SelectGroup>
          <SelectLabel>Langages</SelectLabel>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="fr">French</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
