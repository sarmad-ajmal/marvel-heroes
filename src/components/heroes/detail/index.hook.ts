import { useEffect, useState } from "react";
import queryString from "query-string";
import { useNavigate, useParams } from "react-router-dom";

import { IHero } from "../interface";
const CryptoJS = require("crypto-js");

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY || "";
const PRIV_KEY = process.env.REACT_APP_PRIVATE_KEY || "";

const useHeroDetail = () => {
  const { id: characterId = "" } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [hero, setHero] = useState<IHero>();

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchHeores = async () => {
      setLoading(true);
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
      const hexString = hash.toString("hex");
      const payload = {
        ts,
        hash: hexString,
        apikey: PUBLIC_KEY,
      };
      const params = queryString.stringify(payload);

      const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?${params}`;
      const response = await fetch(url);
      const json = await response.json();
      const { data, code } = json || {};
      const { results = [] } = data || {};
      if (results.length) {
        setHero(results[0]);
        setLoading(false);
      }
      if (!results.length || code !== 200) {
        setLoading(false);
      }
    };
    fetchHeores().catch((error) => {
      setLoading(false);
    });
  }, [characterId]);

  return {
    hero,
    loading,

    goBack,
  };
};

export default useHeroDetail;
