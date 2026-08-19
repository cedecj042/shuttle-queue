import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-100 pt-6">
            <div className="w-full overflow-hidden px-6 sm:max-w-7xl mx-auto pt-6">
                {children}
            </div>
        </div>
    );
}
