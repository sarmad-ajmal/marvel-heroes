import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IHero } from "../interface";
const CryptoJS = require("crypto-js");
const PUBLIC_KEY = "0d975c6cd4257bd07429a92e23f7f3da";
const PRIV_KEY = "45dccfa1929b3037b493e77ec1ceb925ca6eaa00";
const useHeroDetail = () => {
  const { id: characterId = "" } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<IHero>();
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchHeores = async () => {
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
      const hexString = hash.toString("hex");
      const url = `https://gateway.marvel.com:443/v1/public/characters/${characterId}?apikey=${PUBLIC_KEY}&ts=${ts}&hash=${hexString}`;
      const response = await fetch(url);
      const json = await response.json();
      const { data } = json || {};
      const { results = [] } = data || {};
      if (results.length) {
        setHero(results[0]);
      }
    };
    fetchHeores().catch(console.error);
  }, [characterId]);

  return {
    hero,
    goBack
  };
};

export default useHeroDetail;
