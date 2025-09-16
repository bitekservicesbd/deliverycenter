import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmationModalProps {
    show: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
}

export default function DeleteConfirmationModal({
    show,
    onClose,
    onConfirm,
    title = 'Confirm Delete',
    message = 'Are you sure you want to delete this item? This action cannot be undone.',
    confirmButtonText = 'Delete',
    cancelButtonText = 'Cancel',
}: DeleteConfirmationModalProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose}></div>

            {/* Modal panel */}
            <div className="relative w-full max-w-md transform rounded-xl bg-white p-6 shadow-2xl transition-all dark:bg-slate-900">
                <div className="flex items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4 flex-1">
                        <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-300">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-slate-300">{message}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                    <Button onClick={onClose} variant="outline" className="px-4 py-2 text-sm">
                        {cancelButtonText}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 dark:bg-red-900 dark:hover:bg-red-600"
                    >
                        {confirmButtonText}
                    </Button>
                </div>
            </div>
        </div>
    );
}
