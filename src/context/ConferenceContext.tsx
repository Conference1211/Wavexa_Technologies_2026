import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useParams } from "react-router-dom";
import { getConference, type Conference } from "@/data/conferences";

const ConferenceContext = createContext<Conference | undefined>(undefined);

export function ConferenceProvider({ children }: { children: ReactNode }) {
  const { conferenceId } = useParams();
  const conference = useMemo(() => getConference(conferenceId), [conferenceId]);
  return <ConferenceContext.Provider value={conference}>{children}</ConferenceContext.Provider>;
}

export function useConference() {
  const conference = useContext(ConferenceContext);
  if (!conference) throw new Error("No valid conference is selected for this route.");
  return conference;
}
