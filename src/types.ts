export interface ToastNotificationMessage {
    id: string;
    message: string;
    notificationType: ToastNotificationType;
    nodeRef: React.Ref<HTMLDivElement>;
}

export type ToastNotificationType = 'success' | 'info' | 'warning' | 'error';

export const ToastNotification: {
    [key in ToastNotificationType]: string;
} = {
    success: '#22C55E',
    info: '#3B82F6',
    warning: '#F97316',
    error: '#EF4444',
};

export const SampleMessages: {
    [key in ToastNotificationType]: string;
} = {
    success: 'all good!',
    info: 'you are here',
    warning: 'warning!',
    error: 'critical error!',
};
