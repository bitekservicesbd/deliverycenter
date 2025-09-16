import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PasswordModal({ open, onClose, tenantId, tenantEmail }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { errors } = usePage().props;

    const handleSubmit = () => {
        if (!tenantId) return;

        router.post(
            route('user.panel.password.change'),
            {
                tenant_id: tenantId,
                tenant_email: tenantEmail,
                old_password: oldPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword,
            },
            {
                onSuccess: () => {
                    onClose();
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                },
            },
        );
    };

    useEffect(() => {
        if (!open) {
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        }
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
            <div className="w-full max-w-md rounded-lg bg-white p-6 dark:bg-slate-900" onClick={(e) => e.stopPropagation()}>
                <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-300">Change Password</h2>

                <Input type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                {errors.old_password && <p className="text-sm text-red-600">{errors.old_password}</p>}

                <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-4"
                />
                {errors.new_password && <p className="text-sm text-red-600">{errors.new_password}</p>}

                <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-4"
                />
                {errors.new_password_confirmation && <p className="text-sm text-red-600">{errors.new_password_confirmation}</p>}

                <p className="text-sm text-red-600">{errors.error}</p>

                <div className="mt-6 flex justify-end space-x-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>Update</Button>
                </div>
            </div>
        </div>
    );
}
