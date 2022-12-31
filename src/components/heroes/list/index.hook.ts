import { useEffect, useState } from "react";
import { IHero } from "../interface";
// const md5 = require("md5-hash").default;
const CryptoJS = require("crypto-js");

const PUBLIC_KEY = "0d975c6cd4257bd07429a92e23f7f3da";
const PRIV_KEY = "45dccfa1929b3037b493e77ec1ceb925ca6eaa00";
const useHeroesGrid = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  useEffect(() => {
    const fetchHeores = async () => {
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
      const hexString = hash.toString("hex");
      const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hexString}`;
      const response = await fetch(url);
      const json = await response.json();
      const { data } = json || {};
      const { results = [] } = data || {};
      setHeroes(results);
    };
    fetchHeores().catch(console.error);
  }, []);
  return {heroes};
};

export default useHeroesGrid;
