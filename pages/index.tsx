import "rc-slider/assets/index.css";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import SettingsIcon from "../components/Icons/Settings";
import Home from "../components/screens/Home";
import { useLocale } from "../hooks/useLocale";
import Settings from "../components/Settings";

const HomePage: NextPage = () => {
  const { locale } = useLocale();
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className="relative h-full">
      <Settings openSettings={openSettings} setOpenSettings={setOpenSettings} />
      <div className="z-40 text-white absolute top-3 right-3">
        <Link href="/" locale={locale === "jp" ? "en" : "jp"}>
          {locale === "jp" ? "🇺🇸 English" : "🇯🇵 日本語"}
        </Link>
      </div>

      <div
        className="z-40 text-white absolute top-3 left-3 cursor-pointer"
        onClick={() => setOpenSettings(!openSettings)}
      >
        <SettingsIcon size={1.6} color="white" />
      </div>
      <Home />
    </div>
  );
};

export default HomePage;
