import { Link } from "@inertiajs/react"
import StatusBadge from "@/Components/StatusBadge"

export interface SessionCardData {
    id: number
    session_name: string
    status: string
    session_date: string
    session_date_raw: string
    players_count?: number
}

interface SessionCardProps {
    session: SessionCardData
    onEdit?: (session: SessionCardData) => void
    onDelete?: (session: SessionCardData) => void
}

export default function SessionCard({ session, onEdit, onDelete }: SessionCardProps) {
    function handleEditClick(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        onEdit?.(session)
    }

    function handleDeleteClick(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        onDelete?.(session)
    }

    return (
        <Link
            href={route("session.show", session.id)}
            className="group relative flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:bg-gray-100"
        >
            <button
                type="button"
                onClick={handleEditClick}
                className="absolute right-12 top-4 rounded-md p-1.5 text-black transition hover:bg-gray-100 hover:text-gray-700"
                aria-label={`Edit ${session.session_name}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487a2.06 2.06 0 0 1 2.915 2.914L8.5 18.678l-4 1 1-4L16.862 4.487Z"
                    />
                </svg>
            </button>
            <button
                type="button"
                onClick={handleDeleteClick}
                className="absolute right-4 top-4 rounded-md p-1.5 text-black transition hover:bg-red-50 hover:text-red-600"
                aria-label={`Delete ${session.session_name}`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 7h12M9.5 7V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2m-8 0 .8 12a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8L18 7M10 11v6m4-6v6"
                    />
                </svg>
            </button>
            <div className="flex flex-col gap-0">
                <h2 className="pr-8 text-lg font-semibold text-gray-900">
                    {session.session_name}
                </h2>
                <p className="text-gray-600 text-xs">{session.session_date}</p>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {session.players_count ?? 0} players
                </span>
                <StatusBadge status={session.status} />
            </div>
        </Link>
    )
}
