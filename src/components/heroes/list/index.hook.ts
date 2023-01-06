import { useEffect, useRef, useState } from "react";
import queryString from "query-string";

import { IHero, IMeta } from "../interface";

const CryptoJS = require("crypto-js");

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "";
const PRIV_KEY = process.env.REACT_APP_PRIVATE_KEY || "";

const useHeroesGrid = () => {
  const [heroes, setHeroes] = useState<IHero[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const query = useRef("");
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
        curPage: 1,
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

  const onChangeQuery = (value: string) => {
    query.current = value;
    if (!value) {
      resetFilters();
    }
    fetchHeores();
  };
  const resetFilters = () => {
    meta.current = { ...meta.current, curPage: 1 };
  };
  const onClearSearch = () => {
    onChangeQuery("");
  };
  const fetchHeores = async () => {
    try {
      setLoading(true);
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
      const hexString = hash.toString("hex");
      let payload = {
        apikey: PUBLIC_KEY,
        ts,
        hash: hexString,
        limit: meta.current.perPage,
        offset:
          meta.current.curPage * meta.current.perPage - meta.current.perPage,
      };
      if (!!query.current) {
        Object.assign(payload, { nameStartsWith: query.current });
      }
      const params = queryString.stringify(payload);
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

      setLoading(false);
      if (initialLoading) {
        setInitialLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (initialLoading) {
        setInitialLoading(false);
      }
    }
  };
  useEffect(() => {
    fetchHeores();
  }, []);
  return {
    heroes,
    meta,
    loading,
    initialLoading,
    onChange,
    onChangeQuery,
    onClearSearch,
  };
};

export default useHeroesGrid;
