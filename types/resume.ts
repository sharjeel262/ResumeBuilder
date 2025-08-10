export type Resume = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  address?: string;
  title?: string;
  summary?: string;
  created_at?: string;
};

export type Education = {
  id?: string;
  resume_id: string;
  degree: string;
  university: string;
  year: string;
};

export type Project = {
  id?: string;
  resume_id: string;
  name: string;
  description?: string;
};

export type Experience = {
  id?: string;
  resume_id: string;
  job_title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type Skill = {
  id?: string;
  resume_id: string;
  skill: string;
};

export type OtherSkill = Skill;

