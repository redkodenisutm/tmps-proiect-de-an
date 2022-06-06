class RecentOffersVisitor {
  visit(offersCollection) {
    const recentOffers = [];
    const offersLen = offersCollection.offers.length;
    let index = 0;

    for (let i = 0; i < offersLen; i++) {
      const offer = offersCollection.offers[i];

      if (
        offer.datePublished > new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
      ) {
        recentOffers[index] = offer;
        index++;
      }
    }
    return recentOffers;
  }
}

export default RecentOffersVisitor;
