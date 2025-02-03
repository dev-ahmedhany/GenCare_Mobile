const menuItems = [
  {
    icon: 'person',
    title: 'Profile',
    description: 'Manage your account',
    route: '/(home)/(home-components)/(pages-components)/(profile-pages-components)'
  },
  {
    icon: 'settings',
    title: 'Admin Panel',
    description: 'Manage system settings',
    route: '/admin',
    adminOnly: true
  },
  // ... باقي العناصر
];

const mockNotifications = [
  {
    id: 1,
    icon: 'medical',
    title: 'New Test Results',
    description: 'Your recent test results are now available. Click to view the details.',
    time: '2m ago',
    isRead: false
  },
  {
    id: 2,
    icon: 'calendar',
    title: 'Appointment Reminder',
    description: 'You have an upcoming appointment tomorrow at 10:00 AM.',
    time: '1h ago',
    isRead: false
  },
  {
    id: 3,
    icon: 'document-text',
    title: 'New Article Available',
    description: 'Check out our latest article about prenatal care tips.',
    time: '3h ago',
    isRead: true
  },
  // يمكنك إضافة المزيد من الإشعارات حسب احتياجات التطبيق
];

export default {
  menuItems,
  mockNotifications
}; 