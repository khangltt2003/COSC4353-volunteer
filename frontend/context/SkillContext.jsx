import axios from "../src/axios";
import { createContext, useContext, useEffect, useState } from "react";

const SkillContext = createContext({});

export const useSkill = () => {
  return useContext(SkillContext);
};

export const SkillProvider = ({ children }) => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getSkills = async () => {
    const response = await axios({
      method: "GET",
      url: "/skill/",
    });
    setSkills(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    getSkills();
  }, []);

  let skillContext = {
    allSkills: skills,
  };
  if (isLoading) return;
  return <SkillContext.Provider value={skillContext}>{children}</SkillContext.Provider>;
};
