import { Link } from "@inertiajs/react"

export interface SessionCardData {
    id: number
    session_name: string
    status: string
    session_date: string
    players_count?: number
}

interface SessionCardProps {
    session: SessionCardData
    onEdit?: (session: SessionCardData) => void
}

const STATUS_STYLES: Record<string, { label: string; color: string }> = {
    completed: { label: "Completed", color: "#91C579" },
    active: { label: "In Progress", color: "#3B82F6" },
    ongoing: { label: "In Progress", color: "#3B82F6" },
    inactive: { label: "Pending", color: "#D9A441" },
    cancelled: { label: "Cancelled", color: "#E5484D" },
}

function StatusBadge({ status }: { status: string }) {
    const style = STATUS_STYLES[status] ?? { label: status, color: "#9CA3AF" }

    return (
        <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
            style={{ backgroundColor: `${style.color}0A`, color: style.color }}
        >
            {style.label}
        </span>
    )
}

export default function SessionCard({ session, onEdit }: SessionCardProps) {
    function handleEditClick(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        onEdit?.(session)
    }

    return (
        <Link
            href={route("session.show", session.id)}
            className="group relative flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-sm"
        >
            <button
                type="button"
                onClick={handleEditClick}
                className="absolute right-4 top-4 rounded-md p-1.5 text-black opacity-0 transition hover:bg-gray-100 hover:text-gray-700 group-hover:opacity-100"
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

            <h2 className="pr-8 text-lg font-semibold text-gray-900">
                {session.session_name}
            </h2>

            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                    {session.players_count ?? 0} players
                </span>
                <StatusBadge status={session.status} />
            </div>
        </Link>
    )
}
