import React from "react";
import Stack from "../../../../primitives/Stack/Stack";
import "./SkillList.css";
import { SKILLS } from "../../../../../data/skills";

type SkillListItem = {
  skill: string;
};
const SkillListItem = ({ skill }: SkillListItem) => {
  return <div className="SkillListItem">{skill}</div>;
};

type Props = {};

const SkillList = (props: Props) => {
  return (
    <Stack className="SkillList" style={{ flex: 1 }}>
      <h3>Skills</h3>
      <Stack horizontal style={{ flexWrap: "wrap", gap: "var(--space-0-75)" }}>
        {SKILLS.map((skill) => (
          <SkillListItem key={skill} skill={skill} />
        ))}
      </Stack>
    </Stack>
  );
};

export default SkillList;
