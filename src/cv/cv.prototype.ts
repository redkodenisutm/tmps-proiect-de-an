import { CV } from "@prisma/client";
import CVBuilder from "./cv.builder";

interface ICVPrototype {
  clone: () => CV;
}

class CVPrototype implements ICVPrototype {
  private cv: CV;

  constructor(cv: CV) {
    this.cv = cv;
  }

  clone = (): CV => {
    const builder = new CVBuilder();

    builder.setUser(this.cv.userId);

    const { photo, firstName, lastName, birthdate, sex } = this.cv;
    builder.setGeneral(photo, firstName, lastName, birthdate, sex);

    builder.setLocation(this.cv.city, this.cv.canDisclocate);

    builder.setContact(this.cv.email, this.cv.phone);

    builder.setExperience(this.cv.experience);

    builder.setEducation(this.cv.education);

    builder.setAditional(this.cv.aditional);

    builder.setParentCvId(this.cv.id);

    return builder.getCV();
  };
}

export default CVPrototype;
