import Guest from "@/Layouts/GuestLayout"
import SessionCard, { SessionCardData } from "@/Components/SessionCard"
import { Head, useForm } from "@inertiajs/react"
import Modal from "@/Components/Modal"
import { useState } from "react"

type GameSession = SessionCardData

interface ResourceCollection<T> {
    data: T[]
}

interface IndexProps {
    sessions: ResourceCollection<GameSession>
}

export default function Index({ sessions }: IndexProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);
    console.log('sessions', sessions.data);
    const { data, setData, post, put, delete: destroy} = useForm({
        'session_name': '',
        'session_date': '',
    })

    const handleAddSession = (e: React.FormEvent) => {
        e.preventDefault();

        // Logic to handle adding a new session
        post(route('session.store'), {
            onSuccess: () => {
                setShowCreateModal(false);
                setData('session_name', '');
            },
        });
    }

    const handleUpdateSession = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedSessionId === null) return;

        // Logic to handle updating a session
        put(route('session.update', selectedSessionId), {
            onSuccess: () => {
                setShowUpdateModal(false);
                setData('session_name', '');
            },
        });
    }

    const handleDeleteSession = (e: React.MouseEvent) => {
        e.preventDefault();
        if (selectedSessionId === null) return;

        // Logic to handle deleting a session
        destroy(route('session.destroy', selectedSessionId), {
            onSuccess: () => {
                setShowDeleteModal(false);
                setData('session_name', '');
            },
        });
    }


    return (
        <>
            <Head title="Game Session" />
            <Guest>
                <div className="w-full flex flex-col">
                    <div className="flex flex-row justify-between flex-1">
                        <h1 className="text-3xl font-bold">Shuttle Queue</h1>
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setShowCreateModal(true)}
                        >
                            Add Session
                        </button>
                    </div>
                    {sessions.data.length > 0 ? (
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {sessions.data.map((session) => (
                                <SessionCard key={session.id} session={session}
                                    onEdit={() => {
                                        setSelectedSessionId(session.id);
                                        setData('session_name', session.session_name);
                                        setData('session_date', session.session_date_raw);
                                        setShowUpdateModal(true);
                                    }}
                                    onDelete={() => {
                                        setSelectedSessionId(session.id);
                                        setData('session_name', session.session_name);
                                        setData('session_date', session.session_date_raw);
                                        setShowDeleteModal(true);
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="mt-6 w-full bg-gray-100 py-4 ">
                            <p className="text-gray-500">No sessions found.</p>
                        </div>
                    )}
                </div>
                <Modal
                    maxWidth="md"
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                >
                    <form className="p-6" onSubmit={handleAddSession}>
                        <h2 className="text-xl font-bold mb-2">Create Session</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="session_name"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Session Name
                            </label>
                            <input
                                type="text"
                                id="session_name"
                                name="session_name"
                                placeholder="Enter session name"
                                value= {data.session_name}
                                onChange={(e) => setData('session_name', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="session_date"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Session Date
                            </label>
                            <input
                                type="date"
                                id="session_date"
                                name="session_date"
                                value={data.session_date}
                                onChange={(e) => setData('session_date', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>  
                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Create Session
                            </button>
                        </div>
                    </form> 
                </Modal>
                <Modal
                    maxWidth="md"
                    show={showUpdateModal}
                    onClose={() => setShowUpdateModal(false)}
                >
                    <form className="p-6" onSubmit={handleUpdateSession}>
                        <h2 className="text-xl font-bold mb-2">Update Session</h2>
                        <div className="mb-4">
                            <label
                                htmlFor="session_name"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Session Name
                            </label>
                            <input
                                type="text"
                                id="session_name"
                                name="session_name"
                                placeholder="Enter session name"
                                value= {data.session_name}
                                onChange={(e) => setData('session_name', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="session_date"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Session Date
                            </label>
                            <input
                                type="date"
                                id="session_date"
                                name="session_date"
                                value={data.session_date}
                                onChange={(e) => setData('session_date', e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>  
                        <div className="flex items-center justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => setShowUpdateModal(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Update
                            </button>
                        </div>
                    </form> 
                </Modal>
                <Modal
                    show={showDeleteModal}
                    maxWidth="sm"
                    onClose={() => setShowDeleteModal(false)}
                >
                    <div className="flex flex-col gap-2 p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Delete Session</h2>
                        <p>Are you sure you want to delete this session?</p>
                        <div className="flex items-center justify-end gap-4 pt-4">
                            <button
                                type="button"
                                onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={handleDeleteSession}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </Guest>
        </>
    )
}