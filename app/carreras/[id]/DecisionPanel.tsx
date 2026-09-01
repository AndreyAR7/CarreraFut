import { ClubOfferOption } from "@/lib/game/clubOffers";
import { getEventByKey } from "@/lib/game/eventEngine";
import { CareerDetail } from "@/lib/game/queries";
import { EventCategory } from "@/lib/game/types";
import { DecisionInteractive, DecisionState, EventOptionPayload } from "./DecisionInteractive";

export function DecisionPanel({ career }: { career: CareerDetail }) {
  let state: DecisionState;

  if (career.pendingOffer) {
    const options: ClubOfferOption[] = JSON.parse(career.pendingOffer.optionsJson);
    state = {
      type: "offer",
      title: career.pendingOffer.title,
      description: career.pendingOffer.description,
      options,
    };
  } else if (career.pendingEvent) {
    const options: EventOptionPayload[] = JSON.parse(career.pendingEvent.optionsJson);
    const definition = getEventByKey(career.pendingEvent.eventKey);
    const category = (definition?.category as EventCategory | undefined) ?? "PERSONAL";
    state = {
      type: "event",
      title: career.pendingEvent.title,
      description: career.pendingEvent.description,
      category,
      options,
    };
  } else {
    state = { type: "none" };
  }

  return <DecisionInteractive careerId={career.id} state={state} />;
}
