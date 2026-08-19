const STATUS_STYLES: Record<string, { label: string; color: string }> = {
    completed: { label: "Completed", color: "#91C579" },
    active: { label: "In Progress", color: "#3B82F6" },
    ongoing: { label: "In Progress", color: "#3B82F6" },
    inactive: { label: "Pending", color: "#D9A441" },
    idle: { label: "Idle", color: "#9CA3AF" },
    cancelled: { label: "Cancelled", color: "#E5484D" },
}

export default function StatusBadge({ status }: { status: string }) {
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
