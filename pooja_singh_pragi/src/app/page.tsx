
import LoginLogout from "@/components/login";
import Weather from "@/components/weather";
import SearchBar from "@/components/weather/searchBar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
    <LoginLogout />
    <SearchBar />
  </div>
  );
}
