
import {
  collection,
  onSnapshot,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import { db } from "@/firebase";
import {
  CONFERENCES,
  type Conference,
} from "@/data/conferences";

export interface FirestoreConference {
  id: string;
  conferenceId: string;
  slug: string;
  title: string;
  date: string;
  venue: string;
  status: string;
  tracks?: unknown[];
  [key: string]: unknown;
}

function toFirestoreConference(
  doc: QueryDocumentSnapshot<DocumentData>,
): FirestoreConference {
  const data = doc.data();

  return {
    ...data,
    id: doc.id,
    conferenceId:
      typeof data.conferenceId === "string"
        ? data.conferenceId
        : doc.id,
    slug:
      typeof data.slug === "string"
        ? data.slug
        : doc.id,
    title:
      typeof data.title === "string"
        ? data.title
        : "Untitled Conference",
    date:
      typeof data.date === "string"
        ? data.date
        : "Date to be announced",
    venue:
      typeof data.venue === "string"
        ? data.venue
        : "To be announced",
    status:
      typeof data.status === "string"
        ? data.status
        : "Draft",
  };
}

/**
 * Subscribe to conferences stored in Firestore.
 * The caller must unsubscribe when it no longer needs updates.
 */
export function subscribeToFirestoreConferences(
  onData: (conferences: FirestoreConference[]) => void,
  onError?: (error: Error) => void,
) {
  return onSnapshot(
    collection(db, "conferences"),
    (snapshot) => {
      const conferences = snapshot.docs.map(toFirestoreConference);
      onData(conferences);
    },
    (error) => {
      onError?.(error);
    },
  );
}

/**
 * Convert Firestore metadata into the existing public card format.
 * Full conference pages will keep using the legacy data until
 * their complete Firestore fields have been safely mapped.
 */
export function mergeConferenceCards(
  firestoreConferences: FirestoreConference[],
) {
  const staticBySlug = new Map(
    CONFERENCES.map((conference) => [
      conference.slug,
      conference,
    ]),
  );

  const firestoreBySlug = new Map(
    firestoreConferences.map((conference) => [
      conference.slug,
      conference,
    ]),
  );

  const merged = new Map<string, {
    id: string;
    slug: string;
    name: string;
    dates: string;
    venue: string;
    image: string;
    status: string;
  }>();

  // Preserve existing static cards, using Firestore metadata
  // where a matching document exists.
  for (const conference of CONFERENCES) {
    const live = firestoreBySlug.get(conference.slug);

    merged.set(conference.slug, {
      id: conference.id,
      slug: conference.slug,
      name: live?.title ?? conference.name,
      dates: live?.date ?? conference.dates,
      venue: live?.venue ?? conference.venue,
      image: conference.image,
      status: live?.status ?? "Published",
    });
  }

  // Add new Firestore conferences not yet in the static list.
  for (const conference of firestoreConferences) {
    if (merged.has(conference.slug)) continue;

    merged.set(conference.slug, {
      id: conference.conferenceId,
      slug: conference.slug,
      name: conference.title,
      dates: conference.date,
      venue: conference.venue,
      image: "",
      status: conference.status,
    });
  }

  return Array.from(merged.values());
}

/**
 * Return the existing static record for now.
 * Full dynamic page mapping will be added after the card
 * integration and Firestore schema migration are verified.
 */
export function getStaticConferenceFallback(
  conferenceId?: string | null,
): Conference | undefined {
  if (!conferenceId) return undefined;

  return CONFERENCES.find(
    (conference) =>
      conference.id === conferenceId ||
      conference.slug === conferenceId,
  );
}
