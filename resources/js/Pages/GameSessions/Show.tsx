import Guest from "@/Layouts/GuestLayout"
import StatusBadge from "@/Components/StatusBadge"
import { Head, Link } from "@inertiajs/react"
import { useState } from "react"

interface CourtData {
    id: number
    court_number: number
    game_session_id: number
}

interface PlayerData {
    id: number
    player_name: string
    gender: string
    player_skill: string
    status: string
    idle_time: string | null
}

interface MatchData {
    id: number
    court_id: number
    match_status: string
    team1_score: number
    team2_score: number
    winner_team: number | null
    court?: CourtData
}

interface SessionDetail {
    id: number
    session_name: string
    status: string
    session_date: string
    players: PlayerData[]
    courts: CourtData[]
    matches: MatchData[]
}

interface ShowProps {
    session: { data: SessionDetail }
}

type Tab = "players" | "courts" | "matches"

const TABS: { key: Tab; label: string }[] = [
    { key: "players", label: "Players" },
    { key: "courts", label: "Courts" },
    { key: "matches", label: "Matches" },
]

export default function Show({ session }: ShowProps) {
    const [activeTab, setActiveTab] = useState<Tab>("players")
    const { data: sessionData } = session

    return (
        <>
            <Head title={sessionData.session_name} />
            <Guest>
                <div className="w-full flex flex-col">
                    <Link
                        href={route("session.index")}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        &larr; Back to sessions
                    </Link>

                    <div className="mt-2 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{sessionData.session_name}</h1>
                            <p className="text-sm text-gray-500">{sessionData.session_date}</p>
                        </div>
                        <StatusBadge status={sessionData.status} />
                    </div>

                    <div className="mt-6 border-b border-gray-200">
                        <nav className="-mb-px flex gap-6">
                            {TABS.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`border-b-2 px-1 pb-3 text-sm font-medium transition ${
                                        activeTab === tab.key
                                            ? "border-blue-500 text-blue-600"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="mt-6">
                        {activeTab === "players" && (
                            sessionData.players.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {sessionData.players.map((player) => (
                                        <div
                                            key={player.id}
                                            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                {player.player_name}
                                            </h2>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm capitalize text-gray-500">
                                                    {player.gender} &middot; {player.player_skill}
                                                </span>
                                                <StatusBadge status={player.status} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState label="No players found." />
                            )
                        )}

                        {activeTab === "courts" && (
                            sessionData.courts.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {sessionData.courts.map((court) => (
                                        <div
                                            key={court.id}
                                            className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <h2 className="text-lg font-semibold text-gray-900">
                                                Court {court.court_number}
                                            </h2>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState label="No courts found." />
                            )
                        )}

                        {activeTab === "matches" && (
                            sessionData.matches.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                    {sessionData.matches.map((match) => (
                                        <div
                                            key={match.id}
                                            className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                                        >
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-lg font-semibold text-gray-900">
                                                    {match.court ? `Court ${match.court.court_number}` : "Court TBD"}
                                                </h2>
                                                <StatusBadge status={match.match_status} />
                                            </div>
                                            <p className="text-sm text-gray-500">
                                                {match.team1_score} - {match.team2_score}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState label="No matches found." />
                            )
                        )}
                    </div>
                </div>
            </Guest>
        </>
    )
}

function EmptyState({ label }: { label: string }) {
    return (
        <div className="w-full bg-gray-100 py-4">
            <p className="text-gray-500">{label}</p>
        </div>
    )
}
