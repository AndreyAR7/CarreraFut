import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getCareerDetail } from "@/lib/game/queries";
import { Celebration } from "./Celebration";
import { DecisionPanel } from "./DecisionPanel";
import { PlayerCard } from "./PlayerCard";
import { PlayerHeader } from "./PlayerHeader";
import { RetiredSummary } from "./RetiredSummary";
import { SeasonTable } from "./SeasonTable";

export default async function CareerPage({ params }: PageProps<"/carreras/[id]">) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) notFound();

  const career = await getCareerDetail(id, user.id);
  if (!career) notFound();

  const celebration = career.celebrationJson ? JSON.parse(career.celebrationJson) : null;

  if (career.status === "RETIRED") {
    return (
      <>
        {celebration && <Celebration careerId={career.id} data={celebration} />}
        <RetiredSummary career={career} />
      </>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {celebration && <Celebration careerId={career.id} data={celebration} />}
      <div className="flex flex-col gap-6">
        <PlayerHeader career={career} />
        <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr]">
          <div className="flex flex-col gap-6">
            <DecisionPanel career={career} />
            <PlayerCard career={career} />
          </div>
          <SeasonTable career={career} />
        </div>
      </div>
    </div>
  );
}
