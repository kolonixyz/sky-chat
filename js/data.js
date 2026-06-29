// ===== MOCK DATA & STATE MANAGEMENT =====
// TODO: Ganti dengan fetch dari backend API saat integrasi
// API Endpoints yang direncanakan:
// GET    /api/v1/chats/personal     -> daftar chat personal
// GET    /api/v1/chats/group         -> info grup
// GET    /api/v1/chats/group/messages-> pesan grup
// POST   /api/v1/chats/group/messages-> kirim pesan
// GET    /api/v1/schedules          -> daftar jadwal
// GET    /api/v1/notes              -> daftar catatan
// POST   /api/v1/contacts           -> tambah kontak
// GET    /api/v1/profile            -> profil user
// GET    /api/v1/gallery            -> media gallery
// WS     /ws/v1/chat                -> WebSocket real-time

const MOCK_DATA = {
    personalChats: [
        {
            id: 'chat_1',
            name: 'Ahmad Rizky',
            avatar: 'https://i.pravatar.cc/150?img=11',
            status: 'online',
            isPinned: true,
            lastMessage: {
                text: 'Halo, apakah desain UI sudah selesai? Saya tunggu ya 🚀',
                time: '10:42',
                isUnread: true,
                unreadCount: 2,
                type: 'text'
            }
        },
        {
            id: 'chat_2',
            name: 'Dewi Lestari',
            avatar: 'https://i.pravatar.cc/150?img=5',
            status: 'online',
            isPinned: false,
            lastMessage: {
                text: 'Oke, nanti saya cek lagi file-nya',
                time: '09:15',
                isUnread: false,
                isRead: true,
                type: 'text'
            }
        },
        {
            id: 'chat_3',
            name: 'Budi Santoso',
            avatar: 'https://i.pravatar.cc/150?img=3',
            status: 'typing',
            isPinned: false,
            lastMessage: {
                text: 'sedang mengetik...',
                time: 'Sekarang',
                isUnread: true,
                type: 'typing'
            }
        },
        {
            id: 'chat_4',
            name: 'Siti Aminah',
            avatar: 'https://i.pravatar.cc/150?img=9',
            status: 'offline',
            isPinned: false,
            lastMessage: {
                text: 'Foto',
                time: 'Kemarin',
                isUnread: true,
                unreadCount: 1,
                type: 'image'
            }
        },
        {
            id: 'chat_5',
            name: 'Rudi Hartono',
            avatar: 'https://i.pravatar.cc/150?img=12',
            status: 'online',
            isPinned: false,
            lastMessage: {
                text: 'Terima kasih banyak atas bantuannya!',
                time: 'Kemarin',
                isUnread: false,
                isRead: true,
                type: 'text'
            }
        },
        {
            id: 'chat_6',
            name: 'Maya Sari',
            avatar: 'https://i.pravatar.cc/150?img=15',
            status: 'offline',
            isPinned: false,
            lastMessage: {
                text: '0:24',
                time: 'Sen',
                isUnread: false,
                type: 'voice'
            }
        },
        {
            id: 'chat_7',
            name: 'Andi Wijaya',
            avatar: 'https://i.pravatar.cc/150?img=20',
            status: 'offline',
            isPinned: false,
            lastMessage: {
                text: 'Siap, besok saya kabari lagi',
                time: 'Min',
                isUnread: false,
                type: 'text'
            }
        }
    ],

    groupMessages: [
        { id: 'msg_1', sender: 'Ahmad Rizky', senderClass: 'sender-1', type: 'incoming', text: 'Halo semuanya! Selamat datang di Ruang Bebas 👋', time: '10:30', read: true },
        { id: 'msg_2', sender: 'Dewi Lestari', senderClass: 'sender-2', type: 'incoming', text: 'Halo! Senang bisa gabung di sini. Ada yang punya ide untuk fitur baru?', time: '10:32', read: true },
        { id: 'msg_3', sender: 'me', type: 'outgoing', text: 'Saya punya ide nih, gimana kalau kita tambahkan fitur jadwal proyek yang terintegrasi dengan chat? 🤔', time: '10:33', read: true },
        { id: 'msg_4', sender: 'Budi Santoso', senderClass: 'sender-3', type: 'incoming', text: 'Wah ide bagus tuh! Jadi kita bisa langsung diskusi sambil tracking progress proyek.', time: '10:35', read: true },
        { id: 'msg_5', sender: 'Siti Aminah', senderClass: 'sender-4', type: 'incoming', text: 'Setuju! Bisa juga ditambahkan reminder otomatis sebelum deadline proyek.', time: '10:36', read: true },
        { id: 'msg_6', sender: 'me', type: 'outgoing', text: 'Betul banget! Nanti saya buatkan mockup desainnya dulu ya.', time: '10:37', read: true },
        { id: 'msg_7', sender: 'Ahmad Rizky', senderClass: 'sender-1', type: 'incoming', text: 'Siap! Saya bantu dari sisi backend-nya. Kapan kita mulai? 🚀', time: '10:38', read: true },
        { id: 'msg_8', sender: 'Dewi Lestari', senderClass: 'sender-2', type: 'incoming', text: 'Bisa mulai minggu depan? Saya masih finishing proyek yang lain dulu.', time: '10:40', read: true },
        { id: 'msg_9', sender: 'me', type: 'outgoing', text: 'Oke, minggu depan kita kickoff. Saya catat di jadwal proyek ya! 📅', time: '10:42', read: true }
    ],

    groupInfo: {
        name: 'Ruang Bebas',
        members: [
            'https://i.pravatar.cc/150?img=11',
            'https://i.pravatar.cc/150?img=5',
            'https://i.pravatar.cc/150?img=3',
            'https://i.pravatar.cc/150?img=9'
        ],
        activeCount: 8
    },

    schedules: [
        {
            date: 'Hari Ini, 28 Juni 2026',
            items: [
                {
                    id: 'sch_1',
                    title: 'Review Final UI Design',
                    project: 'Proyek CaCiCu-Chat',
                    time: '14:00',
                    ampm: 'WIB',
                    desc: 'Presentasi hasil desain UI kepada stakeholder. Siapkan prototype interaktif dan dokumentasi.',
                    members: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=3'],
                    extraMembers: 5,
                    status: 'urgent',
                    statusLabel: 'Mendesak'
                },
                {
                    id: 'sch_2',
                    title: 'Daily Standup Meeting',
                    project: 'Tim Developer',
                    time: '16:00',
                    ampm: 'WIB',
                    desc: 'Update progress harian, diskusi blocker, dan sinkronisasi prioritas.',
                    members: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=12', 'https://i.pravatar.cc/150?img=20'],
                    extraMembers: 8,
                    status: 'in-progress',
                    statusLabel: 'Berlangsung'
                }
            ]
        },
        {
            date: 'Besok, 29 Juni 2026',
            items: [
                {
                    id: 'sch_3',
                    title: 'Deployment ke Staging',
                    project: 'Proyek CaCiCu-Chat',
                    time: '09:00',
                    ampm: 'WIB',
                    desc: 'Deploy versi beta ke server staging untuk internal testing.',
                    members: ['https://i.pravatar.cc/150?img=3', 'https://i.pravatar.cc/150?img=9'],
                    extraMembers: 0,
                    status: 'pending',
                    statusLabel: 'Menunggu'
                },
                {
                    id: 'sch_4',
                    title: 'Wireframe Approval',
                    project: 'Proyek CaCiCu-Chat',
                    time: '10:00',
                    ampm: 'WIB',
                    desc: 'Persetujuan wireframe dari tim produk dan desain.',
                    members: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=5'],
                    extraMembers: 0,
                    status: 'completed',
                    statusLabel: 'Selesai'
                }
            ]
        },
        {
            date: '30 Juni 2026',
            items: [
                {
                    id: 'sch_5',
                    title: 'User Testing Session',
                    project: 'Proyek CaCiCu-Chat',
                    time: '13:30',
                    ampm: 'WIB',
                    desc: 'Sesi pengujian dengan 5 pengguna untuk mengumpulkan feedback UI/UX.',
                    members: ['https://i.pravatar.cc/150?img=11', 'https://i.pravatar.cc/150?img=5', 'https://i.pravatar.cc/150?img=3'],
                    extraMembers: 2,
                    status: 'pending',
                    statusLabel: 'Menunggu'
                }
            ]
        }
    ],

    notes: [
        {
            id: 'note_1',
            title: 'Spesifikasi API Endpoint',
            date: '28 Jun',
            content: 'Endpoint /api/v1/messages harus menerima payload JSON dengan field: sender_id, receiver_id, content, timestamp. Response harus mengembalikan status 201 dengan message_id.',
            tags: [
                { label: 'Backend', class: 'tag-backend' },
                { label: 'API', class: 'tag-api' }
            ]
        },
        {
            id: 'note_2',
            title: 'Daftar Asset UI',
            date: '27 Jun',
            content: '- Icon set: Font Awesome 6.4\n- Font: Plus Jakarta Sans\n- Color palette: Teal, Indigo, Amber\n- Avatar source: pravatar.cc',
            tags: [
                { label: 'Design', class: 'tag-design' }
            ]
        },
        {
            id: 'note_3',
            title: 'Meeting Notes: Kickoff',
            date: '25 Jun',
            content: 'Tim sepakat menggunakan Socket.io untuk real-time messaging. MongoDB untuk database. Deployment via Vercel untuk frontend dan Railway untuk backend.',
            tags: [
                { label: 'Meeting', class: 'tag-meeting' },
                { label: 'Important', class: 'tag-important' }
            ]
        }
    ],

    gallery: [
        { id: 'gal_1', type: 'placeholder' },
        { id: 'gal_2', type: 'placeholder' },
        { id: 'gal_3', type: 'placeholder' },
        { id: 'gal_4', type: 'placeholder' },
        { id: 'gal_5', type: 'placeholder' },
        { id: 'gal_6', type: 'placeholder' },
        { id: 'gal_7', type: 'placeholder' },
        { id: 'gal_8', type: 'placeholder' },
        { id: 'gal_9', type: 'placeholder' }
    ]
};

// State management
const AppState = {
    currentTab: 'personal',
    currentProjectSubtab: 'jadwal',
    currentUser: {
        id: 'user_1',
        name: 'Anda',
        email: 'anda@cicicu-chat.com',
        avatar: 'https://i.pravatar.cc/150?img=33'
    },
    isLoading: false,
    notifications: 3
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MOCK_DATA, AppState };
}
