import { Apply } from "@prisma/client";
import QuickApplyIterator from "./apply.iterator";

class AppliesCollection {
  applies: Apply[];

  constructor(applies: Apply[]) {
    this.applies = applies;
  }

  getQuicksIterator() {
    return new QuickApplyIterator(this.applies);
  }
}

export default AppliesCollection;
