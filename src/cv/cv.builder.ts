import { CV } from "@prisma/client";
import IBuilder from "./cv.builder.interface";

class CVBuilder implements IBuilder {
  cv: CV;

  constructor() {
    this.cv = {} as CV;
  }

  setUser = (userId: number) => {
    console.log(this.cv);

    this.cv.userId = userId;
  };

  setGeneral = (
    photo: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    sex: string,
  ) => {
    this.cv.photo = photo;
    this.cv.firstName = firstName;
    this.cv.lastName = lastName;
    this.cv.birthdate = birthdate;
    this.cv.sex = sex;
  };

  setLocation = (city: string, canDisclocate: boolean) => {
    this.cv.city = city;
    this.cv.canDisclocate = canDisclocate;
  };

  setContact = (email: string, phone: string) => {
    this.cv.email = email;
    this.cv.phone = phone;
  };

  setExperience = (experience: string) => {
    this.cv.experience = experience;
  };

  setEducation = (education: string) => {
    this.cv.education = education;
  };

  setAditional = (aditional: string) => {
    this.cv.aditional = aditional;
  };

  setParentCvId = (parentCvId: number) => {
    this.cv.parentCvId = parentCvId;
  };

  getCV = (): CV => {
    return this.cv;
  };
}

export default CVBuilder;
