import { useEffect, useRef, useState } from "react";
import queryString from "query-string";

import { IHero, IMeta } from "../interface";

const CryptoJS = require("crypto-js");

const PUBLIC_KEY = "0d975c6cd4257bd07429a92e23f7f3da";
const PRIV_KEY = "45dccfa1929b3037b493e77ec1ceb925ca6eaa00";
const useHeroesGrid = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const meta = useRef<IMeta>({
    curPage: 1,
    perPage: 30,
    totalPages: 0,
    totalResults: 0,
  });
  const onChange = (curPage: number, perPage: number) => {
    if (perPage !== meta.current.perPage) {
      meta.current = {
        ...meta.current,
        curPage:1,
        perPage,
      };
    } else {
      meta.current = {
        ...meta.current,
        curPage,
        perPage,
      };
    }
    fetchHeores();
  };
  const fetchHeores = async () => {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    const hexString = hash.toString("hex");
    const params = queryString.stringify({
      apikey: PUBLIC_KEY,
      ts,
      hash: hexString,
      limit: meta.current.perPage,
      offset:
        meta.current.curPage * meta.current.perPage - meta.current.perPage,
    });
    const url = `https://gateway.marvel.com:443/v1/public/characters?${params}`;
    const response = await fetch(url);
    const json = await response.json();
    const { data } = json || {};
    const { results = [], total: totalResults = 0 } = data || {};
    meta.current = {
      ...meta.current,
      totalResults,
      totalPages: totalResults / meta.current.perPage!,
    };

    setHeroes(results);
  };
  useEffect(() => {
    fetchHeores().catch(console.error);
  }, []);
  return { heroes, meta, onChange };
};

export default useHeroesGrid;
