import Guest from "@/Layouts/GuestLayout"
import SessionCard, { SessionCardData } from "@/Components/SessionCard"
import { Head } from "@inertiajs/react"

type GameSession = SessionCardData

interface IndexProps {
    sessions: GameSession[]
}

export default function Index({ sessions }: IndexProps) {
    return (
        <>
            <Head title="Game Session" />
            <Guest>
                <div className="w-full flex flex-col">
                    <div className="flex flex-row justify-between flex-1">
                        <h1 className="text-3xl font-bold">Shuttle Queue</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Add Session
                        </button>
                    </div>
                    {sessions.length > 0 ? (
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sessions.map((session) => (
                                <SessionCard key={session.id} session={session} />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 w-full bg-gray-100 py-4 ">
                            <p className="text-gray-500">No sessions found.</p>
                        </div>
                    )}
                </div>
            </Guest>
        </>
    )
}