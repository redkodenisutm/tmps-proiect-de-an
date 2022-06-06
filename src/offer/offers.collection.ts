import { Offer } from "@prisma/client";

class OffersCollection {
  offers: Offer[];
  constructor() {
    this.offers = [];
  }

  addOffer(offer: Offer) {
    this.offers.push(offer);
  }

  accept(visitor) {
    return visitor.visit(this);
  }
}

export default OffersCollection;
