/**
 * Scuba diving courses from Koh Tao Scuba Club
 * Reference: https://www.kohtaoscubaclub.com/scuba-diving-courses-koh-tao
 */
export interface CoursePackage {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number; // THB
  highlights?: string[];
}

export const SCUBA_COURSES: CoursePackage[] = [
  {
    id: "try-scuba",
    name: "Basic Diver",
    description: "1 day, 2 dive experience incl. 1 night accommodation",
    duration: "1 day",
    price: 3250,
    highlights: ["2 dives", "1 night accommodation", "Beginner friendly"],
  },
  {
    id: "open-water",
    name: "Open Water",
    description: "3 days, incl. certification & accommodation",
    duration: "3 days",
    price: 9500,
    highlights: ["Full certification", "Accommodation included", "PADI certified"],
  },
  {
    id: "advanced-open-water",
    name: "Advanced Adventurer",
    description: "2 days, 5 adventure dives incl. accommodation",
    duration: "2 days",
    price: 9000,
    highlights: ["5 adventure dives", "Accommodation included", "Advanced certification"],
  },
  {
    id: "stress-rescue",
    name: "Stress & Rescue",
    description: "2 day, 4 dives incl. 2 night accommodation",
    duration: "2 days",
    price: 9000,
    highlights: ["4 dives", "2 night accommodation", "Rescue certification"],
  },
  {
    id: "refresh",
    name: "Refresh",
    description: "1 dive at swimming pool or ocean",
    duration: "Half day",
    price: 1500,
    highlights: ["1 dive", "Pool or ocean", "Skill refresh"],
  },
  {
    id: "fun-dives",
    name: "Buffet Fun Dives",
    description: "1 week unlimited fun diving, 28 dives total",
    duration: "1 week",
    price: 13500,
    highlights: ["28 dives", "Unlimited diving", "1 week package"],
  },
  {
    id: "divemaster",
    name: "Dive Master",
    description: "Up to 3 months unlimited diving & training",
    duration: "Up to 3 months",
    price: 35000,
    highlights: ["Unlimited diving", "Professional training", "Up to 3 months"],
  },
  {
    id: "instructor",
    name: "Instructor Training Course",
    description: "2 Week Instructor Training Course",
    duration: "2 weeks",
    price: 75000,
    highlights: ["Instructor certification", "2 weeks intensive", "Professional level"],
  },
];
