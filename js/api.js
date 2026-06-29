// ===== API SERVICE MODULE =====
// Siap untuk integrasi backend. Saat ini menggunakan mock data.
// Ganti fetch() dengan endpoint backend saat deploy.

const API = {
    // Base configuration
    baseUrl: window.API_CONFIG?.BASE_URL || '',
    apiVersion: window.API_CONFIG?.API_VERSION || 'v1',

    // Helper: Build full URL
    url(endpoint) {
        return `${this.baseUrl}/api/${this.apiVersion}${endpoint}`;
    },

    // Helper: Request with auth header
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('auth_token');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };

        try {
            // TODO: Uncomment saat backend siap
            // const response = await fetch(this.url(endpoint), { ...options, headers });
            // if (!response.ok) throw new Error(`HTTP ${response.status}`);
            // return await response.json();

            // Sementara: return mock data
            console.log(`[API Mock] ${options.method || 'GET'} ${endpoint}`);
            return { success: true, data: null };
        } catch (error) {
            console.error('[API Error]', error);
            throw error;
        }
    },

    // ===== CHAT APIs =====

    async getPersonalChats() {
        // GET /api/v1/chats/personal
        return MOCK_DATA.personalChats;
    },

    async getGroupMessages() {
        // GET /api/v1/chats/group/messages
        return MOCK_DATA.groupMessages;
    },

    async sendGroupMessage(text) {
        // POST /api/v1/chats/group/messages
        // Body: { content: text, type: 'text' }
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');
        return {
            id: 'msg_' + Date.now(),
            sender: 'me',
            type: 'outgoing',
            text: text,
            time: timeStr,
            read: false
        };
    },

    async getGroupInfo() {
        // GET /api/v1/chats/group
        return MOCK_DATA.groupInfo;
    },

    // ===== SCHEDULE APIs =====

    async getSchedules(filter = 'all') {
        // GET /api/v1/schedules?filter={filter}
        return MOCK_DATA.schedules;
    },

    async createSchedule(data) {
        // POST /api/v1/schedules
        // Body: { title, project, time, desc, status, members }
        return { success: true, id: 'sch_' + Date.now() };
    },

    async updateSchedule(id, data) {
        // PATCH /api/v1/schedules/{id}
        return { success: true };
    },

    async deleteSchedule(id) {
        // DELETE /api/v1/schedules/{id}
        return { success: true };
    },

    // ===== NOTE APIs =====

    async getNotes() {
        // GET /api/v1/notes
        return MOCK_DATA.notes;
    },

    async createNote(data) {
        // POST /api/v1/notes
        // Body: { title, content, tags }
        return { success: true, id: 'note_' + Date.now() };
    },

    async updateNote(id, data) {
        // PATCH /api/v1/notes/{id}
        return { success: true };
    },

    async deleteNote(id) {
        // DELETE /api/v1/notes/{id}
        return { success: true };
    },

    // ===== CONTACT APIs =====

    async addContact(name, otp) {
        // POST /api/v1/contacts
        // Body: { name, otp_code: otp }
        return { success: true, id: 'contact_' + Date.now() };
    },

    async getContacts() {
        // GET /api/v1/contacts
        return MOCK_DATA.personalChats;
    },

    // ===== USER APIs =====

    async getProfile() {
        // GET /api/v1/profile
        return AppState.currentUser;
    },

    async updateProfile(data) {
        // PATCH /api/v1/profile
        // Body: { name, email, avatar, bio }
        return { success: true };
    },

    async getGallery() {
        // GET /api/v1/gallery
        return MOCK_DATA.gallery;
    },

    // ===== AUTH APIs =====

    async login(credentials) {
        // POST /api/v1/auth/login
        // Body: { email, password }
        // Response: { token, user }
        return { success: true, token: 'mock_token', user: AppState.currentUser };
    },

    async logout() {
        // POST /api/v1/auth/logout
        localStorage.removeItem('auth_token');
        return { success: true };
    },

    async register(data) {
        // POST /api/v1/auth/register
        // Body: { name, email, password }
        return { success: true };
    },

    // ===== WEBSOCKET (for real-time) =====

    initWebSocket() {
        // TODO: Connect to WebSocket server
        // const ws = new WebSocket(window.API_CONFIG.WS_URL || 'wss://your-domain.com/ws/v1/chat');
        // ws.onopen = () => console.log('WS connected');
        // ws.onmessage = (e) => app.handleRealtimeMessage(JSON.parse(e.data));
        // ws.onclose = () => setTimeout(() => this.initWebSocket(), 3000); // Reconnect
        console.log('[WS] WebSocket integration ready - uncomment to activate');
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = API;
}
