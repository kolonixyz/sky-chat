// ===== MAIN APP CONTROLLER =====
const app = {
    // ===== STATE =====
    currentTab: 'personal',
    currentProjectSubtab: 'jadwal',

    // ===== INITIALIZATION =====
    init() {
        this.renderPersonalChats();
        this.renderGroupChat();
        this.renderSchedules();
        this.renderNotes();
        this.renderGallery();
        this.setupEventListeners();
        this.setupScrollHandler();

        // Auto-scroll group chat to bottom
        setTimeout(() => {
            const msgs = document.getElementById('groupChatMessages');
            if (msgs) msgs.scrollTop = msgs.scrollHeight;
        }, 100);

        console.log('[App] CaCiCu-Chat initialized');
    },

    // ===== EVENT LISTENERS =====
    setupEventListeners() {
        // Quick chips
        document.querySelectorAll('.quick-chip').forEach(chip => {
            chip.addEventListener('click', function() {
                this.parentElement.querySelectorAll('.quick-chip').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Chat items click feedback
        document.querySelectorAll('.chat-item').forEach(item => {
            item.addEventListener('click', function() {
                this.style.background = 'var(--bg-lighter)';
                setTimeout(() => { this.style.background = ''; }, 150);
            });
        });

        // Group chat input enter key
        const groupInput = document.getElementById('groupChatInput');
        if (groupInput) {
            groupInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendGroupMessage();
            });
        }
    },

    setupScrollHandler() {
        const contentArea = document.getElementById('contentArea');
        const scrollTop = document.getElementById('scrollTop');
        if (contentArea && scrollTop) {
            contentArea.addEventListener('scroll', () => {
                if (contentArea.scrollTop > 300) {
                    scrollTop.classList.add('show');
                } else {
                    scrollTop.classList.remove('show');
                }
            });
        }
    },

    // ===== TAB SWITCHING =====
    switchTab(tabName) {
        document.querySelectorAll('.tab-item').forEach(item => item.classList.remove('active'));
        document.querySelectorAll('.tab-item[data-tab="' + tabName + '"]').forEach(item => item.classList.add('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        document.getElementById('tab-' + tabName).classList.add('active');

        const fab = document.getElementById('fabBtn');
        const icon = fab.querySelector('i');
        if (tabName === 'project') {
            icon.className = 'fas fa-plus';
        } else {
            icon.className = 'fas fa-user-plus';
        }

        if (tabName === 'group') {
            setTimeout(() => {
                const msgs = document.getElementById('groupChatMessages');
                if (msgs) msgs.scrollTop = msgs.scrollHeight;
            }, 100);
        }

        this.currentTab = tabName;
    },

    // ===== PROJECT SUBTAB =====
    switchProjectSubtab(subtab) {
        const jadwalBtn = document.getElementById('subtab-jadwal');
        const catatanBtn = document.getElementById('subtab-catatan');
        const jadwalContent = document.getElementById('project-jadwal');
        const catatanContent = document.getElementById('project-catatan');

        if (subtab === 'jadwal') {
            jadwalBtn.classList.add('active');
            catatanBtn.classList.remove('active');
            jadwalContent.classList.add('active');
            catatanContent.classList.remove('active');
        } else {
            catatanBtn.classList.add('active');
            jadwalBtn.classList.remove('active');
            catatanContent.classList.add('active');
            jadwalContent.classList.remove('active');
        }

        this.currentProjectSubtab = subtab;
    },

    // ===== RENDER: PERSONAL CHATS =====
    renderPersonalChats() {
        const container = document.getElementById('personalChatList');
        if (!container) return;

        const chats = MOCK_DATA.personalChats;
        let html = '';

        chats.forEach(chat => {
            const statusClass = chat.status === 'online' ? 'online' : chat.status === 'typing' ? 'typing' : '';
            const pinnedIcon = chat.isPinned ? '<i class="fas fa-thumbtack pinned-icon"></i>' : '';
            const timeClass = chat.lastMessage.isUnread ? 'unread' : '';
            const msgClass = chat.lastMessage.isUnread ? 'unread' : '';
            const unreadBadge = chat.lastMessage.unreadCount ? 
                `<span class="unread-badge">${chat.lastMessage.unreadCount}</span>` : '';

            let messagePreview = '';
            if (chat.lastMessage.type === 'typing') {
                messagePreview = `<span class="typing-dots"><span></span><span></span><span></span></span> ${chat.lastMessage.text}`;
            } else if (chat.lastMessage.type === 'image') {
                messagePreview = `<i class="fas fa-image"></i> ${chat.lastMessage.text}`;
            } else if (chat.lastMessage.type === 'voice') {
                messagePreview = `<i class="fas fa-microphone"></i> ${chat.lastMessage.text}`;
            } else if (chat.lastMessage.isRead) {
                messagePreview = `<i class="fas fa-check-double read"></i> ${chat.lastMessage.text}`;
            } else {
                messagePreview = chat.lastMessage.text;
            }

            html += `
                <div class="chat-item" onclick="app.openPersonalChat('${chat.name}')">
                    <div class="avatar ${statusClass}">
                        <img src="${chat.avatar}" alt="${chat.name}">
                    </div>
                    <div class="chat-info">
                        <div class="chat-header-row">
                            <span class="chat-name">${pinnedIcon}${chat.name}</span>
                            <span class="chat-time ${timeClass}">${chat.lastMessage.time}</span>
                        </div>
                        <div class="chat-preview">
                            <span class="chat-message ${msgClass}">${messagePreview}</span>
                            ${unreadBadge}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // ===== RENDER: GROUP CHAT =====
    renderGroupChat() {
        const container = document.getElementById('groupChatRoom');
        if (!container) return;

        const group = MOCK_DATA.groupInfo;
        const messages = MOCK_DATA.groupMessages;

        let membersHtml = '';
        group.members.forEach((m, i) => {
            membersHtml += `<img src="${m}" alt="">`;
        });

        let messagesHtml = '';
        messages.forEach(msg => {
            if (msg.type === 'outgoing') {
                messagesHtml += `
                    <div class="message-group outgoing">
                        <div class="message-bubble">${this.escapeHtml(msg.text)}</div>
                        <div class="message-time">${msg.time} <i class="fas fa-check-double read"></i></div>
                    </div>
                `;
            } else {
                const senderClass = msg.senderClass || 'sender-1';
                messagesHtml += `
                    <div class="message-group incoming">
                        <div class="message-sender ${senderClass}">${msg.sender}</div>
                        <div class="message-bubble">${this.escapeHtml(msg.text)}</div>
                        <div class="message-time">${msg.time} <i class="fas fa-check read"></i></div>
                    </div>
                `;
            }
        });

        container.innerHTML = `
            <div class="chat-room-header">
                <div class="avatar-group">
                    <div class="avatar-group-inner">
                        ${membersHtml}
                    </div>
                    <div class="group-icon"><i class="fas fa-users"></i></div>
                </div>
                <div class="chat-room-info">
                    <div class="chat-room-name">${group.name}</div>
                    <div class="chat-room-meta">
                        <span class="online-dot"></span>
                        <span>${group.activeCount} anggota aktif</span>
                    </div>
                </div>
                <div class="chat-room-actions">
                    <i class="fas fa-search" title="Cari pesan" onclick="app.showToast('Integrasi: GET /api/v1/chats/group/search?q=...')"></i>
                    <i class="fas fa-ellipsis-v" title="Opsi grup" onclick="app.showToast('Integrasi: GET /api/v1/chats/group/settings')"></i>
                </div>
            </div>
            <div class="chat-messages" id="groupChatMessages">
                ${messagesHtml}
            </div>
            <div class="chat-input-area">
                <button class="input-action" title="Lampirkan file" onclick="app.showToast('Integrasi: POST /api/v1/upload')"><i class="fas fa-paperclip"></i></button>
                <div class="chat-input-wrapper">
                    <input type="text" placeholder="Ketik pesan..." id="groupChatInput">
                </div>
                <button class="input-action" title="Kirim gambar" onclick="app.showToast('Integrasi: POST /api/v1/upload')"><i class="fas fa-image"></i></button>
                <button class="send-btn" onclick="app.sendGroupMessage()" title="Kirim"><i class="fas fa-paper-plane"></i></button>
            </div>
        `;

        // Re-attach enter key listener
        const input = document.getElementById('groupChatInput');
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendGroupMessage();
            });
        }
    },

    // ===== RENDER: SCHEDULES =====
    renderSchedules() {
        const container = document.getElementById('scheduleList');
        if (!container) return;

        const schedules = MOCK_DATA.schedules;
        let html = '';

        schedules.forEach(group => {
            html += `
                <div class="schedule-date-header">
                    <i class="fas fa-calendar-day"></i> ${group.date}
                </div>
            `;

            group.items.forEach(item => {
                const urgentClass = item.status === 'urgent' ? 'urgent' : item.status === 'completed' ? 'completed' : '';
                const statusIcon = item.status === 'urgent' ? 'fa-exclamation-circle' : 
                                  item.status === 'in-progress' ? 'fa-clock' : 
                                  item.status === 'completed' ? 'fa-check-circle' : 'fa-hourglass-half';

                let membersHtml = '';
                item.members.forEach(m => {
                    membersHtml += `<img src="${m}" alt="">`;
                });
                if (item.extraMembers > 0) {
                    membersHtml += `<div class="more-members">+${item.extraMembers}</div>`;
                }

                html += `
                    <div class="schedule-card ${urgentClass}">
                        <div class="schedule-card-header">
                            <div>
                                <div class="schedule-title">${item.title}</div>
                                <div class="schedule-project"><i class="fas fa-folder"></i> ${item.project}</div>
                            </div>
                            <div class="schedule-time-block">
                                <div class="time">${item.time}</div>
                                <div class="ampm">${item.ampm}</div>
                            </div>
                        </div>
                        <div class="schedule-desc">${item.desc}</div>
                        <div class="schedule-footer">
                            <div class="schedule-members">
                                ${membersHtml}
                            </div>
                            <div class="schedule-status ${item.status}">
                                <i class="fas ${statusIcon}"></i> ${item.statusLabel}
                            </div>
                        </div>
                    </div>
                `;
            });
        });

        container.innerHTML = html;
    },

    // ===== RENDER: NOTES =====
    renderNotes() {
        const container = document.getElementById('notesList');
        if (!container) return;

        const notes = MOCK_DATA.notes;
        let html = '';

        notes.forEach(note => {
            let tagsHtml = '';
            note.tags.forEach(tag => {
                tagsHtml += `<span class="note-tag ${tag.class}">${tag.label}</span>`;
            });

            html += `
                <div class="note-card" onclick="app.showToast('Integrasi: GET /api/v1/notes/${note.id}')">
                    <div class="note-header">
                        <div class="note-title">${note.title}</div>
                        <div class="note-date">${note.date}</div>
                    </div>
                    <div class="note-content">${note.content.replace(/\n/g, '<br>')}</div>
                    <div class="note-tags">${tagsHtml}</div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // ===== RENDER: GALLERY =====
    renderGallery() {
        const container = document.getElementById('galleryGrid');
        if (!container) return;

        const gallery = MOCK_DATA.gallery;
        let html = '';

        gallery.forEach(item => {
            html += `
                <div class="gallery-item" onclick="app.showToast('Integrasi: GET /api/v1/gallery/${item.id}')">
                    <div class="gallery-placeholder"><i class="fas fa-image"></i></div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    // ===== ACTIONS =====

    sendGroupMessage() {
        const input = document.getElementById('groupChatInput');
        if (!input) return;
        const text = input.value.trim();
        if (!text) return;

        const messagesContainer = document.getElementById('groupChatMessages');
        const now = new Date();
        const timeStr = now.getHours().toString().padStart(2, '0') + ':' + 
                       now.getMinutes().toString().padStart(2, '0');

        const msgHTML = `
            <div class="message-group outgoing" style="animation: fadeIn 0.3s ease;">
                <div class="message-bubble">${this.escapeHtml(text)}</div>
                <div class="message-time">${timeStr} <i class="fas fa-check-double read"></i></div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', msgHTML);
        input.value = '';
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // TODO: Kirim ke backend
        // API.sendGroupMessage(text).then(...);
    },

    openPersonalChat(name) {
        this.showToast(`Integrasi: GET /api/v1/chats/personal/${name}`);
    },

    // ===== MODALS =====

    openMenu() {
        document.getElementById('menuModal').classList.add('show');
    },

    closeMenu(event) {
        if (event.target.id === 'menuModal') {
            document.getElementById('menuModal').classList.remove('show');
        }
    },

    openFullscreenModal(modalId) {
        document.getElementById('menuModal').classList.remove('show');
        document.getElementById('modal-' + modalId).classList.add('show');
    },

    closeFullscreenModal(modalId) {
        document.getElementById('modal-' + modalId).classList.remove('show');
    },

    openContactModal() {
        document.getElementById('contactModal').classList.add('show');
        setTimeout(() => {
            const input = document.getElementById('contactName');
            if (input) input.focus();
        }, 300);
    },

    closeContactModal(event) {
        if (event.target.id === 'contactModal') {
            document.getElementById('contactModal').classList.remove('show');
        }
    },

    closeContactModalDirect() {
        document.getElementById('contactModal').classList.remove('show');
    },

    submitContact() {
        const name = document.getElementById('contactName').value.trim();
        const otp = document.getElementById('contactOTP').value.trim();
        if (!name) { this.showToast('Nama kontak harus diisi!'); return; }
        if (!otp || otp.length < 4) { this.showToast('Kode OTP minimal 4 karakter!'); return; }

        // TODO: API.addContact(name, otp).then(...);
        this.showToast(`Kontak "${name}" berhasil ditambahkan! (OTP: ${otp})`);
        document.getElementById('contactName').value = '';
        document.getElementById('contactOTP').value = '';
        this.closeContactModalDirect();
    },

    // ===== UTILITIES =====

    scrollToTop() {
        document.getElementById('contentArea').scrollTo({ top: 0, behavior: 'smooth' });
    },

    showToast(message) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    },

    showLoading() {
        document.getElementById('loadingOverlay').classList.add('show');
    },

    hideLoading() {
        document.getElementById('loadingOverlay').classList.remove('show');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    logout() {
        if (confirm('Yakin ingin keluar?')) {
            API.logout().then(() => {
                this.showToast('Berhasil logout');
                // Redirect to login page
                // window.location.href = '/login.html';
            });
        }
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
