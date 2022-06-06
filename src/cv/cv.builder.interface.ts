import { CV } from "@prisma/client";
import { SexEnum } from "./cv.dto";

interface IBuilder {
  setGeneral: (
    photo: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    sex: SexEnum,
  ) => void;
  setLocation: (city: string, canDisclocate: boolean) => void;
  setContact: (email: string, phone: string) => void;
  setExperience: (experience: string) => void;
  setEducation: (education: string) => void;
  setAditional: (aditional: string) => void;
  getCV: () => CV;
}

export default IBuilder;
